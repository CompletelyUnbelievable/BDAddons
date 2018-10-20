//META{"name":"GuildSettingClasses"}*//

let GSCRemoveClass;

class GuildSettingClasses {

	getName () {return "GuildSettingClasses";}

	getDescription () {return "Adds classes and styles for the settings menu.";}

	getVersion () {return "Alpha";}

	getAuthor () {return "CompletelyUnbelievable";}

	start () {
		GSCRemoveClass = ["GSCMyAccount", "GSCAuthorizedApps", "GSCConnections", "GSCBilling", "GSCDiscordNitro", "GSCHypeSquad", "GSCVoiceVideo", "GSCOverlay", "GSCNotifications", "GSCKeybinds", "GSCGameActivity", "GSCGameLibrary", "GSCTextImages", "GSCAppearance", "GSCStreamerMode", "GSCLanguage", "GSCWindowsSettings", "GSCChangeLog", "GSCLogOut", "GSCCore", "GSCZeresFork", "GSCEmotes", "GSCCustomCSS", "GSCPlugins", "GSCThemes"];
		BdApi.injectCSS(this.getName() + 'CSS', setStyles());
		BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has started.');
		GuildSettings();
	}

	observer () {
		GuildSettings();
	}

	stop () {
		if (document.getElementById(this.getName() + 'CSS')) {
			BdApi.clearCSS(this.getName() + 'CSS');
		}
		Remove();
		BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has stopped.');
	}

}

function GuildSettings() {
	if (document.getElementsByClassName('sidebarRegion-VFTUkN')[0]) {
		FindModify('item-PXvHYJ');
		if (document.getElementsByClassName('ui-tab-bar-item')[0]) {
			FindModify('ui-tab-bar-item');
		}
	}
}

