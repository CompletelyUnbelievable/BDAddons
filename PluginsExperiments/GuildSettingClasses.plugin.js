//META{"name":"GuildSettingClasses"}*//

var PluginName, PluginDesc, PluginVers, PluginAuth, ClassElement, ClassName;


class GuildSettingClasses {

	getName () {PluginName = "GuildSettingClasses"; return PluginName;}

	getDescription () {PluginDesc = "A base for plugin creation."; return PluginDesc;}

	getVersion () {PluginVers = "Alpha"; return PluginVers;}

	getAuthor () {PluginAuth = "CompletelyUnbelievable"; return PluginAuth;}

	start () {
		ClassElement= [];
		ClassName = [];
		BdApi.injectCSS(PluginName + 'CSS', setStyles());
		GuildSettings();
	}

	observer () {
		GuildSettings();
	}

	stop () {
		RemoveArray();
		if (document.getElementById(PluginName + 'CSS')) {
			BdApi.clearCSS(PluginName + 'CSS');
		}
	}

}

function GuildSettings() {
	if (document.getElementsByClassName('ui-standard-sidebar-view')[0]) {
		FindModify('item-PXvHYJ');
		if (document.getElementsByClassName('ui-tab-bar-item')[0]) {
			FindModify('ui-tab-bar-item');
		}
	}
}

function FindModify(x) {
	if (document.getElementsByClassName(x)[0]) {
		for (i = 0; i < document.getElementsByClassName(x).length; i++) {
				ClassElement[i] = document.getElementsByClassName(x)[i];
				ClassName[i] = document.getElementsByClassName(x)[i].innerHTML.replace(/ |'|&amp;|&/igm, "");
				if (ClassElement[i].classList.contains(ClassName[i]) == false) {
					ClassElement[i].classList.add(ClassName[i]);
				}
		}
	}
}

function RemoveArray() {
	if (Array.isArray(ClassElement) && Array.isArray(ClassName)) {
		for (i = 0; i < ClassElement.length; i++) {
				ClassElement[i].classList.remove(ClassName[i]);
		}
	}
}

function setStyles() {
	var styles = `#user-settings .item-PXvHYJ, #bd-settings-sidebar .ui-tab-bar-item {
		padding-left:34px
	}

	#user-settings .item-PXvHYJ:before, #bd-settings-sidebar .ui-tab-bar-item:before {
		content:"";
		position: absolute;
		left: 4px;
		top: 4px;
		height: 24px;
		width: 24px;
		background: #4b4a42
	}
	
	#user-settings .item-PXvHYJ:hover:before, #user-settings .itemSelected-1qLhcL:before, #bd-settings-sidebar .ui-tab-bar-item:hover:before {
		background: rgb(202, 195, 176)
	}
	
	#user-settings .item-PXvHYJ.MyAccount:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Account.svg);
		mask:none;
	}
	#user-settings .item-PXvHYJ.PrivacySafety:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/PrivacySafety.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.AuthorizedApps:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/AuthorizedApps.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.Connections:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Connection.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.Billing:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Billing.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.DiscordNitro:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/NitroSetting.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.HypeSquad:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/HypeSquadSetting.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.VoiceVideo:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/VoiceVideo.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.Overlay:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/overlay.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.Notifications:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Notifications.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.Keybinds:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Keybinds.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.GameActivity:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Games.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.TextImages:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/TextImage.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.Appearance:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Apperance.svg);
		mask:none;
	}
	
	#user-settings .item-PXvHYJ.StreamerMode:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Streamer.svg);
		mask:none;
	}
		
	#user-settings .item-PXvHYJ.Language:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Language.svg);
		mask:none;
	}
	
	#user-settings .item-PXvHYJ.WindowsSettings:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/WindowSetting.svg);
		mask:none;
	}
	
	#user-settings .item-PXvHYJ.ChangeLog:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/ChangeLog.svg);
		mask:none;
	}
	
	#user-settings .item-PXvHYJ.LogOut:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/LogOut.svg);
		mask:none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.Core:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/CoreSetting.svg);
		mask:none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.ZeresFork:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/ZereFork.svg);
		mask:none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.Emotes:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Emote.svg);
		mask:none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.CustomCSS:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/CCSS.svg);
		mask:none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.Plugins:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Plugins.svg);
		mask:none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.Themes:before {
		-webkit-mask:url(https://cdn.rawgit.com/Mixter213/Discord-Themes/master/Icons/Themes.svg);
		mask:none;
	}`;

	return styles;
}
