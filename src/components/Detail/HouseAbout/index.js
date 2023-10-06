import { Component } from 'react';
import HousePackage from '../../HousePackage';
import './index.scss';

export class HouseAbout extends Component {
  render() {
    const { supporting } = this.props;
    return (
      <div className="house-about">
        <h3 className="house-about__title">房屋配套</h3>
        {supporting.length > 0 ?
        <HousePackage list={supporting} /> :
        <p className="house-about__desc">暂无数据</p>}
      </div>
    );
  }
}

export default HouseAbout;
