import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../store/actions';
import {TabBar} from 'antd-mobile';
import ZiXuanTr from './ZiXuanList/ZiXuanTr';
import ZhiBo from './ZhiBo/ZhiBo';
import Peer from 'peerjs';

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            peer: {}
        };
    }

    componentWillMount() {
        const peer = new Peer(
            {key: 'xjnj6mwz1345z5mi', debug: 3}
        );
        peer.on('open', () => {
            const conn = peer.connect('s2ww5auvvro4j9k9');
            console.log(conn);
            conn.on('open', () => {
                    this.setState({
                        peer: peer
                    });
                    conn.on('data', (data) => {
                        console.log('Received:', data);
                    });
                    conn.send({
                        type: '1',
                        msg: '您好！',
                    });
                },
                (err) => {
                    console.log('err', err);
                });
        });
    }

    render() {
        const {peer} = this.state;
        return (
            <div>
                <div>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                    >
                        <TabBar.Item
                            icon={<div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                            }
                            title="选品列表"
                            key="List"
                            selected={this.state.selectedTab === 'redTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'redTab',
                                });
                            }}
                        >
                            <div>
                                <ZiXuanTr/>
                            </div>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                            }
                            title="选品库"
                            key="ku"
                            selected={this.state.selectedTab === 'greenTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'greenTab',
                                });
                            }}
                        >
                            <div>
                                <ZhiBo peer={peer}/>
                            </div>
                        </TabBar.Item>
                        <TabBar.Item
                            icon={<div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '0.44rem',
                                height: '0.44rem',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat'
                            }}
                            />
                            }
                            title="我的"
                            key="我的"
                            selected={this.state.selectedTab === 'yellowTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'yellowTab',
                                });
                            }}
                        >
                            <div>
                            </div>
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}