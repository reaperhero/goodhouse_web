import { Component } from 'react';
import { NavBar, Carousel, Toast, Modal } from 'antd-mobile';
import HouseDetailInfo from '../../components/Detail/HouseDetailInfo';
import HouseMap from '../../components/Detail/HouseMap';
import HouseAbout from '../../components/Detail/HouseAbout';
import HouseProfile from '../../components/Detail/HouseProfile';
import HouseRecommend from '../../components/Detail/HouseRecommend';
import HouseDetailOption from '../../components/Detail/HouseDetailOption';
import api from '../../utils/api';
import { checkLogin } from '../../utils/auth';
import storage from '../../utils/storage';
import './index.scss';

export class Detail extends Component {
  constructor() {
    super();
    this.state = {
      houseInfo: {
        houseImg: [],
        tags: [],
        oriented: [],
        coord: {},
        supporting: []
      },
      isFavorite: false
    };
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  async renderHouseInfo(id) {
    const [err, res] = await api.getHousesById(id);

    if (err) {
      Toast.fail('获取租房详情信息失败');
      return;
    }

    const baseURL = res.config.baseURL;
    let houseInfo = res.data.body;
    houseInfo = {
      ...houseInfo,
      houseImg: houseInfo.houseImg.map(img => baseURL + img)
    };
    this.setState({ houseInfo });
  }

  async checkFavorite(id) {
    if (!checkLogin()) {
      return;
    }

    const [err, res] = await api.getFavoritesById(id);

    if (err) {
      Toast.fail('查询收藏状态失败');
      return;
    }

    const status = res.data.status;

    if (status === 200) {
      const isFavorite = res.data.body.isFavorite;
      this.setState({ isFavorite });
    } else {
      storage.setData('token', '');
    }
  }

  async handleFavorite() {
    const { history, location, match } = this.props;
    let isFavorite = this.state.isFavorite;

    if (!checkLogin()) {
      Modal.alert('提示', '登录后才能收藏房源，是否去登录?', [
        { text: '取消' },
        {
          text: '去登录',
          onPress: () => history.replace('/login', { from: location })
        }
      ]);
      return;
    }

    let result;
    const id = match.params.id;

    if (isFavorite) {
      result = await api.unFavorites(id);
    } else {
      result = await api.favorites(id);
    }

    const [err, res] = result;

    if (err) {
      Toast.fail((isFavorite ? '取消' : '') + '收藏失败');
      return;
    }

    const desc = res.data.description;
    isFavorite = desc === '添加收藏';

    Toast.info(desc);
    this.setState({ isFavorite });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.renderHouseInfo(id);
    this.checkFavorite(id);
  }

  render() {
    const {
      community,
      houseImg,
      title,
      tags,
      price,
      roomType,
      size,
      oriented,
      floor,
      coord,
      supporting,
      description
    } = this.state.houseInfo;
    const { isFavorite } = this.state;
    return (
      <div className="house-detail">
        <NavBar
          mode="light"
          className="nav-header"
          leftContent={<i className="iconfont icon-back"></i>}
          rightContent={<i className="iconfont icon-share"></i>}
          onLeftClick={() => this.props.history.goBack()}
        >{community}</NavBar>
        <Carousel
          autoplay
          infinite
          style={{ height: 252 }}
        >
          {houseImg.map(img => (
            <a
              key={img}
              href="https://lianjia.com"
              style={{ display: 'inline-block', width: '100%' }}
            >
              <img
                src={img}
                alt="房屋照片"
                style={{ display: 'inline-block', width: '100%', height: 252 }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                }}
              />
            </a>
          ))}
        </Carousel>
        <HouseDetailInfo
          title={title}
          tags={tags}
          price={price}
          roomType={roomType}
          size={size}
          oriented={oriented}
          floor={floor}
        />
        <HouseMap
          community={community}
          coord={coord}
        />
        <HouseAbout supporting={supporting} />
        <HouseProfile description={description} />
        <HouseRecommend />
        <HouseDetailOption
          onFavorite={this.handleFavorite}
          isFavorite={isFavorite}
        />
      </div>
    );
  }
}

export default Detail;
