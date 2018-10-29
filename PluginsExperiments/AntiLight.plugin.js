//META{"name":"AntiLight","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/AntiLight.plugin.js","website":"https://git.io/vhWjm"}*//

class AntiLight {

	getName () {return "AntiLight";}

	getDescription () {return "A crappy little plugin for removing the light theme.";}

	getVersion () {return "Alpha";}

	getAuthor () {return "CompletelyUnbelievable";}

	observer () {
		AppCheck();
	}

	stop () {
		if (document.getElementById(this.getName() + 'CSS')) {
			BdApi.clearCSS(this.getName() + 'CSS');
		}
		StopCheck();
	}

	start () {
		if (!document.getElementById(this.getName() + 'CSS')) {
			BdApi.injectCSS(this.getName() + 'CSS', setStyles());
		}
		AppCheck();
	}
}

function AppCheck() {
	if (BdApi.findModuleByProps("theme").theme == "light") {
		CheckElements('app');
		CheckElements('popouts-3dRSmE');
		CheckElements('contextMenu-HLZMGh');
		CheckElements('theme-light');
	}
}

function StopCheck() {
	if (BdApi.findModuleByProps("theme").theme == "light") {
		RecreateClasses('app');
		RecreateClasses('popouts-3dRSmE');
		RecreateClasses('contextMenu-HLZMGh');
		RecreateClasses('theme-light');
	}
}

function CheckElements (x) {
	if (document.getElementsByClassName(x)[0]) {
		RemoveLight(x);
	}
}

function RemoveLight(x) {
	if (document.getElementsByClassName(x)[0]) {
		for (i = 0; i < document.getElementsByClassName(x).length; i++) {
			let element;
			if (document.getElementsByClassName(x)[i].classList.contains('theme-light')) {
				element = document.getElementsByClassName(x)[i];
				element.classList.remove('theme-light');
				element.classList.add('theme-dark');
			}

			if (document.getElementsByClassName(x)[i].classList.contains('da-themeLight')) {
				element = document.getElementsByClassName(x)[i];
				element.classList.remove('da-themeLight');
				element.classList.add('da-themeDark');
			}
		}
	}
}

function RecreateClasses(x) {
	if (document.getElementsByClassName(x)[0]) {
		for (i = 0; i < document.getElementsByClassName(x).length; i++) {
			let element;
			if (document.getElementsByClassName(x)[i].classList.contains('theme-dark')) {
				element = document.getElementsByClassName(x)[i];
				element.classList.add('theme-light');
				element.classList.remove('theme-dark');
			}

			if (document.getElementsByClassName(x)[i].classList.contains('da-themeDark')) {
				element = document.getElementsByClassName(x)[i];
				element.classList.add('da-themeLight');
				element.classList.remove('da-themeDark');
			}
		}
	}
}

