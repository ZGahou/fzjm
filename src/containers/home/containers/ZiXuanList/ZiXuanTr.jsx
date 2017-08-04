import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import {withRouter} from 'react-router-dom'
import {RefreshControl, ListView, WingBlank, WhiteSpace, Card, Icon} from 'antd-mobile';

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
@withRouter
export default class ZiXuanTr extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: false,
            allPage: 0
        };
    }

    componentWillMount() {
        let requestData = {
            limit: 10,
            pageIndex: 1,
        };
        this.props.getZiXuan(requestData);
    }

    componentDidMount() {
        this.manuallyRefresh = true;
        setTimeout(() => this.setState({refreshing: true}), 10);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.home.ziList.data !== this.props.home.ziList.data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.home.ziList.data),
                allPage: nextProps.home.ziList.allPage,
                /*dataList: nextProps.home.paoDan.list*/
            });
        }
    }

    onRefresh() {
        console.log('onRefresh');
        if (!this.manuallyRefresh) {
            this.setState({refreshing: true});
        } else {
            this.manuallyRefresh = false;
        }
        setTimeout(() => {
            this.initData = [`ref${pageIndex++}`, ...this.initData];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.initData),
                refreshing: false,
            });
        }, 1000);
    }

    row(rowData) {
        const {history, location} = this.props;
        history.push(
            {
                pathname: '/zixuandetail',
                query: rowData
            });
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <WingBlank size="sm">
                        <WhiteSpace size="md"/>
                        <Card style={{marginBottom: '0.18rem'}} className="rowData"
                              onClick={this.row.bind(this, rowData)}>
                            <Card.Body style={{borderTop: '0 solid #ddd'}}>
                                <div className="fzp_bigBox">
                                    <div className="fzj_imgBox">
                                        <img
                                            className="fzj_img"
                                            src={rowData.newImg}/>
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
                                                    rowData.title
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
                                                    &yen;{rowData.price}
                                                </div>
                                            </div>
                                            <WhiteSpace size="sm"/>
                                            <div className="fzp_afterPrice">
                                                <div className="yen">&yen;</div>
                                                <div className="fzp_price">
                                                    {
                                                        rowData.nowPrice
                                                    }
                                                </div>
                                                <div className="fzp_priceText">券后价</div>
                                            </div>
                                            <WhiteSpace size="sm"/>
                                            <div className="fzp_bottom">
                                                <div>
                                                    比率{rowData.yongjin}%
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

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={row}
                renderSeparator={separator}
                initialListSize={5}
                pageSize={5}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                style={{
                    height: document.documentElement.clientHeight,
                    border: '1px solid #ddd',
                    margin: '0.1rem 0',
                }}
                scrollerOptions={{scrollbars: true}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
            />
        )
    }
}