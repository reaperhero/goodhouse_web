import { Component } from 'react';
import { NavBar, Toast } from 'antd-mobile';
import HouseInfoItem from '../../components/HouseInfoItem';
import myMap from '../../utils/map';
import { getAreaInfo, getAreaMap, getHouses } from '../../utils/api';
import storage from '../../utils/storage';
import './index.scss';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      mapLevel: 1,
      city: {
        label: '',
        value: '',
        center: null,
      },
      rentInfoItems: [],
      houseInfoItems: [],
      isShowRentInfo: false,
      loading: false
    };
    this.goToDetail = this.goToDetail.bind(this);
  }

  async getCityInfo(name) {
    Toast.loading('获取城市信息中...');
    const [err, res] = await getAreaInfo({ name });

    if (err) {
      Toast.hide();
      Toast.fail('定位失败');
      return;
    }

    Toast.hide();
    return res.data.body;
  }

  /**
   * 渲染地图并且设置地图中心点
   * @param {string|Object} center
   */
  async renderMap(center) {
    const map = new window.BMap.Map('mapGL');
    map.centerAndZoom(center, 12);
    map.addControl(new window.BMap.NavigationControl());
    this.setState({ map });
  }

  async getLocation() {
    Toast.loading('定位中...');
    const location = await myMap.location();
    const { name, center } = location;
    Toast.hide();
    return {
      name,
      center
    };
  }

  async renderRentInfoItems(id) {
    Toast.loading('获取租房信息中...');
    const [err, res] = await getAreaMap({ id });

    if (err) {
      Toast.hide();
      Toast.fail('获取租房信息失败');
      return;
    }

    const rentInfoItems = res.data.body;
    this.setState({ rentInfoItems });
    Toast.hide();
  }

  renderLabels() {
    const positions = [];
    let labelStyle = null;
    let labelContent = '';
    let handleLabelClick = null;
    if (this.state.mapLevel < 3) {
      labelContent = (title, count) => `
        <div class="map-bubble">
          <p class="map-bubble__title">${title}</p>
          <p class="map-bubble__content">${count}套</p>
        </div>`;
      labelStyle = {
        color: '#fff',
        borderRadius: '50%',
        border: '2px solid #fff',
        fontSize: '12px',
        height: '70px',
        width: '70px',
        backgroundColor: 'rgba(12, 181, 106, 0.8)'
      };
      handleLabelClick = this.renderAreaLabel.bind(this);
    } else {
      labelContent = (title, count) => `
        <div class="map-rect">
          <div class="map-rect-wrapper">
            <p class="map-rect__title">${title}</p>
            <p class="map-rect__content">${count}套</p>
          </div>
          <i class="map-rect__arrow"></i>
        </div>`;
      labelStyle = {
        color: '#fff',
        borderRadius: '3px',
        border: 'none',
        fontSize: '12px',
        height: '20px',
        width: '100px',
        backgroundColor: 'rgba(12, 181, 106, 0.8)'
      };
      handleLabelClick = this.showRentInfo.bind(this);
      this.state.map.addControl(new window.BMap.ScaleControl());
      this.state.map.addEventListener('movestart', () => {
        this.setState({ isShowRentInfo: false });
      });
    }
    this.state.rentInfoItems.forEach(rentInfoItem => {
      const { longitude, latitude } = rentInfoItem.coord;
      const position = new window.BMap.Point(longitude, latitude);
      const opts = {
        position,
        offset: new window.BMap.Size(-35, -35)
      };
      const label = new window.BMap.Label(labelContent(rentInfoItem.label, rentInfoItem.count), opts);
      label.addEventListener('click', e => handleLabelClick(rentInfoItem, e));
      label.setStyle(labelStyle);
      positions.push(position);
      this.state.map.addOverlay(label);
    });

    this.state.map.setViewport(positions);
  }

  async renderAreaLabel({ label, value }) {
    const city = this.state.city;
    let mapLevel = this.state.mapLevel;
    // 解决清除地图覆盖物的 bug
    setTimeout(() => {
      this.state.map.clearOverlays();
    });
    // 设置当前地区中心
    this.setState({
      city: {
        ...city,
        label,
        value
      },
      mapLevel: ++mapLevel
    });
    await this.renderRentInfoItems(value);
    this.renderLabels();
  }

  async showRentInfo({ value }, e) {
    this.setState({ isShowRentInfo: false });
    const { clientX, clientY } = e.changedTouches[0];
    const X = window.innerWidth / 2 - clientX;
    const Y = (window.innerHeight - 330) / 2 - clientY;

    this.state.map.panBy(X, Y);
    this.renderHouseInfoItems(value);
  }

  async renderHouseInfoItems(cityId) {
    if (this.state.loading) {
      return;
    }
    Toast.loading('获取租房信息中...');
    this.setState({ loading: true });
    const [err, res] = await getHouses({ cityId });

    if (err) {
      Toast.hide();
      this.setState({ loading: false });
      Toast.fail('获取租房信息失败');
      return;
    }

    Toast.hide();
    const houseInfoItems = res.data.body.list.map(houseInfoItem => ({
      ...houseInfoItem,
      houseImg: res.config.baseURL + houseInfoItem.houseImg
    }));
    this.setState({
      loading: false,
      isShowRentInfo: true,
      houseInfoItems
    });
  }

  async componentDidMount() {
    // 获取本地城市信息
    let city = storage.getData('city');
    let center = null;
    if (!city) {
      const location = await this.getLocation();
      center = location.center;
      city = await this.getCityInfo(location.name);
      storage.setData('city', city);
    } else {
      center = city.label + '市';
    }

    this.setState({
      city: {
        ...city,
        center
      }
    });

    await this.renderMap(center);
    await this.renderRentInfoItems(city.value);
    this.renderLabels();
  }

  goToDetail() {
    this.props.history.push('/detail');
  }

  render() {
    const history = this.props.history;

    return (
      <div className="map">
        <div className="map-gl" id="mapGL"></div>
        <NavBar
          className="nav-header"
          mode="light"
          leftContent={<i className="iconfont icon-back"></i>}
          onLeftClick={() => history.goBack()}
        >地图找房</NavBar>
        <HouseInfo
          active={this.state.isShowRentInfo}
          houseInfoItems={this.state.houseInfoItems}
          onToDetail={this.goToDetail}
        />
      </div>
    );
  }
}

class HouseInfo extends Component {
  render() {
    const { active, houseInfoItems } = this.props;

    return (
      <div className={`house-info ${active ? 'active' : ''}`}>
        <div className="house-info-head">
          <h2>房屋列表</h2>
          <span className="more">更多房源</span>
        </div>
        <ul className="house-info-list">
          {houseInfoItems.map(houseInfoItem =>
            <HouseInfoItem
              key={houseInfoItem.houseCode}
              title={houseInfoItem.title}
              houseCode={houseInfoItem.houseCode}
              houseImg={houseInfoItem.houseImg}
              desc={houseInfoItem.desc}
              tags={houseInfoItem.tags}
              price={houseInfoItem.price}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default Map;
