import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Toast, Modal } from 'antd-mobile';
import { checkLogin } from '../../utils/auth';
import storage from '../../utils/storage';
import api from '../../utils/api';
import './index.scss';

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorite' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity',
    to: '/rent/add'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
];

export class User extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: checkLogin(),
      userInfo: {
        avatar: '',
        nickname: ''
      }
    };
    this.logout = this.logout.bind(this);
  }

  async renderUserInfo() {
    let isLogin = this.state.isLogin;
    if (!isLogin) {
      return;
    }

    const [err, res] = await api.getUserInfo();

    if (err) {
      Toast.fail('获取用户信息失败');
      return;
    }

    const { status, body } = res.data;
    const baseURL = res.config.baseURL;
    const userInfo = {
      avatar: '',
      nickname: ''
    };

    isLogin = status === 200;  // 设置登录状态

    if (status === 200) {
      userInfo.avatar = baseURL + body.avatar;
      userInfo.nickname = body.nickname;
    } else {
      storage.setData('token', '');  // 清除 token
    }

    this.setState({ userInfo, isLogin });
  }

  logout() {
    Modal.alert('提示', '是否确定退出？', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.setState({
            isLogin: false,
            userInfo: {
              avatar: '',
              nickname: ''
            }
          });
          storage.setData('token', '');
        }
      }
    ]);
  }

  componentDidMount() {
    this.renderUserInfo();
  }

  render() {
    const { isLogin, userInfo } = this.state;
    const nickname = isLogin ? userInfo.nickname : '游客';
    const avatar = isLogin ? userInfo.avatar : 'http://157.122.54.189:9060/img/profile/avatar.png';

    return (
      <div className="user">
        <div className="user-title">
          <img src="http://157.122.54.189:9060/img/profile/bg.png" alt="背景" />
          <div className="user-profile">
            <div className="user-profile__avatar">
              <img src={avatar} alt="头像" />
            </div>
            <div className="user-profile__content">
              <p>{nickname}</p>
              {isLogin ? (
                <>
                  <button className="opt-btn logout" onClick={this.logout}>退出</button>
                  <div className="edit-user">编辑个人资料<i className="iconfont icon-箭头向右"></i></div>
                </>
              ) : (
                <Link className="opt-btn login" to="/login">去登录</Link>
              )}
            </div>
          </div>
        </div>
        <Grid
          className="user-menu"
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link className="user-menu__item" to={item.to}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </Link>
            ) : (
              <div className="user-menu__item">
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />
        <div className="user-ad">
          <img src="http://api-haoke-web.itheima.net/img/profile/join.png" alt="ad" />
        </div>
      </div>
    );
  }
}

export default User;
