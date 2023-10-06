import http from '../http';

/**
 * 根据条件查询房屋所需要的各种数据
 * @param {Object} params 参数对象
 * @param {string} params.cityId 地区的id
 * @param {string} [params.area] 地区
 * @param {string} [params.subway] 地铁
 * @param {boolean} [params.rentType] 整租
 * @param {number} [params.price] 价格
 * @param {string} [params.more] 复合查询
 * @param {string} [params.roomType] 房屋类型
 * @param {string} [params.oriented] 朝向
 * @param {string} [params.characteristic] 标签
 * @param {string} [params.floor] 楼层
 * @param {number} [params.start] 开始项
 * @param {number} [params.end] 结束项
 */
const getHouses = params => http.get('/houses', params);

/**
 * 查询房屋具体信息
 * @param {string} id 发送房屋的具体code值
 */
const getHousesById = id => http.get(`/houses/${id}`);

/**
 * 获取房屋查询条件
 * @param {Object} params 参数对象
 * @param {string} params.id 城市id
 */
const getHousesCondition = params => http.get('/houses/condition', params);

const houses = {
  getHouses,
  getHousesCondition,
  getHousesById
};

export default houses;
