const utils = require("./utils");

module.exports = function (username, token, ip, cb) {
    utils.getData({
        url: "https://api.mojang.com/profiles/minecraft",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: [username]

    }, (err, body) => {
        if (err) {
            throw err;
        }
        const uuid = body.id;
        utils.getData({
            url: "https://sessionserver.mojang.com/session/minecraft/hasJoined?username=" + username + "&serverId=" + token + "&ip=" + ip,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }, (err, body) => {
            if (err) {
                cb(err, null)
            }
            if (body.id === uuid) {
                cb(null, {
                    valid: true,
                    uuid: uuid
                })
            } else {
                cb(null, {
                    valid: false,
                    uuid: uuid
                })
            }
        })
    });
};