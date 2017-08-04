import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import RenGongTr from './RenGongTr'
import {Tabs} from 'antd-mobile';
const TabPane = Tabs.TabPane;

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
export default class RenGong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renGongCid: []
        };
    }

    componentWillMount() {
        this.props.getJingXuanCid()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.home.renGongCid.data !== this.props.home.renGongCid.data) {
            this.setState({
                renGongCid: nextProps.home.renGongCid.data
            });
        }
    }

    render() {
        const {renGongCid} = this.state;
        return (
            <div>
                <Tabs defaultActiveKey="0"
                      pageSize={3}
                      animated={false}
                      swipeable={false}>
                    {
                        renGongCid.map((item, index) => {
                            return <TabPane tab={item.title}
                                            key={index}>
                                {/*      <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#fff',
                                    padding: '0.2rem'
                                }}>
                                    {item.miaoshu}
                                </div>*/}
                                <RenGongTr
                                    item={item}
                                />
                            </TabPane>
                        })
                    }
                </Tabs>
            </div>
        )
    }
}