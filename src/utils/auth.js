import storage from './storage';

const checkLogin = () => !!storage.getData('token');

export { checkLogin };
