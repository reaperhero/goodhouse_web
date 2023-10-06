import http from '../http';

/**
 * 用户登录接口
 * @param {Object} data 用户登录的时候需要提交的内容
 * @param {string} data.username 用户名
 * @param {string} data.password 密码
 */
const login = data => http.post('/user/login', data);

/**
 * 用户注册接口
 * @param {Object} data 用户注册的时候需要提交的一些数据
 * @param {string} data.username 用户名
 * @param {string} data.password 密码
 */
const registered = data => http.post('/user/registered', data);

/** 获取用户的信息资料 */
const getUserInfo = () => http.get('/user');

/**
 * 更新用户的数据
 * @param {Object} data 需要更新的数据
 * @param {string} data.avatar 用户头像
 * @param {string} data.gender 用户性别
 * @param {string} data.nickname 用户昵称
 * @param {string} data.phone 用户电话
 */
const setUserInfo = data => http.post('/user', data);

/** 查看收藏列表 */
const getFavorites = () => http.get('/user/favorites');

/**
 * 房屋是否收藏
 * @param {string} id 房屋的code值
 */
const getFavoritesById = id => http.get(`/user/favorites/${id}`);

/**
 * 添加收藏
 * @param {string} id 房屋的code值
 */
const favorites = id => http.post(`/user/favorites/${id}`);

/**
 * 添加收藏
 * @param {string} id 房屋的code值
 */
const unFavorites = id => http.delete(`/user/favorites/${id}`);

const user = {
  login,
  registered,
  getUserInfo,
  setUserInfo,
  getFavorites,
  getFavoritesById,
  favorites,
  unFavorites
};

export default user;
