const request = require("request");
const jsonfile = require("jsonfile");

function stripFormatting(str) {
    return str.replace(/&./g, "")
}

function isAlphaNumeric(str) {
    let code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123) && // lower alpha (a-z)
            !(code === 95 || code === 91 || code === 93 || code === 38)) { // _ [ ] &
            return false;
        }
    }
    return true;
}

function getData(req, cb) {
    request(req, (err, res, body) => {
        if(err) {

        }
        cb(null, body);
    })
}

function readFile(file, cb) {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.error("[readFile] " + err)
        }
        cb(obj)
    })
}

function writeFile(file, obj, cb) {
    jsonfile.writeFile(file, obj, (err) => {
        if (err) {
            console.error("[writeFile] " + err)
        }
    })
}

module.exports = {
    stripFormatting,
    isAlphaNumeric,
    getData,
    readFile,
    writeFile
};