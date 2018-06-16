const utils = require('./utils');
const config = require('../config');

const allowedRanks = [];
const allowedFormatting = ['&0', '&1', '&2', '&3', '&4', '&5', '&6', '&7', '&8', '&9', '&a', '&b', '&c', '&d', '&e', '&f', '&r'];
const disallowedRanks = ['[VIP]', '[VIP+]', '[MVP]', '[MVP+]', '[MVP++]', '[YOUTUBER]', '[HELPER]', '[MOD]', '[ADMIN]'];

module.exports = function sanitize(rank, cb) {
  const cleanRank = utils.stripFormatting(rank);
  if (config.ENABLE_CUSTOM_RANKS) {
    if (!utils.isAlphaNumeric(cleanRank)) {
      return cb('Rank must be alphanumeric!', null);
    }
    if (disallowedRanks.indexOf(cleanRank) !== -1) {
      return cb('Custom rank must not be an existing rank!', null);
    }
    if (!cleanRank.startsWith('[') || !cleanRank.endsWith(']')) {
      return cb('Custom rank must end and start with a square bracket!', null);
    }
    if (cleanRank.length > 18) {
      return cb("Custom rank can't be longer than 16 characters!");
    }
    return cb(null, rank);
  }
  if (allowedRanks.indexOf(cleanRank) !== -1) {
    return cb('Custom rank not whitelisted!', null);
  }
  return cb(null, rank);
};
