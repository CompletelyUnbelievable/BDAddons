//META{"name":"StartingVolume","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/StartingVolume.plugin.js","website":"https://git.io/vhWjm"}*//

class StartingVolume {

	getName() {return "StartingVolume";}

	getDescription() {return "Sets the volume on the default discord video and audio embeds. Does not visually update properly.";}

	getVersion() {return "1.7";}

	getAuthor() {return "CompletelyUnbelievable";}
	
	constructor() {
		this.topElement = document;
		this.mediaEvents = ['video.video-8eMOth', 'audio.audio-2-PNle'];
		this.class = 'SVAudioFixed'; //Identifing class.
		this.videoParent = `.${BdApi.findModuleByProps('embedVideo').embedVideo.split(' ')[0]}` || `.embedVideo-3nf0O9`;
		this.audioParent = `.${BdApi.findModuleByProps('wrapperAudio').wrapperAudio.split(' ')[0]}` || `.wrapperAudio-1jDe0Q`;
		this.embedIframe = `iframe.${BdApi.findModuleByProps('embedIframe').embedIframe.split(' ')[0]}` || `iframe.embedIframe-2hcNY5`;
		this.debug = false; //Console logs the steps to make sure events are being triggered.
		this.debugSP = false; //Additional options that will be in testing phases for now, some might not do anything.
		this.handler; //The delegated event handlers gets put here, makes it easier to remove.
		this.iframeHandler;  //The delegated event handlers for iframes gets put here, makes it easier to remove.
	}

	get default() {
		if (!this.debugSP) {
			return {
				volume: 10
			}
		}else{
			return {
				native: true,
				volume: 10,
				soundcloud: false,
				soundcloudVolume: 10,
				youtube: false,
				youtubeVolume: 10,
				twitter: false,
				twitterVolume: 10,
			}
		}
	}

	observer() {} //Don't want to use the observer at all.

	start() {
		let libraryScript = document.getElementById('zeresLibraryScript');
		if (typeof window.ZLibrary !== "undefined") this.initialize();
		else libraryScript.addEventListener('load', () => this.initialize());
	}

	initialize() {
		ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/CompletelyUnbelievable/BDAddons/master/PluginsExperiments/StartingVolume.plugin.js");
		this.loadSettings();
		this.handler = this.delegateMediaEvents(this.topElement, 'click', this.mediaEvents, 'play', this.check); //Add listener.
		if(this.debugSP){this.iframeHandler = this.delegateMediaEvents(this.topElement, 'click', this.embedIframe, 'load', this.iframeHandling);}
		console.log(`${this.getName()} v${this.getVersion()} has (re)initialized.`);
	}

	stop() {
		this.removeDelegatedMediaEvents(this.topElement, 'click', this.mediaEvents, 'play', this.check, this.handler);
		if(this.debugSP){this.removeDelegatedMediaEvents(this.topElement, 'click', this.embedIframe, 'load', this.iframeHandling, this.iframeHandler);}
	}

