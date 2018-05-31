register("tick", function() {
  var rank = customRankSettings.getSettingObject("Custom Rank", "Rank").text;

  if(customRankSettings.getSetting("Custom Rank", "Toggle Module")) {
    Scoreboard.resetCache();
    if(Scoreboard.getTitle().trim() != "" && Scoreboard.getLines().length > 0) {
      for(var i = 0; i < Scoreboard.getLines().length; i++) {
        var line = Scoreboard.getLines().get(i);
        if(contains(line.getName(), "Rank: ")) {
           Scoreboard.setLine(line.getPoints(), "§fRank: " + rank.replace(/\[/g, "").replace(/]/g, "").replace(/&/g, "§"), true);
        }
      }
    }
  }
});
