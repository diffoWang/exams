/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Badge } from 'antd';
import screenfull from 'screenfull';
import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils/index';
import avater from '../style/imgs/b1.jpg';
import TopMenuContainer from './TopMenuContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
    };
    componentDidMount() {
        const QueryString = queryString();
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    render() {
        return (
            <Header className="custom-theme" >
                <Row>
                    <Col span={18}>
                        <TopMenuContainer />
                    </Col>
                    <Col span={6}>
                        <Menu
                            mode="horizontal"
                            theme="dark"
                            style={{float: 'right', height:'60px', lineHeight: '60px' }}
                            onClick={this.menuClick}
                        >
                            <Menu.Item key="full" onClick={this.screenFull} >
                                <Icon type="arrows-alt" onClick={this.screenFull} />
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                                    <Icon type="notification" />
                                </Badge>
                            </Menu.Item>
                            <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                                <MenuItemGroup title="用户中心">
                                    <Menu.Item key="setting:1">你好 - {this.props.user.userName}</Menu.Item>
                                    <Menu.Item key="setting:2">个人信息</Menu.Item>
                                    <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="设置中心">
                                    <Menu.Item key="setting:3">个人设置</Menu.Item>
                                    <Menu.Item key="setting:4">系统设置</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const { responsive = {data: {}} } = state.httpData;
    return {responsive};
};

export default withRouter(connect(mapStateToProps)(HeaderCustom));
