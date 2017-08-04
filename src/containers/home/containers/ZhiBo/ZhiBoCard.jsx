import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import {Card, RefreshControl, ListView, WingBlank, WhiteSpace, Icon, Modal} from 'antd-mobile';
import api from '../../../../api';

const alert = Modal.alert;
const getHaoDanKuAPI = '/TaoKeAction.php?act=getHaoDanKu';
const addZiXuanAPI = '/TaoKeAction.php?act=addZiXuan';

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
export default class ZhiBoCard extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            pageNo: 1,                    //起始页数
            pageSize: 10,                 //显示条数
            refreshing: false,            //刷新
            isLoading: true,              //是否正在加载
            dataSource: dataSource.cloneWithRows([]),  //数据源
            dataList: [],
            allPage: 0,
        };
        this.timer = {
            timer: null,
            interval: 4
        }; //控制onEndReached不断触发
    }

    componentWillMount() {
        let keyword = this.props.keyword;
        let requestData = {
            limit: this.state.pageSize,
            pageIndex: this.state.pageNo,
            order_by: 'desc',
            cid: this.props.cid,
            shaixuan: this.props.selected
        };
        if (keyword !== '') {
            requestData.keyword = keyword;
        }
        api.get(getHaoDanKuAPI,
            {
                params: {
                    limit: requestData.limit,
                    pageIndex: requestData.pageIndex,
                    order_by: requestData.order_by,
                    cid: requestData.cid,
                    shaixuan: requestData.shaixuan,
                    keyword: requestData.keyword
                }
            })
            .then(response => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(response.list),
                        allPage: response.allPage,
                        dataList: response.list
                    });
                },
                error => {
                    console.log(error);
                })
    }

    onRefresh() {
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }
    }

    splitText(text) {
        if (text && text.length > 11) {
            return text.substring(0, 11).concat('..');
        } else {
            return text;
        }
    }

    onEndReached(data) {
        if (data.isLoading === true && data.allPage === data.pageNo) {
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
        let keyword = this.props.keyword;
        let requestData = {
            limit: 20,
            pageIndex: data.pageNo,
            order_by: 'desc',
            cid: this.props.cid,
            shaixuan: this.props.selected
        };
        if (keyword !== '') {
            requestData.keyword = keyword;
        }
        api.get(getHaoDanKuAPI,
            {
                params: {
                    limit: requestData.limit,
                    pageIndex: requestData.pageIndex + 1,
                    order_by: requestData.order_by,
                    cid: requestData.cid,
                    shaixuan: requestData.shaixuan,
                    keyword: requestData.keyword
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

    join(rowData) {
        let peer = this.props.peer;
        const conn = peer.connect('s2ww5auvvro4j9k9');
        conn.on('open', () => {
                this.setState({
                    peer: peer
                });
                conn.on('data', (data) => {
                    console.log('Received:', data);
                });
                conn.send({
                    type: '2',
                    msg: rowData,
                });
            },
            (err) => {
                console.log('err', err);
            });
        /* let requestData = {
             activityId: rowData.activityId,
             commission: rowData.commission,
             commission_jihua: rowData.commission_jihua,
             commission_queqiao: rowData.commission_queqiao,
             d_title: rowData.d_title,
             had_template: rowData.had_template,
             introduce: rowData.introduce,
             is_tmall: rowData.is_tmall,
             itemId: rowData.itemId,
             org_price: rowData.org_price,
             pic: rowData.pic,
             price: rowData.price,
             quan_price: rowData.quan_price,
             quan_receive: rowData.quan_receive,
             quan_surplus: rowData.quan_surplus,
             quan_time: rowData.quan_time,
             sales_num: rowData.sales_num
         };
         api.post(addZiXuanAPI,
             {
                 data: {
                     'id': requestData.activityId,
                     'commission': requestData.commission,
                     'commission_jihua': requestData.commission_jihua,
                     'commission_queqiao': requestData.commission_queqiao,
                     'title': requestData.d_title,
                     'had_template': requestData.had_template,
                     'introduce': requestData.introduce,
                     'is_tmall': requestData.is_tmall,
                     'itemId': requestData.itemId,
                     'org_price': requestData.org_price,
                     'newImg': requestData.pic,
                     'nowPrice': requestData.price,
                     'quanPrice': requestData.quan_price,
                     'receivedAmount': requestData.quan_receive,
                     'quan_surplus': requestData.quan_surplus,
                     'addTime': requestData.quan_time,
                     'sales_num': requestData.sales_num
                 }
             })
             .then(response => {
                     console.log(response);
                 },
                 error => {
                     console.log(error);
                 })*/
    }

    render() {
        const {refreshing, isLoading, dataSource, pageNo, allPage, dataList} = this.state;
        let onEndReached = {
            isLoading: isLoading,
            pageNo: pageNo,
            allPage: allPage,
            dataList: dataList,
            dataSource: dataSource
        };

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <WingBlank size="sm">
                        <WhiteSpace size="md"/>
                        <Card style={{'margin-bottom': '0.18rem'}} className="rowData">
                            <Card.Body style={{'border-top': '0 solid #ddd'}}>
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
                                                        onClick={() => alert('温馨提示：', '您确定加入自选列表么???',
                                                            [
                                                                {text: '取消', onPress: () => console.log('cancel')},
                                                                {
                                                                    text: '加入',
                                                                    onPress: this.join.bind(this, rowData)
                                                                },
                                                            ])}
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
                </
                    div>
            )
                ;
        };
        return (
            <ListView

                dataSource={dataSource}
                renderRow={row}
                style={{
                    height: document.documentElement.clientHeight / 2 + 150,
                    margin: '0.1rem 0',
                }}
                initialListSize={5}
                pageSize={5}
                scrollRenderAheadDistance={500}
                scrollerOptions={{scrollbars: true}}
                onEndReachedThreshold={10}
                scrollEventThrottle={200}
                onEndReached={this.onEndReached.bind(this, onEndReached)}
                renderFooter={() => (
                    <div style={{padding: 10, textAlign: 'center'}}>
                        {isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                    />}
            />
        )
    }
}