function setStyles() {
	let styles = `#app-mount .closeButton-1tv5uR svg path.fill {
		fill: rgb(220, 221, 222);
	}
	
	#app-mount .connectedAccountName-f8AEe2 {
		color: #b9bbbe;
	}
	
	#app-mount .topSectionNormal-2-vo2m .username-3gJmXY {
		color: #fff;
	}
	
	#app-mount .topSectionNormal-2-vo2m .profileBadgeText-1JgCcU, #app-mount .topSectionNormal-2-vo2m .tab-bar.tabBar-2MuP6- .tabBarItem-1b8RUP {
		color: hsla(0,0%,100%,.6)
	}
	
	#app-mount .topSectionNormal-2-vo2m .tab-bar.tabBar-2MuP6- .tabBarItem-1b8RUP.selected {
		border-bottom: 2px solid #3a71c1;
		color: #3a71c1;
	}
	
	#app-mount .video-1FfuMD.minimum-1pRSEN {
		background-color: initial;
	}
	
	#app-mount .headerNormal-T_seeN .headerName-fajvi9, #app-mount .headerNormal-T_seeN .headerTagUsernameNoNickname-2_H881 {
		color: #fff;
	}
	
	#app-mount .userPopout-3XzG_A {
		-webkit-box-shadow: 0 2px 10px 0 rgba(0,0,0,.2), 0 0 0 1px rgba(32,34,37,.6);
		border-radius: 5px;
		box-shadow: 0 2px 10px 0 rgba(0,0,0,.2), 0 0 0 1px rgba(32,34,37,.6);
		overflow: hidden;
		width: 250px;
	}
	
	#app-mount .autocompleteInner-zh20B_ {
		background-color: initial;
	}
	
	#app-mount .option-96V44q.selected-rZcOL-:after {
		background: none;
	}
	
	#app-mount .option-96V44q:after {
		background: none;
	}
	
	/*Elements that require importance to work, SVG styles, and maybe pseudo elements. Ya know, the disgusting and sloppy selectors and stuff.*/
	
	.videoHeight-Qp_9vC [style*=\"e58c46a89a6d0e207363ed2c26fef144\"] {
		background-image: url(https://discordapp.com/assets/d47d2c5ce2dd7d5bdaee2ebd8fde61f2.svg) !important;
	}
	
	.videoHeight-Qp_9vC [style*=\"39aa9582008741a5582b87b2336f746d\"] {
		background-image: url(https://discordapp.com/assets/4bc527c257233fc69b94342d77bcb9ee.svg) !important;
	}
	
	.videoHeight-Qp_9vC [style*=\"7a2984b632f742b95882d387736c7bd0\"] {
		background-image: url(https://discordapp.com/assets/990826f372c3d1d1792e3f1df06609bb.svg) !important;
	}
	
	.videoHeight-Qp_9vC [style*=\"da80b49568f5b282cd97f54f2f813441\"] {
		background-image: url(https://discordapp.com/assets/ea5bf2e8b48cfe21ea60588e1568aad6.svg) !important;
	}
	
	.videoHeight-Qp_9vC [style*=\"3a773ef164b13d6a5bf37083bc1bc7f6\"] {
		background-image: url(https://discordapp.com/assets/b0aeca4d2129dcbf73f05feb6bb6e61f.svg) !important;
	}
	
	#app-mount .embedAuthorName-3mnTWj, #app-mount .embedFieldName-NFrena {
		color: #fff !important; /*required due to use of important by discord themselves.*/
	}
	
	#app-mount .wrapper-39oAo3 {
		background-image: url(\"https://discordapp.com/assets/e78d08ee484c06a9eed33e095ecfedc0.png\"),url(\"https://discordapp.com/assets/c379ee3964cb272ae18fd593ed273269.png\");
		color: hsla(0,0%,100%,.3);
	}
	
	#app-mount div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyCenter-3D2jYp.alignCenter-1dQNNs.noWrap-3jynv6.icons-wrapper.center [style*=\"39aa9582008741a5582b87b2336f746d\"] {
		background-image: url(\"https://discordapp.com/assets/4bc527c257233fc69b94342d77bcb9ee.svg\") !important; /*Required*/
	}
	
	#app-mount div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyCenter-3D2jYp.alignCenter-1dQNNs.noWrap-3jynv6.icons-wrapper.center [style*=\"7a2984b632f742b95882d387736c7bd0\"] {
		background-image: url(\"https://discordapp.com/assets/990826f372c3d1d1792e3f1df06609bb.svg\") !important; /*Required*/
	}
	
	#app-mount div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyCenter-3D2jYp.alignCenter-1dQNNs.noWrap-3jynv6.icons-wrapper.center [style*=\"da80b49568f5b282cd97f54f2f813441\"] {
		background-image: url(\"https://discordapp.com/assets/ea5bf2e8b48cfe21ea60588e1568aad6.svg\") !important; /*Required*/
	}
	
	#app-mount div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyCenter-3D2jYp.alignCenter-1dQNNs.noWrap-3jynv6.icons-wrapper.center [style*=\"3a773ef164b13d6a5bf37083bc1bc7f6\"] {
		background-image: url(\"https://discordapp.com/assets/b0aeca4d2129dcbf73f05feb6bb6e61f.svg\") !important; /*Required*/
	}
	
	#app-mount div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyCenter-3D2jYp.alignCenter-1dQNNs.noWrap-3jynv6.icons-wrapper.center [style*=\"e58c46a89a6d0e207363ed2c26fef144\"] {
		background-image: url(\"https://discordapp.com/assets/d47d2c5ce2dd7d5bdaee2ebd8fde61f2.svg\") !important; /*Required*/
	}
	
	#app-mount #app-mount textarea::-webkit-input-placeholder {
		color: darkgrey;
	}
	
	#app-mount > div.layers-3iHuyZ.flex-vertical.flex-spacer > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div.content-column.default > div > div > div:nth-child(3) > div > div.image-1GzsFd.margin-bottom-40 {
		background-image: url(\"https://discordapp.com/assets/e9aaf1824f17126a7992e5ad98752389.svg\") !important; /*required*/
	}
	
	#app-mount textarea::-webkit-input-placeholder {
		color: hsla(0,0%,100%,.1);
	}
	
	#app-mount .icon-RTGJu3.targetGuild-mDWfAV {
		background: url(\"https://discordapp.com/assets/30af96a386520760ad107c5b77ba002a.svg\");
	}
	
	#app-mount .icon-RTGJu3.targetMember-2iuwxX {
		background: url(\"https://discordapp.com/assets/af043346e036ef7b1aac1cf42cd1e699.svg\");
	}
	
	#app-mount .icon-RTGJu3.targetInvite-1RQBlr {
		background: url(\"https://discordapp.com/assets/4b33371531a1a89f99296a73fc9ef588.svg\");
	}
	
	#app-mount .icon-RTGJu3.targetWebhook-1xS7Z7 {
		background: url(\"https://discordapp.com/assets/a6975850d800aa86162b4aa5f18c41ac.svg\");
	}
	
	#app-mount .icon-RTGJu3.targetEmoji-3vhPhM {
		background: url(\"https://discordapp.com/assets/7a9bf92329dad473ef0383ae75367215.svg\");
	}
	
	#app-mount .icon-RTGJu3.targetMessage-2kBYMT {
		background: url(\"https://discordapp.com/assets/8c85e30795486caa8caacd829703459d.svg\");
	}
	
	#app-mount .quickSelectArrow-1QublR {
		background: url(\"https://discordapp.com/assets/f58cf3b8fc79e9d671ab649ab37651a9.svg\") 50% no-repeat;
	}
	
	#app-mount .icon-RTGJu3.targetRole-2MoUny {
		background: url(\"https://discordapp.com/assets/0176a91b4c44ed05c05af68784e78da8.svg\");
	}
	
	#app-mount .icon-RTGJu3.targetChannel-TrRFlx {
		background: url(\"https://discordapp.com/assets/343c9ff4c775c66a7d4af1f8691c34e0.svg\");
	}
	
	#app-mount .searchBarIcon-18QaPq .icon-1S6UIr.eyeGlass-2cMHx7 {
		background-image: url(\"https://discordapp.com/assets/4d254296157bb8927b7d53ed59beb0d8.svg\");
	}
	
	#app-mount .searchBarIcon-18QaPq .icon-1S6UIr.clear--Eywng {
		background-image: url(\"https://discordapp.com/assets/368c9f2ca04e43b5a5ce7380d4622149.svg\");
	}
	
	#app-mount > div.layers-3iHuyZ.flex-vertical.flex-spacer > div > div > div.flex-1xMQg5.flex-1O1GKY.vertical-V37hAW.flex-1O1GKY.directionColumn-35P_nr.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.base-3dtUhz > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.spacer-29U_x8 > div.noChannel-Z1DQK7 > div > div.image-1GzsFd.margin-bottom-40 {
		flex: 0 1 auto;
		width: 272px;
		height: 222px;
		background-image: url(\"https://discordapp.com/assets/94b5558353f1d01035a874f6eddf6d70.svg\");
	}
	
	#app-mount > div.layers-3iHuyZ.flex-vertical.flex-spacer > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div.content-column.default > div > div > div:nth-child(7) > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6 > div:nth-child(2) > div > div.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6.previewOverlay-2O7_KC > div > img {
		content: url(\"https://discordapp.com/assets/aba3ec7874f7f01fe9a8275a3e5c21a0.svg\");
	}
	
	div#app-mount.popouts-3dRSmE > div > div > div.scroller-wrap > div > div > div.image-2JDb81 {
		background-image: url(\"https://discordapp.com/assets/6793e022dc1b065b21f12d6df02f91bd.svg\") !important; /*required*/
	}
	
	#app-mount > div.layers-3iHuyZ.flex-vertical.flex-spacer > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div.content-column.default > div > div > div.formNotice-2_hHWR.margin-bottom-40.cardPrimary-1Hv-to.card-3Qj_Yx > div > img {
		content: url(\"https://discordapp.com/assets/e8b66317ab0dc9ba3bf8d41a4f3ec914.png\");
	}
	
	#app-mount .notificationsSoundIcon-3PkO7b:before {
		background-image: url(\"https://discordapp.com/assets/f9b93aa0d9985bd2b678da58ed0d75d2.svg\");
	}
	
	#app-mount .btn-reaction {
		background-image: url(\"https://discordapp.com/assets/24e5837679a970699e904d047c741540.svg\");
	}
	
	#app-mount .topSectionNormal-2-vo2m .additionalActionsIcon-1FoUlE {
		background: url(\"https://discordapp.com/assets/c75b049cb25ec007efd22d608a0c9c0a.svg\") no-repeat 50%;
		cursor: pointer;
		height: 24px;
		margin-left: 8px;
		width: 24px;
	}
	
	#app-mount .itemSubMenu-1vN_Yn {
		background: #282b30 url(\"https://discordapp.com/assets/1988164a7c55346d32117b151f4e319d.svg\") no-repeat 155px 50%;
	}
	
	#app-mount .itemSubMenu-1vN_Yn:hover {
		background: #25282d url(\"https://discordapp.com/assets/e4afe52f6863408a35654a6e5fd69ba9.svg\") no-repeat 155px 50%;
	}
	
	#app-mount svg.connectedAccountVerifiedIcon-3aZz_K g path:nth-child(3) {
		fill: rgb(255, 255, 255);
	}
	
	#app-mount svg.connectedAccountVerifiedIcon-3aZz_K g path:nth-child(2) {
		fill: rgb(79, 84, 92);
	}
	
	#app-mount svg.connectedAccountVerifiedIcon-3aZz_K g path:first-child {
		fill: transparent;
	}
	
	#app-mount .resultsGroup-r_nuzN .searchClearHistory-2cSSMO {
		background: url(\"https://discordapp.com/assets/8be8e7c66c7035a51f294dee367aea0a.svg\") no-repeat 50% 50%;
	}
	
	#app-mount .resultsGroup-r_nuzN .searchLearnMore-3SQUAj {
		background: url(\"https://discordapp.com/assets/9d54895f1d48ef22ffcb1dae14e76bdf.svg\") no-repeat 50% 50%;
	}
	
	#app-mount .editIcon-13gaox {
		background-image: url(\"https://discordapp.com/assets/860396b3ff3fa1c4ae355bebfabadecb.svg\");
	}
	
	#app-mount .premium-settings .premium-settings-background {
		background-image: url(\"https://discordapp.com/assets/00be7f6ca68f1915a80ae01f061718e5.svg\");
	}
	
	#app-mount .search .search-bar .search-bar-icon .icon.icon-search-bar-clear {
		background-image: url(\"https://discordapp.com/assets/368c9f2ca04e43b5a5ce7380d4622149.svg\");
	}
	
	#app-mount .search .search-bar .search-bar-icon .icon.icon-search-bar-eye-glass {
		background-image: url(\"https://discordapp.com/assets/4d254296157bb8927b7d53ed59beb0d8.svg\");
	}
	
	#app-mount .userSettingsSecurityImage-21pI_Q {
		content:url(\"https://discordapp.com/assets/cdea41ede63f61153e4a3c0531fa3873.svg\");
	}
	
	#app-mount .tools > div.btn-close > svg > g > path.fill {
		fill: rgb(220, 221, 222);
	}
	
	#app-mount .btn-option {
		background-image: url(\"https://discordapp.com/assets/d260979c53d0cb8e8a1f6e88e34f0056.svg\");
	}
	
	#app-mount .avatarIcon-2JClYK {
		background-image: url(\"https://discordapp.com/assets/8c35f8c63f67b4217051ec65c92f7503.svg\");
	}
	
	#app-mount .screenshareIcon-1f7hZo {
		background-image: url(\"https://discordapp.com/assets/1c2a4867bd79715207e3cc3af0d3f476.svg\");
	}
	
	#app-mount .emojiIcon-3l-mcX {
		background-image: url(\"https://discordapp.com/assets/222e7361d9f298ecb525cb9d9d9d7312.svg\");
	}
	
	#app-mount .animatedEmojiIcon-2N_0wo {
		background-image: url(\"https://discordapp.com/assets/0f76453bc5c4ffa345a4bef1f9de0020.svg\");
	}
	
	#app-mount .uploadIcon-eaSJqc {
		background-image: url(\"https://discordapp.com/assets/3812cc319f8afb89d82187aa07f65e8f.svg\");
	}
	
	#app-mount .badgeIcon-2AtXVa {
		background-image: url(\"https://discordapp.com/assets/07208d2e9e612bc93dcc54562311c9a4.svg\");
	}
	
	#app-mount > div.layers-3iHuyZ.flex-vertical.flex-spacer > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div.content-column.default > div > div > div.formNotice-2_hHWR.margin-bottom-40.cardPrimary-1Hv-to.card-3Qj_Yx > div > img {
		content: url(\"https://discordapp.com/assets/e36c44f9a7dc47665d98d2f2736ee218.svg\");
	}
	
	#app-mount .emptyIconFriends-BrjhY9 {
		background-image: url(\"https://discordapp.com/assets/ca3f5ec71bb86c6aeb015bb0d54a10fa.svg\");
	}
	
	#app-mount .scroller-wrap .scroller::-webkit-scrollbar-thumb {
		background-color: rgba(0,0,0,.4);
		border-color: transparent;
	}
	
	#app-mount .scroller-wrap .scroller::-webkit-scrollbar-track-piece {
		background-color: transparent;
		border-color: transparent;
	}
	
	#app-mount .image-1GzsFd.margin-bottom-40.da-image[style*=\"e3fb8fe698a871db1d0e34ededf8a954\"] {
		background-image: url(https://discordapp.com/assets/789de85a973b1d974a21aa03c1e14323.svg) !important; /*Required*/
	}
	
	#app-mount .image-1GzsFd.margin-bottom-40.da-image[style*=\"857c505aafbe092e4f6efecebcad0bc8\"] {
		background-image: url(https://discordapp.com/assets/712a0fd4d14a1caadd31cb0745e91238.svg) !important; /*Required*/
	}
	
	#app-mount .image-1GzsFd.margin-bottom-40.da-image[style*=\"fe5ef0f14b8d025d73465e2d76913e20\"] {
		background-image: url(https://discordapp.com/assets/59c726954bd8424f376ca3a7eedc4c54.svg) !important; /*Required*/
	}`;
	return styles;
}
