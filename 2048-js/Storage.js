export default class Storage {
  get tileInfo() {
    return JSON.parse(localStorage.getItem("tileInfo"));
  }

  set tileInfo(tileInfo) {
    localStorage.setItem("tileInfo", JSON.stringify(tileInfo));
  }
}
