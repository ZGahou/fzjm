import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import api from '../../../../api'

const getJingXuanAPI = '/TaoKeAction.php?act=getJingXuan';
import {RefreshControl, ListView, Card, WingBlank, WhiteSpace} from 'antd-mobile';

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
export default class RenGongTr extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            pageNo: 1,                         //当前页数
            pageSize: 20,                      //条数
            dataSource: dataSource.cloneWithRows([]),
            allCount: 0,                       //总数
        };
    }

    componentWillMount() {
        let requestData = {
            time: 0,
            qq: this.props.item.qq,
            orgId: this.props.item.org_id,
            limit: this.state.pageSize,
            pageIndex: this.state.pageNo,
        };
        api.get(getJingXuanAPI,
            {
                params: {
                    time: requestData.time,
                    qq: requestData.qq,
                    orgId: requestData.orgId,
                    limit: requestData.limit,
                    pageIndex: requestData.pageIndex
                }
            })
            .then(response => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(response.data),
                        allCount: response.allCount
                    });
                },
                error => {
                    console.log(error);
                })
    }

    render() {
        const {dataSource} = this.state;
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <WingBlank size="md">
                        <WhiteSpace size="sm"/>
                        <Card>
                            <Card.Body>
                                <div className="fzr_bigBox">
                                    <div className="fzr_imgBox">
                                        <img
                                            src={rowData.image_url}/>
                                    </div>
                                    <div className="fzr_textBox">
                                        <div className="fzr_margin">
                                            {
                                                rowData.title
                                            }
                                        </div>
                                        <div className="fzr_margin2">
                                            {
                                                rowData.quan_miaoshu
                                            }
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
                dataSource={dataSource}
                renderRow={row}
                style={{
                    height: document.documentElement.clientHeight / 2 + 50,
                    border: '1px solid #ddd',
                    overflow: 'auto',
                    margin: '0.1rem 0',
                }}
                initialListSize={5}
                pageSize={5}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={20}
                scrollerOptions={{scrollbars: true}}
                onEndReachedThreshold={10}
            >
            </ListView>
        )
    }
}