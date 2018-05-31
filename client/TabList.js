register("tick", function() {

  var toggle = customRankSettings.getSetting("Custom Rank", "Toggle Module");
  var nick = customRankSettings.getSettingObject("Custom Rank", "Nick").text;
  var rank = customRankSettings.getSettingObject("Custom Rank", "Rank").text;

  if(!toggle || Player.getPlayer() == undefined || Player.getDisplayName() == undefined) {
    return;
  }

  Player.setTabDisplayName(new TextComponent(rank + " " + nick));
});
