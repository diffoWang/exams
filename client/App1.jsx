import React, { Component } from 'react';
import { Layout } from 'antd';
import './style/index.less';
import HeaderCustom from './components/HeaderCustom';
import { connect } from 'react-redux';
import Routes from './routes';
import { getMe } from './components/core/action'

const { Content, Footer } = Layout;

class App extends Component {

    componentWillMount() {
        this.props.getMe();
    }

    componentDidMount(){
        const { me } = this.props;
        console.log(me);
    }

    render() {
        const { me } = this.props;
        return (
            <Layout style={{flexDirection: 'column'}}>
                <HeaderCustom user={me.data || {}} />
                <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                    <Routes auth={me} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    React-Admin ©{new Date().getFullYear()} Created by 719480072@qq.com
                </Footer>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        status: state.me.status,
        me: state.me.data
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMe: () => dispatch(getMe())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
