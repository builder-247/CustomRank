var customRankCommandString = "crank";

var customRankSettings = new SettingsObject("CustomRank", [
    {
        name: "Custom Rank",
        settings: [
            new Setting.Toggle("Toggle Module", true),
            new Setting.TextInput("Rank", "&c[&fYOUTUBE&c]"),
            new Setting.TextInput("Nick", Player.getName()),
            new Setting.Toggle("First Load", true),
            new Setting.Button("Reset Settings", "click", function() {
                customRankSettings.reset();
                customRankSettings.load();
            })
        ]
    }
]);

customRankSettings.setCommand(customRankCommandString).setSize(250, 90);

Setting.register(customRankSettings);

register("worldLoad", function() {
  var firstLoad = customRankSettings.getSettingObject("Custom Rank", "First Load");
  if(firstLoad.value) {
    new Message(
			"&c&m" + ChatLib.getChatBreak("-") + "\n",
			"&cSince this is your first time running Custom Rank, use &e/" + customRankCommandString + "&c to access all the module settings\n",
			"&c&m" + ChatLib.getChatBreak("-")
    ).chat();
    firstLoad.value = false;
    customRankSettings.save();
  }
});
