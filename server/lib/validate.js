const utils = require('./utils');

let admins;
utils.readFile('./store/admins.json', (obj) => {
  admins = obj;
});

module.exports = function (username, token, ip, cb) {
  utils.getData({
    url: 'https://api.mojang.com/profiles/minecraft',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    json: true,
    body: [
      username,
    ],

  }, (err, body) => {
    if (err) {
      throw err;
    }
    const uuid = body.id;
    utils.getData({
      url: `https://sessionserver.mojang.com/session/minecraft/hasJoined?username=${username}&serverId=${token}&ip=${ip}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }, (err, body) => {
      if (err) {
        cb(err, null);
      }
      if (body.id === uuid) {
        cb(null, {
          valid: true,
          admin: (admins.indexOf(uuid) !== -1),
          uuid,
        });
      } else {
        cb(null, {
          valid: false,
          uuid,
        });
      }
    });
  });
};
