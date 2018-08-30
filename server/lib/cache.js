const utils = require('./utils');

let list = [];

function storeList(player) {
  list = list.filter(entity => (entity.uuid !== player.uuid));
  list.push(player);
  utils.writeFile('./store/rank_list.json', list);
}
const cacheMeta = {
  date: Date.now(),
};
function getList(cb) {
  if (Date.now() - cacheMeta.date > 30000) {
    console.log('Got player list from cache');
    return cb(list);
  }
  cacheMeta.date = Date.now();
  utils.readFile('./store/rank_list.json', (err, obj) => {
    if (!err) {
      list = obj;
    }
    return cb(list);
  });
}

module.exports = {
  storeList,
  getList,
};
