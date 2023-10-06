import { Component } from 'react';
import { Flex } from 'antd-mobile';
import './index.scss';
const baseURL = process.env.REACT_APP_URL;

export class HouseDetailOption extends Component {
  render() {
    const { onFavorite, isFavorite } = this.props;

    return (
      <Flex className="house-detail-option">
        <Flex.Item className="house-detail-option__item" onClick={onFavorite}>
          <img src={baseURL + (isFavorite ? '/img/star.png' : '/img/unstar.png')} alt="收藏" />
          <span>收藏</span>
        </Flex.Item>
        <Flex.Item className="house-detail-option__item">
          在线质询
        </Flex.Item>
        <Flex.Item className="house-detail-option__item house-detail-option__item--tel">
          <a href="tel:1010-9666">电话预约</a>
        </Flex.Item>
      </Flex>
    );
  }
}

export default HouseDetailOption;
