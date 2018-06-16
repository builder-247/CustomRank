const utils = require('./utils');

const list = [];

function storeList(player) {
  list.push(player);
  utils.writeFile('../store/rank_list.json', list);
}
const cacheMeta = {
  date: Date.now(),
};
function getList() {
  if (Date.now() - cacheMeta.date > 30000) {
    console.log('Got player list from cache');
    return list;
  }
  cacheMeta.date = Date.now();
  utils.readFile('../store/rank_list.json', obj => obj);
}

module.exports = {
  storeList,
  getList,
};
