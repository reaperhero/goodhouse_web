const storage = {
  setData(key, data) {
    let hkzf = JSON.parse(localStorage.getItem('hkzf'));
    if (Object.prototype.toString.call(hkzf) !== '[object Object]') {
      hkzf = {};
    }
    hkzf[key] = data;
    localStorage.setItem('hkzf', JSON.stringify(hkzf));
  },

  getData(key) {
    let hkzf = JSON.parse(localStorage.getItem('hkzf'));
    if (Object.prototype.toString.call(hkzf) !== '[object Object]') {
      hkzf = {};
    }
    return hkzf[key];
  }
};

export default storage;
