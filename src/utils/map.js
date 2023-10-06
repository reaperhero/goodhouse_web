const map = {
  location() {
    const myCity = new window.BMap.LocalCity();
    const p = new Promise(rv => {
      myCity.get(res => {
        rv(res);
      });
    });
    return p;
  }
}

export default map;