function FindModify(x) {
	let ClassElement = [], ClassName = [];
	if (document.getElementsByClassName(x)[0]) {
		for (i = 0; i < document.getElementsByClassName(x).length; i++) {
				ClassElement[i] = document.getElementsByClassName(x)[i];
				ClassName[i] = "GSC" + (document.getElementsByClassName(x)[i].innerHTML).replace(/ |'|&amp;|&/igm, "");				
				if (ClassElement[i].classList.contains(ClassName[i]) == false) {
					ClassElement[i].classList.add(ClassName[i]);
					if (!GSCRemoveClass.includes(ClassName[i])) {
						GSCRemoveClass.push(ClassName[i]);
					}
				}
		}
	}
}

function Remove() {
	if (document.getElementsByClassName('ui-standard-sidebar-view')[0] || document.getElementsByClassName('ui-tab-bar-item')[0]) {
		for (i = 0; i < GSCRemoveClass.length; i++) {
			if (document.getElementsByClassName(GSCRemoveClass[i])) {
				let elements = document.getElementsByClassName(GSCRemoveClass[i]);
					for (x = 0; x < elements.length; x++) {
						elements[x].classList.remove(GSCRemoveClass[i]);
					}
			}
		}
	}
}

function setStyles() {
	let styles = `#user-settings .item-PXvHYJ, #bd-settings-sidebar .ui-tab-bar-item {
		padding-left: 34px;
	}

	#user-settings .item-PXvHYJ:before, #bd-settings-sidebar .ui-tab-bar-item:before {
		content:"";
		position: absolute;
		left: 4px;
		top: 4px;
		height: 24px;
		width: 24px;
		background: #4b4a42;
	}
	
	#user-settings .item-PXvHYJ:hover:before, #user-settings .itemSelected-1qLhcL:before, #bd-settings-sidebar .ui-tab-bar-item:hover:before {
		background: rgb(202, 195, 176);
	}
	
	#user-settings .item-PXvHYJ.GSCMyAccount:before {
		-webkit-mask: var(--MyAccountSVG);
		mask: none;
	}
	#user-settings .item-PXvHYJ.GSCPrivacySafety:before {
		-webkit-mask: var(--PrivacySafetySVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCAuthorizedApps:before {
		-webkit-mask: var(--AuthorizedAppsSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCConnections:before {
		-webkit-mask: var(--ConnectionsSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCBilling:before {
		-webkit-mask: var(--BillingSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCDiscordNitro:before {
		-webkit-mask: var(--DiscordNitroSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCHypeSquad:before {
		-webkit-mask: var(--HypeSquadSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCVoiceVideo:before {
		-webkit-mask: var(--VoiceVideoSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCOverlay:before {
		-webkit-mask: var(--OverlaySVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCNotifications:before {
		-webkit-mask: var(--NotificationsSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCKeybinds:before {
		-webkit-mask: var(--KeybindsSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCGameActivity:before {
		-webkit-mask: var(--GameActivitySVG);
		mask: none;
	}
	
	#user-settings .item-PXvHYJ.GSCGameLibrary:before {
		-webkit-mask: var(--GameLibrarySVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCTextImages:before {
		-webkit-mask: var(--TextImagesSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCAppearance:before {
		-webkit-mask: var(--AppearanceSVG);
		mask: none;
	}
	
	#user-settings .item-PXvHYJ.GSCStreamerMode:before {
		-webkit-mask: var(--StreamerModeSVG);
		mask: none;
	}
		
	#user-settings .item-PXvHYJ.GSCLanguage:before {
		-webkit-mask: var(--LanguageSVG);
		mask: none;
	}
	
	#user-settings .item-PXvHYJ.GSCWindowsSettings:before {
		-webkit-mask: var(--WindowsSettingsSVG);
		mask: none;
	}
	
	#user-settings .item-PXvHYJ.GSCChangeLog:before {
		-webkit-mask: var(--ChangeLogSVG);
		mask: none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.GSCCore:before {
		-webkit-mask: var(--BDCoreSVG);
		mask: none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.GSCZeresFork:before {
		-webkit-mask: var(--BDZeresForkSVG);
		mask: none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.GSCEmotes:before {
		-webkit-mask: var(--BDEmotesSVG);
		mask: none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.GSCCustomCSS:before {
		-webkit-mask: var(--BDCustomCSSSVG);
		mask: none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.GSCPlugins:before {
		-webkit-mask: var(--BDPluginsSVG);
		mask: none;
	}
	
	#bd-settings-sidebar .ui-tab-bar-item.GSCThemes:before {
		-webkit-mask: var(--BDThemesSVG);
		mask: none;
	}

	#user-settings .item-PXvHYJ.GSCLogOut:before {
		-webkit-mask: var(--LogOutSVG);
		mask: none;
	}
	
	:root {
		--DefaultActivitySVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxwYXRoIGQ9Ik01Ljc5MzM1NzYxLDUgTDE4LjIwNjY0MjQsNSBDMTkuNzgwNTU4NCw1IDIxLjA4Njg4MTYsNi4yMTYzNDI2NCAyMS4xOTkwMTg1LDcuNzg2MjU4ODUgTDIxLjg1NzUwNTksMTcuMDA1MDgyNiBDMjEuOTMwNzgyNSwxOC4wMzA5NTQ4IDIxLjE1ODU1MTIsMTguOTIxOTkwOSAyMC4xMzI2NzksMTguOTk1MjY3NSBDMjAuMDg4NTIzLDE4Ljk5ODQyMTUgMjAuMDQ0MjY4NSwxOSAyMCwxOSBDMTguODI0NTg2MywxOSAxNy44MDAwMDg0LDE4LjIwMDAzMzggMTcuNTE0OTI4NywxNy4wNTk3MTUgTDE3LDE1IEw3LDE1IEw2LjQ4NTA3MTI1LDE3LjA1OTcxNSBDNi4xOTk5OTE1NSwxOC4yMDAwMzM4IDUuMTc1NDEzNywxOSA0LDE5IEMyLjk3MTUxNDEzLDE5IDIuMTM3NzYxNTksMTguMTY2MjQ3NSAyLjEzNzc2MTU5LDE3LjEzNzc2MTYgQzIuMTM3NzYxNTksMTcuMDkzNDkzMSAyLjEzOTM0MDEsMTcuMDQ5MjM4NiAyLjE0MjQ5NDEsMTcuMDA1MDgyNiBMMi44MDA5ODE1MSw3Ljc4NjI1ODg1IEMyLjkxMzExODM4LDYuMjE2MzQyNjQgNC4yMTk0NDE2MSw1IDUuNzkzMzU3NjEsNSBaIE0xNC41LDEwIEMxNS4zMjg0MjcxLDEwIDE2LDkuMzI4NDI3MTIgMTYsOC41IEMxNiw3LjY3MTU3Mjg4IDE1LjMyODQyNzEsNyAxNC41LDcgQzEzLjY3MTU3MjksNyAxMyw3LjY3MTU3Mjg4IDEzLDguNSBDMTMsOS4zMjg0MjcxMiAxMy42NzE1NzI5LDEwIDE0LjUsMTAgWiBNMTguNSwxMyBDMTkuMzI4NDI3MSwxMyAyMCwxMi4zMjg0MjcxIDIwLDExLjUgQzIwLDEwLjY3MTU3MjkgMTkuMzI4NDI3MSwxMCAxOC41LDEwIEMxNy42NzE1NzI5LDEwIDE3LDEwLjY3MTU3MjkgMTcsMTEuNSBDMTcsMTIuMzI4NDI3MSAxNy42NzE1NzI5LDEzIDE4LjUsMTMgWiBNNiw5IEw0LDkgTDQsMTEgTDYsMTEgTDYsMTMgTDgsMTMgTDgsMTEgTDEwLDExIEwxMCw5IEw4LDkgTDgsNyBMNiw3IEw2LDkgWiIvPg0KPC9zdmc+DQo=');
		--DefaultLibrarySVG: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LDEzLjYgTDE3LjM5OTk5OTIsMTMuNiBDMTkuMDQwNjczNSwxMy42IDIwLjQ5Njc4MSwxMi44MDk3NzU0IDIxLjQwODQ3NTcsMTEuNTg5MTcyMiBMMjEuODE5ODc2MSwxOC44Mjk4MTk5IEMyMS45MTM4NjQsMjAuNDg0MDA2MiAyMC42NDkwNzMzLDIxLjkwMTE4MTQgMTguOTk0ODg3LDIxLjk5NTE2OTIgQzE4LjkzODIxNzQsMjEuOTk4Mzg5MSAxOC44ODE0Njc5LDIyIDE4LjgyNDcwNjksMjIgTDUuMTc1MjkzMSwyMiBDMy41MTg0Mzg4NSwyMiAyLjE3NTI5MzEsMjAuNjU2ODU0MiAyLjE3NTI5MzEsMTkgQzIuMTc1MjkzMSwxOC45NDMyMzkgMi4xNzY5MDQwMSwxOC44ODY0ODk1IDIuMTgwMTIzODcsMTguODI5ODE5OSBMMi41OTE1MjQyNSwxMS41ODkxNzMyIEMzLjUwMzIxOSwxMi44MDk3NzU4IDQuOTU5MzI2MTMsMTMuNiA2LjYsMTMuNiBMNywxMy42IEw3LDE1IEw5LDE1IEw5LDEzLjYgTDE1LDEzLjYgTDE1LDE1IEwxNywxNSBMMTcsMTMuNiBaIE03LDE2IEw3LDE4IEw5LDE4IEw5LDE2IEw3LDE2IFogTTE1LDE2IEwxNywxNiBMMTcsMTggTDE1LDE4IEwxNSwxNiBaIE0xNSwxMS42IEw5LDExLjYgTDksOSBMNyw5IEw3LDExLjYgTDYuNiwxMS42IEM0Ljk0MzE0NTc1LDExLjYgMy42LDEwLjI1Njg1NDIgMy42LDguNiBMMy42LDUgQzMuNiwzLjM0MzE0NTc1IDQuOTQzMTQ1NzUsMiA2LjYsMiBMMTcuMzk5OTk5MiwyIEMxOS4wNTY4NTM1LDIgMjAuMzk5OTk5MiwzLjM0MzE0NTc1IDIwLjM5OTk5OTIsNSBMMjAuMzk5OTk5Miw4LjYgQzIwLjM5OTk5OTIsMTAuMjU2ODU0MiAxOS4wNTY4NTM1LDExLjYgMTcuMzk5OTk5MiwxMS42IEwxNywxMS42IEwxNyw5IEwxNSw5IEwxNSwxMS42IFoiLz4NCjwvc3ZnPg==');
		--DefaultStoreSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE3LjUgMTJhMS41IDEuNSAwIDAgMS0xLjUtMS41QTEuNSAxLjUgMCAwIDEgMTcuNSA5YTEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjVtLTMtNEExLjUgMS41IDAgMCAxIDEzIDYuNSAxLjUgMS41IDAgMCAxIDE0LjUgNSAxLjUgMS41IDAgMCAxIDE2IDYuNSAxLjUgMS41IDAgMCAxIDE0LjUgOG0tNSAwQTEuNSAxLjUgMCAwIDEgOCA2LjUgMS41IDEuNSAwIDAgMSA5LjUgNSAxLjUgMS41IDAgMCAxIDExIDYuNSAxLjUgMS41IDAgMCAxIDkuNSA4bS0zIDRBMS41IDEuNSAwIDAgMSA1IDEwLjUgMS41IDEuNSAwIDAgMSA2LjUgOSAxLjUgMS41IDAgMCAxIDggMTAuNSAxLjUgMS41IDAgMCAxIDYuNSAxMk0xMiAzYTkgOSAwIDAgMC05IDkgOSA5IDAgMCAwIDkgOSAxLjUgMS41IDAgMCAwIDEuNS0xLjVjMC0uMzktLjE1LS43NC0uMzktMS0uMjMtLjI3LS4zOC0uNjItLjM4LTFhMS41IDEuNSAwIDAgMSAxLjUtMS41SDE2YTUgNSAwIDAgMCA1LTVjMC00LjQyLTQuMDMtOC05LTh6Ii8+Cjwvc3ZnPgo=');
		--DefaultFriendsSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE3LjUgMTJhMS41IDEuNSAwIDAgMS0xLjUtMS41QTEuNSAxLjUgMCAwIDEgMTcuNSA5YTEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjVtLTMtNEExLjUgMS41IDAgMCAxIDEzIDYuNSAxLjUgMS41IDAgMCAxIDE0LjUgNSAxLjUgMS41IDAgMCAxIDE2IDYuNSAxLjUgMS41IDAgMCAxIDE0LjUgOG0tNSAwQTEuNSAxLjUgMCAwIDEgOCA2LjUgMS41IDEuNSAwIDAgMSA5LjUgNSAxLjUgMS41IDAgMCAxIDExIDYuNSAxLjUgMS41IDAgMCAxIDkuNSA4bS0zIDRBMS41IDEuNSAwIDAgMSA1IDEwLjUgMS41IDEuNSAwIDAgMSA2LjUgOSAxLjUgMS41IDAgMCAxIDggMTAuNSAxLjUgMS41IDAgMCAxIDYuNSAxMk0xMiAzYTkgOSAwIDAgMC05IDkgOSA5IDAgMCAwIDkgOSAxLjUgMS41IDAgMCAwIDEuNS0xLjVjMC0uMzktLjE1LS43NC0uMzktMS0uMjMtLjI3LS4zOC0uNjItLjM4LTFhMS41IDEuNSAwIDAgMSAxLjUtMS41SDE2YTUgNSAwIDAgMCA1LTVjMC00LjQyLTQuMDMtOC05LTh6Ii8+Cjwvc3ZnPgo=');
		/*End of default SVG images*/
		--MyAccountSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxwYXRoIGQ9Ik0xMiA0YTQgNCAwIDAgMSA0IDQgNCA0IDAgMCAxLTQgNCA0IDQgMCAwIDEtNC00IDQgNCAwIDAgMSA0LTRtMCAxMGM0LjQyIDAgOCAxLjc5IDggNHYySDR2LTJjMC0yLjIxIDMuNTgtNCA4LTR6Ii8+DQo8L3N2Zz4NCg==');
		--PrivacySafetySVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEyIDEyaDdjLS41MyA0LjExLTMuMjggNy43OC03IDguOTJWMTJINVY2LjNsNy0zLjExTTEyIDFMMyA1djZjMCA1LjU1IDMuODQgMTAuNzMgOSAxMiA1LjE2LTEuMjcgOS02LjQ1IDktMTJWNWwtOS00eiIvPgo8L3N2Zz4K');
		--AuthorizedAppsSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE2IDIwaDR2LTRoLTRtMC0yaDR2LTRoLTRtLTYtMmg0VjRoLTRtNiA0aDRWNGgtNG0tNiAxMGg0di00aC00bS02IDRoNHYtNEg0bTAgMTBoNHYtNEg0bTYgNGg0di00aC00TTQgOGg0VjRINHY0eiIvPgo8L3N2Zz4K');
		--ConnectionsSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE2IDZoLTN2MS45aDNhNC4xIDQuMSAwIDAgMSA0LjEgNC4xIDQuMSA0LjEgMCAwIDEtNC4xIDQuMWgtM1YxOGgzYTYgNiAwIDAgMCA2LTZjMC0zLjMyLTIuNjktNi02LTZNMy45IDEyQTQuMSA0LjEgMCAwIDEgOCA3LjloM1Y2SDhhNiA2IDAgMCAwLTYgNiA2IDYgMCAwIDAgNiA2aDN2LTEuOUg4Yy0yLjI2IDAtNC4xLTEuODQtNC4xLTQuMU04IDEzaDh2LTJIOHYyeiIvPgo8L3N2Zz4K');
		--BillingSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIwIDhINFY2aDE2bTAgMTJINHYtNmgxNm0wLThINGMtMS4xMSAwLTIgLjg5LTIgMnYxMmEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWNmEyIDIgMCAwIDAtMi0yeiIvPgo8L3N2Zz4K');
		--DiscordNitroSVG: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+DQogIDxwYXRoIGQ9Ik00Ljk0IDYuMzVjLS4zOS0uMzktLjM5LTEuMDMgMC0xLjQyYS45OTYuOTk2IDAgMCAxIDEuNDEgMGw2LjcyIDUuMzguMzUuMjhjLjc4Ljc4Ljc4IDIuMDUgMCAyLjgzLS43OC43OC0yLjA1Ljc4LTIuODMgMGwtLjI4LS4zNS01LjM3LTYuNzJNMTIgMjBhOCA4IDAgMCAwIDgtOGMwLTIuMjEtLjktNC4yMS0yLjM0LTUuNjZsMS40MS0xLjQxQTkuOTY5IDkuOTY5IDAgMCAxIDIyIDEyYTEwIDEwIDAgMCAxLTEwIDEwQTEwIDEwIDAgMCAxIDIgMTJoMmE4IDggMCAwIDAgOCA4bTAtMTlhMiAyIDAgMCAxIDIgMiAyIDIgMCAwIDEtMiAyIDIgMiAwIDAgMS0yLTIgMiAyIDAgMCAxIDItMnoiLz4NCjwvc3ZnPg0K');
		--HypeSquadSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogIDxwYXRoIGQ9Ik0xMiA2YTMgMyAwIDAgMC0zIDMgMyAzIDAgMCAwIDMgMyAzIDMgMCAwIDAgMy0zIDMgMyAwIDAgMC0zLTNNNiA4LjE3YTIuNSAyLjUgMCAwIDAtMi41IDIuNSAyLjUgMi41IDAgMCAwIDIuNSAyLjVjLjg4IDAgMS42NS0uNDYgMi4wOS0xLjE0QzcuNDIgMTEuMTggNyAxMC4xNSA3IDljMC0uMiAwLS40LjA0LS42LS4zMi0uMTUtLjY3LS4yMy0xLjA0LS4yM20xMiAwYy0uMzcgMC0uNzIuMDgtMS4wNC4yMy4wNC4yLjA0LjQuMDQuNiAwIDEuMTUtLjQyIDIuMTgtMS4wOSAzLjAzQTIuNDkgMi40OSAwIDAgMCAxOCAxMy4xN2EyLjUgMi41IDAgMCAwIDIuNS0yLjUgMi41IDIuNSAwIDAgMC0yLjUtMi41TTEyIDE0Yy0yIDAtNiAxLTYgM3YyaDEydi0yYzAtMi00LTMtNi0zbS03LjMzLjk3QzMgMTUuMjYgMSAxNi4wNCAxIDE3LjMzVjE5aDN2LTJjMC0uNzguMjktMS40Ny42Ny0yLjAzbTE0LjY2IDBjLjM4LjU2LjY3IDEuMjUuNjcgMi4wM3YyaDN2LTEuNjdjMC0xLjI5LTItMi4wNy0zLjY3LTIuMzZ6Ii8+DQo8L3N2Zz4NCg==');
		--VoiceVideoSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEyIDJhMyAzIDAgMCAxIDMgM3Y2YTMgMyAwIDAgMS0zIDMgMyAzIDAgMCAxLTMtM1Y1YTMgMyAwIDAgMSAzLTNtNyA5YzAgMy41My0yLjYxIDYuNDQtNiA2LjkzVjIxaC0ydi0zLjA3Yy0zLjM5LS40OS02LTMuNC02LTYuOTNoMmE1IDUgMCAwIDAgNSA1IDUgNSAwIDAgMCA1LTVoMnoiLz4KPC9zdmc+Cg==');
		--OverlaySVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE0IDN2MmgzLjU5bC05LjgzIDkuODMgMS40MSAxLjQxTDE5IDYuNDFWMTBoMlYzbS0yIDE2SDVWNWg3VjNINWMtMS4xMSAwLTIgLjg5LTIgMnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJ2LTdoLTJ2N3oiLz4KPC9zdmc+Cg==');
		--NotificationsSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIxIDE5djFIM3YtMWwyLTJ2LTZjMC0zLjEgMi4wMy01LjgzIDUtNi43MVY0YTIgMiAwIDAgMSAyLTIgMiAyIDAgMCAxIDIgMnYuMjljMi45Ny44OCA1IDMuNjEgNSA2LjcxdjZsMiAybS03IDJhMiAyIDAgMCAxLTIgMiAyIDIgMCAwIDEtMi0yIi8+Cjwvc3ZnPgo=');
		--KeybindsSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE5IDEwaC0yVjhoMm0wIDVoLTJ2LTJoMm0tMy0xaC0yVjhoMm0wIDVoLTJ2LTJoMm0wIDZIOHYtMmg4bS05LTVINVY4aDJtMCA1SDV2LTJoMm0xIDBoMnYySDhtMC01aDJ2Mkg4bTMgMWgydjJoLTJtMC01aDJ2MmgtMm05LTVINGMtMS4xMSAwLTIgLjg5LTIgMnYxMGEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWN2EyIDIgMCAwIDAtMi0yeiIvPgo8L3N2Zz4K');
		--GameActivitySVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE2LjUgOWwtMyAzIDMgM0gyMlY5TTkgMTYuNVYyMmg2di01LjVsLTMtM003LjUgOUgydjZoNS41bDMtM00xNSA3LjVWMkg5djUuNWwzIDMgMy0zeiIvPgo8L3N2Zz4K');
		--GameLibrarySVG: var(--DefaultLibrarySVG);
		--TextImagesSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIwIDJINGEyIDIgMCAwIDAtMiAydjE4bDQtNGgxNGEyIDIgMCAwIDAgMi0yVjRhMiAyIDAgMCAwLTItMk02IDloMTJ2Mkg2bTggM0g2di0yaDhtNC00SDZWNmgxMiIvPgo8L3N2Zz4=');
		--AppearanceSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEzLjczIDE1bC0zLjkgNi43NmE5Ljk4NCA5Ljk4NCAwIDAgMCA4LjQ5LTIuMDFsLTMuNjYtNi4zNU0yLjQ2IDE1Yy45MiAyLjkyIDMuMTUgNS4yNiA1Ljk5IDYuMzRMMTIuMTIgMTVtLTMuNTgtM2wtMy45LTYuNzVBOS44NTUgOS44NTUgMCAwIDAgMiAxMmMwIC42OC4wNyAxLjM1LjIgMmg3LjQ5bTEyLjExLTRoLTcuNDlsLjI5LjUgNC43NiA4LjI1QTkuOTMgOS45MyAwIDAgMCAyMiAxMmMwLS42OS0uMDctMS4zNi0uMi0ybS0uMjYtMWMtLjkyLTIuOTMtMy4xNS01LjI2LTUuOTktNi4zNEwxMS44OCA5TTkuNCAxMC41bDQuNzctOC4yNkMxMy40NyAyLjA5IDEyLjc1IDIgMTIgMmMtMi40IDAtNC42Ljg0LTYuMzIgMi4yNWwzLjY2IDYuMzUuMDYtLjF6Ii8+Cjwvc3ZnPgo=');
		--StreamerModeSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE3IDEwLjVWN2ExIDEgMCAwIDAtMS0xSDRhMSAxIDAgMCAwLTEgMXYxMGExIDEgMCAwIDAgMSAxaDEyYTEgMSAwIDAgMCAxLTF2LTMuNWw0IDR2LTExbC00IDR6Ii8+Cjwvc3ZnPg==');
		--LanguageSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE2LjM2IDE0Yy4wOC0uNjYuMTQtMS4zMi4xNC0yIDAtLjY4LS4wNi0xLjM0LS4xNC0yaDMuMzhjLjE2LjY0LjI2IDEuMzEuMjYgMnMtLjEgMS4zNi0uMjYgMm0tNS4xNSA1LjU2Yy42LTEuMTEgMS4wNi0yLjMxIDEuMzgtMy41NmgyLjk1YTguMDMgOC4wMyAwIDAgMS00LjMzIDMuNTZNMTQuMzQgMTRIOS42NmMtLjEtLjY2LS4xNi0xLjMyLS4xNi0yIDAtLjY4LjA2LTEuMzUuMTYtMmg0LjY4Yy4wOS42NS4xNiAxLjMyLjE2IDIgMCAuNjgtLjA3IDEuMzQtLjE2IDJNMTIgMTkuOTZjLS44My0xLjItMS41LTIuNTMtMS45MS0zLjk2aDMuODJjLS40MSAxLjQzLTEuMDggMi43Ni0xLjkxIDMuOTZNOCA4SDUuMDhBNy45MjMgNy45MjMgMCAwIDEgOS40IDQuNDRDOC44IDUuNTUgOC4zNSA2Ljc1IDggOG0tMi45MiA4SDhjLjM1IDEuMjUuOCAyLjQ1IDEuNCAzLjU2QTguMDA4IDguMDA4IDAgMCAxIDUuMDggMTZtLS44Mi0yQzQuMSAxMy4zNiA0IDEyLjY5IDQgMTJzLjEtMS4zNi4yNi0yaDMuMzhjLS4wOC42Ni0uMTQgMS4zMi0uMTQgMiAwIC42OC4wNiAxLjM0LjE0IDJNMTIgNC4wM2MuODMgMS4yIDEuNSAyLjU0IDEuOTEgMy45N2gtMy44MmMuNDEtMS40MyAxLjA4LTIuNzcgMS45MS0zLjk3TTE4LjkyIDhoLTIuOTVhMTUuNjUgMTUuNjUgMCAwIDAtMS4zOC0zLjU2YzEuODQuNjMgMy4zNyAxLjkgNC4zMyAzLjU2TTEyIDJDNi40NyAyIDIgNi41IDIgMTJhMTAgMTAgMCAwIDAgMTAgMTAgMTAgMTAgMCAwIDAgMTAtMTBBMTAgMTAgMCAwIDAgMTIgMnoiLz4KPC9zdmc+Cg==');
		--WindowsSettingsSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIxIDE2SDNWNGgxOG0wLTJIM2MtMS4xMSAwLTIgLjg5LTIgMnYxMmEyIDIgMCAwIDAgMiAyaDd2Mkg4djJoOHYtMmgtMnYtMmg3YTIgMiAwIDAgMCAyLTJWNGEyIDIgMCAwIDAtMi0yeiIvPgo8L3N2Zz4K');
		--LinuxSettingsSVG: var(--WindowsSettingsSVG);
		--ChangeLogSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEzIDNhOSA5IDAgMCAwLTkgOUgxbDMuODkgMy44OS4wNy4xNEw5IDEySDZhNyA3IDAgMCAxIDctNyA3IDcgMCAwIDEgNyA3IDcgNyAwIDAgMS03IDdjLTEuOTMgMC0zLjY4LS43OS00Ljk0LTIuMDZsLTEuNDIgMS40MkE4Ljg5NiA4Ljg5NiAwIDAgMCAxMyAyMWE5IDkgMCAwIDAgOS05IDkgOSAwIDAgMC05LTltLTEgNXY1bDQuMjggMi41NC43Mi0xLjIxLTMuNS0yLjA4VjhIMTJ6Ii8+Cjwvc3ZnPgo=');
		--BDCoreSVG: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CiAgPGc+CiAgICA8cGF0aCBkPSJNMTQwMi4yIDYzMS43Yy05LjctMzUzLjQtMjg2LjItNDk2LTY0Mi42LTQ5Nkg2OC40djcxNC4xbDQ0MiAzOThWNDkwLjdoMjU3YzI3NC41IDAgMjc0LjUgMzQ0LjkgMCAzNDQuOUg1OTcuNnYzMjkuNWgxNjkuOGMyNzQuNSAwIDI3NC41IDM0NC44IDAgMzQ0LjhoLTY5OXYzNTQuOWg2OTEuMmMzNTYuMyAwIDYzMi44LTE0Mi42IDY0Mi42LTQ5NiAwLTE2Mi42LTQ0LjUtMjg0LjEtMTIyLjktMzY4LjYgNzguNC04NC40IDEyMi45LTIwNS45IDEyMi45LTM2OC41eiIvPgogICAgPHBhdGggZD0iTTEyNjIuNSAxMzUuMmgtNzYuOGMyNi42IDEzLjMgNTEuNyAyOC4xIDc1IDQ0LjMgNzAuNyA0OS4xIDEyNi4xIDExMS41IDE2NC42IDE4NS4zIDM5LjkgNzYuNiA2MS41IDE2NS42IDY0LjMgMjY0LjZWMTM3MS4zYy0yLjcgOTktMjQuMyAxODgtNjQuMyAyNjQuNi0zOC41IDczLjgtOTMuOCAxMzYuMi0xNjQuNiAxODUuMy0yMi42IDE1LjctNDYuOSAzMC4xLTcyLjYgNDMuMWg3Mi41YzM0Ni4yIDEuOSA2NzEtMTcxLjIgNjcxLTU2Ny45VjcxNi43YzEuOS00MDQuNS0zMjIuOS01ODEuNS02NjkuMS01ODEuNXoiLz4KICA8L2c+Cjwvc3ZnPgo=');
		--BDZeresForkSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0xNy43MyAxMi4wMmwzLjk4LTMuOThhLjk5Ni45OTYgMCAwIDAgMC0xLjQxbC00LjM0LTQuMzRhLjk5Ni45OTYgMCAwIDAtMS40MSAwbC0zLjk4IDMuOThMOCAyLjI5YTEuMDAxIDEuMDAxIDAgMCAwLTEuNDEgMEwyLjI1IDYuNjNhLjk5Ni45OTYgMCAwIDAgMCAxLjQxbDMuOTggMy45OEwyLjI1IDE2YS45OTYuOTk2IDAgMCAwIDAgMS40MWw0LjM0IDQuMzRjLjM5LjM5IDEuMDIuMzkgMS40MSAwbDMuOTgtMy45OCAzLjk4IDMuOThjLjIuMi40NS4yOS43MS4yOS4yNiAwIC41MS0uMS43MS0uMjlsNC4zNC00LjM0YS45OTYuOTk2IDAgMCAwIDAtMS40MWwtMy45OS0zLjk4ek0xMiA5Yy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxLTEtLjQ1LTEtMSAuNDUtMSAxLTF6bS00LjcxIDEuOTZMMy42NiA3LjM0bDMuNjMtMy42MyAzLjYyIDMuNjItMy42MiAzLjYzek0xMCAxM2MtLjU1IDAtMS0uNDUtMS0xcy40NS0xIDEtMSAxIC40NSAxIDEtLjQ1IDEtMSAxem0yIDJjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTEgMSAuNDUgMSAxLS40NSAxLTEgMXptMi00Yy41NSAwIDEgLjQ1IDEgMXMtLjQ1IDEtMSAxLTEtLjQ1LTEtMSAuNDUtMSAxLTF6bTIuNjYgOS4zNGwtMy42My0zLjYyIDMuNjMtMy42MyAzLjYyIDMuNjItMy42MiAzLjYzeiIvPgo8L3N2Zz4K');
		--BDEmotesSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTEyIDE3LjVjMi4zMyAwIDQuMy0xLjQ2IDUuMTEtMy41SDYuODljLjggMi4wNCAyLjc4IDMuNSA1LjExIDMuNU04LjUgMTFBMS41IDEuNSAwIDAgMCAxMCA5LjUgMS41IDEuNSAwIDAgMCA4LjUgOCAxLjUgMS41IDAgMCAwIDcgOS41IDEuNSAxLjUgMCAwIDAgOC41IDExbTcgMEExLjUgMS41IDAgMCAwIDE3IDkuNSAxLjUgMS41IDAgMCAwIDE1LjUgOCAxLjUgMS41IDAgMCAwIDE0IDkuNWExLjUgMS41IDAgMCAwIDEuNSAxLjVNMTIgMjBhOCA4IDAgMCAxLTgtOCA4IDggMCAwIDEgOC04IDggOCAwIDAgMSA4IDggOCA4IDAgMCAxLTggOG0wLTE4QzYuNDcgMiAyIDYuNSAyIDEyYTEwIDEwIDAgMCAwIDEwIDEwIDEwIDEwIDAgMCAwIDEwLTEwQTEwIDEwIDAgMCAwIDEyIDJ6Ii8+Cjwvc3ZnPgo=');
		--BDCustomCSSSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE0LjYgMTYuNmw0LjYtNC42LTQuNi00LjZMMTYgNmw2IDYtNiA2LTEuNC0xLjRtLTUuMiAwTDQuOCAxMmw0LjYtNC42TDggNmwtNiA2IDYgNiAxLjQtMS40eiIvPgo8L3N2Zz4K');
		--BDPluginsSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIwLjUgMTFIMTlWN2EyIDIgMCAwIDAtMi0yaC00VjMuNUEyLjUgMi41IDAgMCAwIDEwLjUgMSAyLjUgMi41IDAgMCAwIDggMy41VjVINGEyIDIgMCAwIDAtMiAydjMuOGgxLjVjMS41IDAgMi43IDEuMiAyLjcgMi43IDAgMS41LTEuMiAyLjctMi43IDIuN0gyVjIwYTIgMiAwIDAgMCAyIDJoMy44di0xLjVjMC0xLjUgMS4yLTIuNyAyLjctMi43IDEuNSAwIDIuNyAxLjIgMi43IDIuN1YyMkgxN2EyIDIgMCAwIDAgMi0ydi00aDEuNWEyLjUgMi41IDAgMCAwIDIuNS0yLjUgMi41IDIuNSAwIDAgMC0yLjUtMi41eiIvPgo8L3N2Zz4K');
		--BDThemesSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE3LjUgMTJhMS41IDEuNSAwIDAgMS0xLjUtMS41QTEuNSAxLjUgMCAwIDEgMTcuNSA5YTEuNSAxLjUgMCAwIDEgMS41IDEuNSAxLjUgMS41IDAgMCAxLTEuNSAxLjVtLTMtNEExLjUgMS41IDAgMCAxIDEzIDYuNSAxLjUgMS41IDAgMCAxIDE0LjUgNSAxLjUgMS41IDAgMCAxIDE2IDYuNSAxLjUgMS41IDAgMCAxIDE0LjUgOG0tNSAwQTEuNSAxLjUgMCAwIDEgOCA2LjUgMS41IDEuNSAwIDAgMSA5LjUgNSAxLjUgMS41IDAgMCAxIDExIDYuNSAxLjUgMS41IDAgMCAxIDkuNSA4bS0zIDRBMS41IDEuNSAwIDAgMSA1IDEwLjUgMS41IDEuNSAwIDAgMSA2LjUgOSAxLjUgMS41IDAgMCAxIDggMTAuNSAxLjUgMS41IDAgMCAxIDYuNSAxMk0xMiAzYTkgOSAwIDAgMC05IDkgOSA5IDAgMCAwIDkgOSAxLjUgMS41IDAgMCAwIDEuNS0xLjVjMC0uMzktLjE1LS43NC0uMzktMS0uMjMtLjI3LS4zOC0uNjItLjM4LTFhMS41IDEuNSAwIDAgMSAxLjUtMS41SDE2YTUgNSAwIDAgMCA1LTVjMC00LjQyLTQuMDMtOC05LTh6Ii8+Cjwvc3ZnPgo=');
		--LogOutSVG: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTE5IDNINWMtMS4xMSAwLTIgLjg5LTIgMnY0aDJWNWgxNHYxNEg1di00SDN2NGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNWEyIDIgMCAwIDAtMi0ybS04LjkyIDEyLjU4TDExLjUgMTdsNS01LTUtNS0xLjQyIDEuNDFMMTIuNjcgMTFIM3YyaDkuNjdsLTIuNTkgMi41OHoiLz4KPC9zdmc+Cg==');
	}`;

	return styles;
}
