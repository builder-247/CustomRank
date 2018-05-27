register("chat", function(event) {
  var toggle = customRankSettings.getSetting("Custom Rank", "Toggle Module");
  var nick = customRankSettings.getSettingObject("Custom Rank", "Nick").text;
  var rank = customRankSettings.getSettingObject("Custom Rank", "Rank").text;

  if(!toggle) {
    return;
  }
  var playerName = Player.getName();
  var msg = ChatLib.getChatMessage(event, true);
  if (!contains(ChatLib.removeFormatting(msg), playerName)) {
    return;
  }
  msg = msg.replace(/&r/g, "");
  var ranks = msg.substring(0, msg.indexOf(playerName)-1);
  var split = ranks.split(" ");
  for(var i = 0; i < split.length; i++) {
    print("l" + split[i] + "l");
  }
  var donorRank = split[split.length - 1];

  if (!isChangeableRank(donorRank)) {
    msg = msg.replace(playerName, ((ChatLib.removeFormatting(msg).indexOf(playerName + ":") > -1) ? rank + " " : "") + nick);
  } else {
    msg = msg.replace(donorRank + " " + playerName, rank + " " + nick);
  }
  msg = msg.replace(nick + "&7", nick + "&f");
  ChatLib.chat(msg);
  cancel(event);
}).setPriority(Priority.LOW).triggerIfCanceled(false);
