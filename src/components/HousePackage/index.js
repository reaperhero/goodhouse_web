import { Component } from 'react';
import './index.scss';

// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'sofa'
  }
];

export class HousePackage extends Component {
  get renderItems() {
    const { list } = this.props;
    const data = HOUSE_PACKAGE.filter(pkg => list.includes(pkg.name));
    return data.map(item =>
      <li
        key={item.id}
        className="house-package__item"
      >
        <p>
          <i className={`iconfont icon-${item.icon}`} />
        </p>
        {item.name}
      </li>
    );
  }

  render() {
    return (
      <ul className="house-package">{this.renderItems}</ul>
    );
  }
}

export default HousePackage;
