import { Component } from 'react';
import './index.scss';

export class HouseMap extends Component {
  componentDidUpdate() {
    const { community, coord } = this.props;
    const { longitude, latitude } = coord;

    const map = new window.BMap.Map('houseMapGL');
    const point = new window.BMap.Point(longitude, latitude);
    map.centerAndZoom(point, 17);
    const opts = {
      position: point,
      offset: new window.BMap.Size(-8, -36)
    };
    const labelStyle = {
      position: 'absolute',
      zIndex: -7982820,
      backgroundColor: 'rgb(238, 93, 91)',
      color: 'rgb(255, 255, 255)',
      height: 25,
      padding: '5px 10px',
      lineHeight: '14px',
      borderRadius: '3px',
      boxShadow: '#ccc 2px 2px 2px',
      whiteSpace: 'nowrap',
      fontSize: 12,
      userSelect: 'none'
    };
    const label = new window.BMap.Label('', opts);
    label.setStyle(labelStyle);
    label.setContent(`
      <span>${community}</span>
      <div class="house-map-label-arrow"></div>
    `);
    map.addOverlay(label);
  }
  render() {
    const { community } = this.props;
    return (
      <div className="house-map">
        <h3 className="house-map__title">小区：{community}</h3>
        <div className="house-map__map-gl" id="houseMapGL"></div>
      </div>
    );
  }
}

export default HouseMap;
