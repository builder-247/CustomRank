const uuidv4 = require('uuid/v4');
const utils = require('./utils');

const sessionStore = {};
function create(username, hash, ip, cb) {
  utils.getUUID(username, (UUIDerr, uuid) => {
    utils.getData({
      url: `https://sessionserver.mojang.com/session/minecraft/hasJoined?username=${username}&serverId=${hash}&ip=${ip}`,
      method: 'GET',
      json: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }, (err, body) => {
      if (err) {
        cb(err, null);
      }
      if (typeof body === 'object' && body.id === uuid) {
        const token = uuidv4();
        sessionStore[uuid] = {
          token,
          expiresAt: Date.now() + (1000 * 60 * 60 * 2),
        };
        cb(null, {
          valid: true,
          token,
          uuid,
        });
      } else {
        cb('Failed to verify hash. Is minecraft session down?', {
          valid: false,
          uuid,
        });
      }
    });
  });
}

function verify(username, token, cb) {
  utils.getUUID(username, (UUIDerr, uuid) => {
    const session = sessionStore[uuid];
    if (session.token === token) {
      console.log(`ExpiresAt: ${session.expiresAt} : Now: ${Date.now()}`);
      if (session.expiresAt > Date.now()) {
        cb(null);
      } else {
        delete sessionStore[uuid];
        cb('Token expired');
      }
    } else {
      cb('Invalid token');
    }
  });
}

/*
* Automatically clear expired sessions
 */
(function cleaner() {
  setInterval(() => {
    Object.keys(sessionStore).forEach((session) => {
      if (sessionStore[session].expiresAt > Date.now()) {
        delete sessionStore[session];
      }
    });
  }, 60 * 1000);
}());

module.exports = {
  create,
  verify,
};
