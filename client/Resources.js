function isChangeableRank(rank) {
  var ranks = [ "VIP", "MVP", "HELPER", "MOD", "ADMIN", "YOUTUBE", "BUILD", "BEAM", "SLOTH", "MCPROHOSTING" ];
  rank = ChatLib.removeFormatting(rank);
  for(var i = 0; i < ranks.length; i++) {
    if(rank.toUpperCase().startsWith("[" + ranks[i])) {
      return true;
    }
  }
  return false;
}

function contains(obj, contains) {
  return obj.indexOf(contains) > -1;
}
