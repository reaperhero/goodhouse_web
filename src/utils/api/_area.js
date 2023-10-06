import http from '../http';

/**
 * 获取子级城市列表
 * @param {Object} params 参数对象
 * @param {string} id 地区的code
 */
const getArea = params => http.get('/area', params);

/**
 * 获取城市列表数据
 * @param {Object} params 参数对象
 * @param {number} params.level 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
 */
const getAreaCity = params => http.get('/area/city', params);

/** 查询热门城市 */
const getAreaHot = () => http.get('/area/hot');

/**
 * 根据城市名称查询该城市信息
 * @param {Object} params 参数对象
 * @param {string} params.name 地区的name值
 */
const getAreaInfo = params => http.get('/area/info', params);

/**
 * 使用关键词查询小区信息
 * @param {Object} params 参数对象
 * @param {string} params.name 关键词
 * @param {string} params.id 当前定位城市id
 */
const getAreaCommunity = params => http.get('/area/community', params);

/**
 * 根据区域id，查询该区域的房源数据
 * @param {Object} params 参数对象
 * @param {string} params.id 区域的id
 */
const getAreaMap = params => http.get('/area/map', params);

const area = {
  getArea,
  getAreaCity,
  getAreaHot,
  getAreaInfo,
  getAreaCommunity,
  getAreaMap
};

export default area;
