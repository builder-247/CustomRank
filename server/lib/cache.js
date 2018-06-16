const utils = require("./utils");

let list = [];
storeList({username: "test", rank: "[test]"});


function storeList(player) {
    list.push(player);
    utils.writeFile("../store/rank_list.json", list)
}
let cache_meta = {
    date: Date.now()
};
function getList() {
    if (Date.now() - cache_meta.date > 30000) {
        console.log("Got player list from cache");
        return list;
    } else {
        cache_meta.date = Date.now();
        utils.readFile("../store/rank_list.json", (obj) => {
            return obj;
        })
    }
}

module.exports = {
    storeList,
    getList
};