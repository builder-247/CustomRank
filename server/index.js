const express = require("express");
const logger = require("morgan");
const validate = require("./lib/validate");
const sanitize = require("./lib/sanitize");
const port = 3000;

const app = express();
app.use(logger("dev"));

/*
 *   Rate limiting middleware
 */
let rate_limits = [];
app.use((req, res, cb) => {
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";
    [ip] = ip.replace(/^.*:/, "").split(",");
    cb()
    // Disabled to conduct testing
    /*
    const found = rate_limits.find(el => el.ip === ip);
    if (found !== undefined) {
        if (Date.now() - found.last_request < 30000) {
            console.log(Date.now() - found.last_request);
            res.status(429).json({
                success: false,
                error: "You can only send a request every 30 seconds"
            });
        } else {
            rate_limits[rate_limits.findIndex((obj => obj.ip === ip))].last_request = Date.now();
            cb()
        }
    } else {
        rate_limits.push({
            ip: ip,
            last_request: Date.now()
        });
        cb()
    }
     */
});

app.get("/ranklist", function (req, res) {
    res.json({
        success: true,
        list: []
    })
});

const parameters = [
    "username",
    "token",
    "rank"
];
app.post("/setrank", function (req, res) {
    const query = req.query;
    console.log(query);

    let i = 0;
    for (let key in query) {
        if (query.hasOwnProperty(key) && parameters.indexOf(key) !== -1) {
            i++
        }
    }
    if (i < parameters.length) {
        res.status(400).json({
            success: false,
            error: "Invalid request"
        })
    } else {
        let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";
        [ip] = ip.replace(/^.*:/, "").split(",");
        validate(query.username, query.token, ip, (err, player) => {
            if (err) {
                // too bad
            }
            if (!player.valid) {
                res.status(403).json({
                    success: false,
                    error: "Authentication failed"
                })
            }
            sanitize(query.rank, (err, rank) => {
                if (err) {
                    res.json({
                        success: false,
                        error: err
                    })
                } else {
                    res.json({
                        success: true,
                        rank: rank
                    })
                }
            })
        });
    }
});

app.post("/ban", function (req, res) {

});

app.listen(port, () => {
    return console.log("Started server on port " + port);
});