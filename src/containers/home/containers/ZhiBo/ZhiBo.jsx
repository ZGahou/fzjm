import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import ZhiBoTr from './ZhiBoTr'
import PaoDan from '../PaoDan/PaoDan'
import RenGong from '../RenGong/RenGong'
import {Tabs, SearchBar, WhiteSpace, WingBlank, Popover, Icon} from 'antd-mobile';

const TabPane = Tabs.TabPane;
const Item = Popover.Item;

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
export default class ZhiBo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '0',
            count: 29984,
            children: '全部',
            value: '',
            keywordNum: 0,
        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getHaoDanKuCid();
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
            count: opt.props.data,
            children: opt.props.children
        });
    }

    cid(data, selected) {
        let cidList = [];
        for (let i = 0; i < data.length; i++) {
            cidList.push(
                <Item key={data[i].orig_mulu_id}
                      icon={
                          selected === data[i].orig_mulu_id ?
                              <Icon type='check' size="xs"/> : null
                      }
                      value={data[i].orig_mulu_id}
                      data={data[i].good_total}
                >
                    {data[i].tk_mulu_name}
                </Item>
            );
        }
        return cidList;
    }

    onChange(value) {
        this.setState({value});
    }

    onClear() {
        this.setState({value: ''});
    }

    onSubmit() {
        this.setState({
            keywordNum: this.state.keywordNum + 1
        });
    }

    render() {
        let offsetX = -10;
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
        const {visible, selected, count, children, value, keywordNum} = this.state;
        const {haoDanCid} = this.props.home;
        return (
            <div>
                <Tabs
                    defaultActiveKey="ZhiBo"
                    animated={false}
                    swipeable={false}
                >
                    <TabPane
                        tab="领券直播"
                        key="ZhiBo">
                        <WingBlank>
                            <WhiteSpace/>
                            <SearchBar
                                value={value}
                                placeholder="分众金客搜索"
                                onChange={this.onChange}
                                onClear={this.onClear}
                                onSubmit={this.onSubmit}
                                showCancelButton={false}
                                cancelText={'清空'}
                            />
                            <WhiteSpace size="sm"/>
                            <div className="fzz_cid">
                                <div className="fzz_result">
                                    共 {count} 个结果
                                </div>
                                <Popover
                                    mask
                                    visible={visible}
                                    align={{
                                        overflow: {adjustY: 0, adjustX: 0},
                                        offset: [offsetX, 15],
                                    }}
                                    onVisibleChange={this.handleVisibleChange}
                                    onSelect={this.onSelect}
                                    overlay={this.cid(haoDanCid.data, selected)}
                                >
                                    <div className="fzz_text">
                                        <div className="fzz_orderSvg">
                                            <Icon size="xs"
                                                  type={require('../../../../images/icons/fenlei.svg')}/>
                                        </div>
                                        <div>
                                            {children}
                                        </div>
                                    </div>
                                </Popover>
                            </div>
                            <ZhiBoTr
                                peer={this.props.peer}
                                key={selected + keywordNum}
                                cid={selected}
                                keyword={value}
                                keywordNum={keywordNum}
                            />
                        </WingBlank>
                    </TabPane>
                    <TabPane
                        tab="实时跑单"
                        key="paoDan">
                        <div>
                            <PaoDan/>
                        </div>
                    </TabPane>
                    <TabPane
                        tab="人工精选"
                        key="renGong">
                        <div>
                            <RenGong/>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}