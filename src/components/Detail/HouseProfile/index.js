import { Component } from 'react';
import './index.scss';

export class HouseProfile extends Component {
  render() {
    const { description } = this.props;
    return (
      <div className="house-profile">
        <h3 className="house-profile__title">房源概述</h3>
        <div className="house-profile-user">
          <div className="house-profile-user__info">
            <img src="http://157.122.54.189:9060/img/avatar.png" alt="头像" />
            <div className="user-content">
              <p>王女士</p>
              <div className="user-content__auth">
                <i className="iconfont icon-auth"></i>
                已认证房主
              </div>
            </div>
          </div>
          <button>发消息</button>
        </div>
        <p>{description ? description : '暂无房屋描述'}</p>
      </div>
    );
  }
}

export default HouseProfile;
