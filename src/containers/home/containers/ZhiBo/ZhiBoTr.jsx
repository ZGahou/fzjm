import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import {WhiteSpace, Popover, Icon} from 'antd-mobile';
import ZhiBoCard from './ZhiBoCard'

const Item = Popover.Item;

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
export default class ZhiBoTr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            children: '最新',
            cid: this.props.cid,
            selected: 'zx',
            keyword: this.props.keyword,
            keywordNum: this.props.keywordNum
        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillMount() {
    }

    handleVisibleChange(visible) {
        this.setState({
            visible
        });
    }

    onSelect(opt) {
        this.setState({
            visible: false,
            selected: opt.props.value,
            children: opt.props.children
        });
    }

    render() {
        let offsetX = -10;
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }

        const {visible, children, cid, selected, keyword, keywordNum} = this.state;
        return (
            <div>
                <WhiteSpace size="sm"/>
                <div className="fzt_order">
                    <div className="fzt_orderText">目前排序：</div>
                    <Popover
                        mask
                        visible={visible}
                        align={{
                            overflow: {adjustY: 0, adjustX: 0},
                            offset: [offsetX, 15],
                        }}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.onSelect}
                        overlay={[
                            (<Item key={"zx"}
                                   value="zx"
                                   data-seed="logId"
                                   icon={
                                       children === '最新' ?
                                           <Icon type='check' size="xs"/> : null
                                   }
                                >
                                    最新
                                </Item>
                            ),
                            (<Item key={"sell"}
                                   value="sell"
                                   style={{whiteSpace: 'nowrap'}}
                                   icon={
                                       children === '销售' ?
                                           <Icon type='check' size="xs"/> : null
                                   }
                            >
                                销售
                            </Item>),
                            (<Item key={"lql"}
                                   value="lql"
                                   style={{whiteSpace: 'nowrap'}}
                                   icon={
                                       children === '领券量' ?
                                           <Icon type='check' size="xs"/> : null
                                   }
                            >
                                领券量
                            </Item>),
                            (<Item key={"yj"}
                                   value="yj"
                                   style={{whiteSpace: 'nowrap'}}
                                   icon={
                                       children === '佣金' ?
                                           <Icon type='check' size="xs"/> : null
                                   }
                            >
                                佣金
                            </Item>),
                            (<Item key={"jg"}
                                   value="jg"
                                   style={{whiteSpace: 'nowrap'}}
                                   icon={
                                       children === '价格从高到低' ?
                                           <Icon type='check' size="xs"/> : null
                                   }
                            >
                                价格从高到低
                            </Item>)
                        ]}
                    >
                        <div className="fzz_text">
                            <div>
                                {children}
                            </div>
                            <div className="fzz_orderSvg">
                                <Icon size="xs"
                                      type={require('../../../../images/icons/order.svg')}/>
                            </div>
                        </div>
                    </Popover>
                </div>
                <ZhiBoCard
                    peer={this.props.peer}
                    key={cid + selected + keywordNum}
                    cid={cid}
                    selected={selected}
                    keyword={keyword}
                />
            </div>
        )
    }
}