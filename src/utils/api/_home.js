import http from '../http';

/** 首页轮播图 */
const getSwiper = () => http.get('/home/swiper');

/**
 * 租房小组
 * @param {Object} data 参数对象
 * @param {string} data.area 地区的id
 */
const getGroups = data => http.get('/home/groups', data);

/**
 * 资讯
 * @param {Object} data 参数对象
 * @param {string} data.area 地区的id
 */
const getNews = data => http.get('/home/news', data);

const home = {
  getSwiper,
  getGroups,
  getNews
}

export default home;
