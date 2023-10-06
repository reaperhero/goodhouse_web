import { Component } from 'react';
import HouseInfoItem from '../../HouseInfoItem';
import './index.scss';

const BASE_URL = process.env.REACT_APP_URL;

// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    src: BASE_URL + '/img/message/1.png',
    desc: '72.32㎡/南 北/低楼层',
    title: '安贞西里 3室1厅',
    price: 4500,
    tags: ['随时看房']
  },
  {
    id: 2,
    src: BASE_URL + '/img/message/2.png',
    desc: '83㎡/南/高楼层',
    title: '天居园 2室1厅',
    price: 7200,
    tags: ['近地铁']
  },
  {
    id: 3,
    src: BASE_URL + '/img/message/3.png',
    desc: '52㎡/西南/低楼层',
    title: '角门甲4号院 1室1厅',
    price: 4300,
    tags: ['集中供暖']
  }
];

export class HouseRecommend extends Component {
  render() {
    return (
      <div className="house-recommend">
        <h3 className="house-recommend__title">猜你喜欢</h3>
        <ul className="house-recommend-list">
          {recommendHouses.map(recommendHouse =>
            <HouseInfoItem
              key={recommendHouse.id}
              title={recommendHouse.title}
              houseImg={recommendHouse.src}
              desc={recommendHouse.desc}
              tags={recommendHouse.tags}
              price={recommendHouse.price}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default HouseRecommend;