	load() {
		let libraryScript = document.getElementById('zeresLibraryScript'), soundCloudAPI = document.getElementById('soundCloudAPI'), youtubeIframeAPI = document.getElementById('youtubeIframeAPI'), twitterWidgetAPI = document.getElementById('twitterWidgetAPI');
		if (!libraryScript) {
			libraryScript = document.createElement('script');
			libraryScript.setAttribute('type', 'text/javascript');
			/*In part borrowed from Zere, so it redirects the user to download the Lib if it does not load correctly and the user does not have it.*/
			libraryScript.onload = function() {if(typeof ZLibrary === "undefined") {window.BdApi.alert("Library Missing",`The library plugin needed for ${this.getName()} is missing and could not be loaded.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);}};
			libraryScript.setAttribute('src', 'https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js');
			libraryScript.setAttribute('id', 'zeresLibraryScript');
			document.head.appendChild(libraryScript);
		}

		if(!soundCloudAPI && this.debugSP)soundCloudAPI = this.createScriptElementAppend('text/javascript', 'soundCloudAPI', `https://w.soundcloud.com/player/api.js`);
		if(!youtubeIframeAPI && this.debugSP)youtubeIframeAPI = this.createScriptElementAppend('text/javascript', 'youtubeIframeAPI', `https://www.youtube.com/iframe_api`);
		if(!twitterWidgetAPI && this.debugSP)twitterWidgetAPI = this.createScriptElementAppend('text/javascript', 'twitterWidgetAPI', `https://platform.twitter.com/widgets.js`);
	}

	createScriptElementAppend(type, id, src) { //Very basic for now.
		let x = document.createElement('script');
		x.setAttribute('type', type);
		x.setAttribute('id', id);
		x.setAttribute('src', src);
		document.head.appendChild(x);
		return x;
	}

	saveSettings() {
        ZLibrary.PluginUtilities.saveSettings(this.getName(), this.settings);
	}

	loadSettings() {
        this.settings = ZLibrary.PluginUtilities.loadSettings(this.getName(), this.default);
	}

	getSettingsPanel() {
		let panel = $("<form>", {class: 'form', style: `width:100%;margin-left:auto;margin-right:auto;`});
		this.generateSettings(panel);
		return panel[0];
	}
	
	generateSettings(panel) {
		if (!this.debugSP) {
			new ZLibrary.Settings.SettingGroup('Options', {collapsible: true, shown: true}).appendTo(panel).append(
				new ZLibrary.Settings.Textbox('Set volume', 'Set a volume to use, use a percent without the symbol.', this.settings.volume, text => {
					let x = parseInt(text, 10); 
					if (x !== NaN && x >= 1 && x <= 100) {
						this.settings.volume = x;
						this.saveSettings();
					}else{
						this.regeneratePanel(panel);
					}
				}));
		}else{
			new ZLibrary.Settings.SettingGroup('Super Secret Debug Menu', {collapsible: true, shown: true}).appendTo(panel).append(
				new ZLibrary.Settings.Switch('Native Embeds', `When enabled, changes the volume pertaining to discord's native embeds.`, this.settings.native, boolean => {
					this.settings.native = boolean;
					this.saveSettings();
				}),
				new ZLibrary.Settings.Textbox('Native Embed Volume', `Set a volume to use for discord's native embeds, use a percent without the symbol.`, this.settings.volume, text => {
					let x = parseInt(text, 10); 
					if (x !== NaN && x >= 1 && x <= 100) {
						this.settings.volume = x;
						this.saveSettings();
					}else{
						this.regeneratePanel(panel);
					}
				}),
				new ZLibrary.Settings.Switch('SoundCloud Embeds', `When enabled, changes the volume pertaining to SoundCloud embeds.`, this.settings.soundcloud, boolean => {
					this.settings.soundcloud = boolean;
					this.saveSettings();
				}),
				new ZLibrary.Settings.Textbox('SoundCloud Embed Volume', `Set a volume to use for SoundCloud embeds, use a percent without the symbol.`, this.settings.soundcloudVolume, text => {
					let x = parseInt(text, 10); 
					if (x !== NaN && x >= 1 && x <= 100) {
						this.settings.soundcloudVolume = x;
						this.saveSettings();
					}else{
						this.regeneratePanel(panel);
					}
				}),
				new ZLibrary.Settings.Switch('YouTube Embeds', `When enabled, changes the volume pertaining to YouTube embeds.`, this.settings.youtube, boolean => {
					this.settings.youtube = boolean;
					this.saveSettings();
				}),
				new ZLibrary.Settings.Textbox('Youtube Embed Volume', `Set a volume to use for YouTube embeds, use a percent without the symbol.`, this.settings.youtubeVolume, text => {
					let x = parseInt(text, 10); 
					if (x !== NaN && x >= 1 && x <= 100) {
						this.settings.youtubeVolume = x;
						this.saveSettings();
					}else{
						this.regeneratePanel(panel);
					}
				}),
				new ZLibrary.Settings.Switch('Twitter Embeds', `When enabled, changes the volume pertaining to Twitter embeds.`, this.settings.twitter, boolean => {
					this.settings.twitter = boolean;
					this.saveSettings();
				}),
				new ZLibrary.Settings.Textbox('Twitter Embed Volume', `Set a volume to use for Twitter embeds, use a percent without the symbol.`, this.settings.twitterVolume, text => {
					let x = parseInt(text, 10); 
					if (x !== NaN && x >= 1 && x <= 100) {
						this.settings.twitterVolume = x;
						this.saveSettings();
					}else{
						this.regeneratePanel(panel);
					}
				}));
				panel.append($('<div>', {class: `protip-12obwm inline-136HKr`, style: `float:left;width:80%;margin:10px 0;`})
					.append($('<div>', {text: 'Protip: ', style: `text-transform:uppercase;`, class: `pro-1T8RK7 small-29zrCQ size12-3R0845 height16-2Lv3qA statusGreen-pvYWjA weightBold-2yjlgw`})
						.append($('<div>', {text: 'IFrames are incredibly difficult to interact with, so do not expect me to actually be able to change volumes on YouTube/Twitter embeds.', style: `text-transform:none;`,class: `tip-2ab612 primary-jw0I4K`}))
					)
				);
		}
		const resetButton = $('<button>', {type: 'button', text: 'Reset Settings', style: 'margin:10px 0;float:right;', class: 'button-38aScr lookOutlined-3sRXeN colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN'})
		.click(function() {
			if(this.debug)console.log('reset');
				this.settings = this.default;
				this.regeneratePanel(panel);
		}.bind(this));
		panel.append(resetButton);
	}

	regeneratePanel(panel) {
		if (panel !== undefined) {
			this.saveSettings();
			panel.empty();
			this.generateSettings(panel);
		}
	}

	delegateMediaEvents(topEle, topEvent, lowSelector, lowEvent, funct) { //Solution to .on not working with media events.
		if (document.contains(topEle) && typeof topEle === 'object') { //Check if topEle is an element.
			let handler = () => {this.mainEvent(lowSelector, lowEvent, funct)};
			topEle.addEventListener(topEvent, handler); //Moved the actual function to mainEvent so that it can be removed with ease.
			return handler;
		}
	}

	removeDelegatedMediaEvents(topEle, topEvent, lowSelector, lowEvent, funct, handler) {
		topEle.removeEventListener(topEvent, handler);
		if (Array.isArray(lowSelector) && typeof lowSelector === 'object' && typeof funct === 'function') { //Can send an array, why not. This should mean the top event will trigger both where plausable.
			for (let i of lowSelector) {for (let x of document.querySelectorAll(i)) {x.removeEventListener(lowEvent, funct.bind(this));}}
		}else if (typeof lowSelector === 'string' && typeof funct === 'function') {
			for (let x of document.querySelectorAll(lowSelector)) {x.removeEventListener(lowEvent, funct.bind(this));}
		}
	}

	mainEvent(lowSelector, lowEvent, funct) {
		if(this.debug)console.log('mainEvent');
		if (Array.isArray(lowSelector) && typeof lowSelector === 'object' && typeof funct === 'function') { //Can send an array, why not. This should mean the top event will trigger both where plausable.
			for (let i of lowSelector) {for (let x of document.querySelectorAll(i)) {x.addEventListener(lowEvent, funct.bind(this));}}
		}else if (typeof lowSelector === 'string' && typeof funct === 'function') {
			for (let x of document.querySelectorAll(lowSelector)) {x.addEventListener(lowEvent, funct.bind(this));}
		}
	}

	check(event) { //Changes volumes and adds classes.
		let volumes = this.conversions(), element = event.target.closest(this.audioParent) || event.target.closest(this.videoParent) || event.target;
		//Above would throw an error if I used query selector on something that does not exist, even though it should perform falsy. This forces two step operations.
		element = element.querySelector('audio') || element.querySelector('video') || event.target;
		if(this.debug)console.log('check');
		if (!element.classList.contains(this.class) && element.volume !== volumes.volumeD) {
			if(this.debug)console.log('click');
			element.classList.add(this.class);
			element.volume = volumes.volumeD;
		}
	}

	iframeHandling(event) {
		let element = event.target;
		if(this.debug)console.log('iframeHandler');
		if(this.settings.soundcloud&&element.src.includes('soundcloud')&&!element.classList.contains(this.class)){
			(SC.Widget(element)).setVolume(this.settings.soundcloudVolume);
			if(this.debug)console.log('load');
			element.classList.add(this.class);
		}
	}

	conversions() {
		if (this.settings !== undefined) { //Try to use settings first,
			return {
				volumeP: `${this.settings.volume}%`,
				volumeD: this.settings.volume / 100
			};
		}else if(this.settings === undefined && this.default !== undefined) { //then use defaults.
			return {
				volumeP: `${this.default.volume}%`,
				volumeD: this.default.volume / 100
			};
		}else{ //In the case everything goes wrong, redundant defaults.
			return {
				volumeP: '10%',
				volumeD: 0.1
			};
		}
	}
}
