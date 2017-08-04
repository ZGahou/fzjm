import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import {RefreshControl, ListView, Card, WingBlank, WhiteSpace, Icon, Flex} from 'antd-mobile';
import api from '../../../../api'

const getPaoDanAPI = '/TaoKeAction.php?act=paoLiang';

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
export default class PaoDan extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            pageNo: 1,                   //起始页数
            pageSize: 10,                //显示条数
            dataList: [],                //数据源
            refreshing: false,           //刷新
            dataSource: dataSource.cloneWithRows([]),  //数据源
            isLoading: true,             //是否正在加载
            allPage: 0,                  //总页数
        };
        this.timer = {
            timer: null,
            interval: 4
        };     //控制onEndReached不断触发
    }

    componentWillMount() {
        let requestData = {
            limit: this.state.pageSize,
            pageIndex: this.state.pageNo,
        };
        this.props.getPaoDan(requestData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.home.paoDan.list !== this.props.home.paoDan.list) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.home.paoDan.list),
                allPage: nextProps.home.paoDan.allPage,
                dataList: nextProps.home.paoDan.list
            });
        }
    }

    splitText(text) {
        if (text && text.length > 16) {
            return text.substring(0, 16).concat('..');
        } else {
            return text;
        }
    }

    componentDidMount() {
        this.manuallyRefresh = true;
        setTimeout(() => this.setState({refreshing: true}), 10);
    }

    onRefresh() {
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }
    }

    onEndReached(data) {
        if (data.isLoading === true && data.allPage === data.pageNo) {
            console.log('加载中或已经是最后一页了！');
            return;
        }

        if (this.timer.timer === null) {
            this.timer.timer = setInterval(() => {
                this.timer.interval--;
                if (this.timer.interval === 0) {
                    clearInterval(this.timer.timer);
                    this.timer = {
                        timer: null,
                        interval: 4
                    }
                }
            }, 1000);
        }
        else {
            return;
        }
        this.setState({isLoading: true});
        let requestData = {
            limit: 10,
            pageIndex: data.pageNo,
        };
        api.get(getPaoDanAPI,
            {
                params: {
                    limit: requestData.limit,
                    pageIndex: requestData.pageIndex + 1,
                }
            })
            .then(response => {
                    let newList = [...data.dataList, ...response.list];
                    console.log(newList);
                    this.setState({
                        dataSource: data.dataSource.cloneWithRows(newList),
                        isLoading: false,
                        pageNo: data.pageNo > data.allPage ? data.allPage : ++data.pageNo,
                        dataList: newList
                    });
                },
                error => {
                    console.log(error);
                })
    }

    render() {
        const {dataSource, isLoading, pageNo, allPage, dataList} = this.state;

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <WingBlank size="sm">
                        <WhiteSpace size="md"/>
                        <Card style={{marginBottom: '0.18rem'}} className="rowData">
                            <Card.Body style={{borderTop: '0 solid #ddd'}}>
                                <div className="fzp_bigBox">
                                    <div className="fzj_imgBox">
                                        <img
                                            className="fzj_img"
                                            src={rowData.pic}/>
                                    </div>
                                    <div className="fzp_center">
                                        <div className="fzp_title">
                                            <div className="fzp_icon">
                                                {
                                                    rowData.is_tmall === '1' ? <Icon
                                                            size='xs'
                                                            type={require('../../../../images/icons/tianMao.svg')}/> :
                                                        <Icon
                                                            size='xs'
                                                            type={require('../../../../images/icons/taoBao.svg')}/>
                                                }
                                            </div>
                                            <div className="fzp_d_title">
                                                {
                                                    rowData.d_title
                                                }
                                            </div>
                                        </div>
                                        <WhiteSpace size="sm"/>
                                        <div>
                                            <div className="fzp_after">
                                                <div>
                                                    <Icon
                                                        size='xxs'
                                                        type={require('../../../../images/icons/quan.svg')}/>
                                                </div>
                                                <div className="fzj_curPrice">
                                                    &yen;{rowData.quan_price}
                                                </div>
                                            </div>
                                            <WhiteSpace size="sm"/>
                                            <div className="fzp_afterPrice">
                                                <div className="yen">&yen;</div>
                                                <div className="fzp_price">
                                                    {
                                                        rowData.price
                                                    }
                                                </div>
                                                <div className="fzp_priceText">券后价</div>
                                            </div>
                                            <WhiteSpace size="sm"/>
                                            <div className="fzp_bottom">
                                                <div>
                                                    比率{rowData.commission}%
                                                </div>
                                                <div className="fzp_add">
                                                    <Icon
                                                        size='lg'
                                                        type={require('../../../../images/icons/add.svg')}/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </WingBlank>
                </div>
            );
        };

        let onEndReached = {
            isLoading: isLoading,
            pageNo: pageNo,
            allPage: allPage,
            dataList: dataList,
            dataSource: dataSource
        };

        return (
            <ListView
                dataSource={dataSource}
                renderRow={row}
                style={{
                    height: document.documentElement.clientHeight * 4 / 5 + 40,
                }}
                initialListSize={5}
                pageSize={5}
                scrollRenderAheadDistance={500}
                scrollerOptions={{scrollbars: true}}
                onEndReached={this.onEndReached.bind(this, onEndReached)}
                onEndReachedThreshold={10}
                scrollEventThrottle={200}
                renderFooter={() => (
                    <div style={{padding: 10, textAlign: 'center'}}>
                        {isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
            />
        )
    }
}