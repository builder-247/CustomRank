const express = require("express");
const logger = require("morgan");
const config = require("./config");
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

    const found = rate_limits.find(el => el.ip === ip);
    if (found !== undefined) {
        if (Date.now() - found.last_request < config.API_THROTTLE) {
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

// 404 route
app.use((req, res) =>
    res.status(404).json({
        success: false,
        error: "Not Found",
    }));
// 500 route
app.use((err, req, res, cb) => {
    return res.status(500).json({
        success: false,
        error: "Internal Server Error",
    });
});

const server = app.listen(port, () => {
    console.log("Started server on port " + port);
});
/**
 * Wait for connections to end, then shut down
 * */
function gracefulShutdown() {
    console.log("Received kill signal, shutting down gracefully.");
    server.close(() => {
        console.log("Closed out remaining connections.");
        process.exit();
    });
    // if after
    setTimeout(() => {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit();
    }, 10 * 1000);
}
// listen for TERM signal e.g. kill
process.once("SIGTERM", gracefulShutdown);
// listen for INT signal e.g. Ctrl-C
process.once("SIGINT", gracefulShutdown);