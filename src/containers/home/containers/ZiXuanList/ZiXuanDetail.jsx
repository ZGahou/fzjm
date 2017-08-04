import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Action from '../../../../store/actions';
import {NavBar, Button, TextareaItem} from 'antd-mobile';
import {withRouter} from 'react-router-dom'

@connect(
    state => ({...state}),
    dispatch => bindActionCreators(Action, dispatch)
)
@withRouter
export default class ZiXuanDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const {location} = this.props;
        console.log(location.query);
    }

    componentDidMount() {
        let bodyHeight = document.documentElement.clientHeight;
        console.log(bodyHeight);
        document.getElementById('zixuandetail-body').style.height = bodyHeight + 'px';
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    onLeftClick={() => console.log('onLeftClick')}
                >创建分享</NavBar>
                <nav className="zixuandetail-sec-nav">您的预估佣金为22.50% （预计49.28）</nav>
                <div className="zixuandetail-body" id='zixuandetail-body'>
                    <p>封面图</p>
                    <img src="#" className="zixuandetail-img"/>
                    <Button className="btn" inline size="small" type="primary">保存图片</Button>
                    <p>编程文案</p>
                    <TextareaItem
                        style={{border: '1px solid #ccc'}}
                        placeholder="please input content"
                        autoHeight
                        labelNumber={5}
                    />
                    <Button className="btn copybtn" inline size="small" type="primary">复制文字</Button>
                </div>
            </div>
        )
    }
}