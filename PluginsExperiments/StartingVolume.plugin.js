//META{"name":"StartingVolume","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/StartingVolume.plugin.js","website":"https://git.io/vhWjm"}*//

class StartingVolume {

	getName() {return "StartingVolume";}

	getDescription() {return "Sets the volume on the default discord video and audio embeds. Does not visually update properly.";}

	getVersion() {return "1.5";}

	getAuthor() {return "CompletelyUnbelievable";}
	
	constructor() {
		this.topElement = document;
		this.mediaEvents = ['video.video-8eMOth', 'audio.audio-2-PNle'];
		this.class = 'SVAudioFixed'; //Identifing class.
		this.videoParent = '.embedVideo-3nf0O9';
		this.audioParent = '.wrapperAudio-1jDe0Q';
		this.debug = false; //Console logs the steps to make sure events are being triggered.
		this.handler; //The delegated event handler gets put here, makes it easier to remove.
	}

	get default() {
		return {
			volume: 10
		}
	}

	observer() {} //Don't want to use the observer at all.

	start() {
		self = this; //Set it and forget it. It will have issues accessing the constructor without it.
		let libraryScript = document.getElementById('zeresLibraryScript');
		if (typeof window.ZLibrary !== "undefined") self.initialize();
		else libraryScript.addEventListener('load', () => self.initialize());
	}

	initialize() {
		ZLibrary.PluginUpdater.checkForUpdate(self.getName(), self.getVersion(), "https://raw.githubusercontent.com/CompletelyUnbelievable/BDAddons/master/PluginsExperiments/StartingVolume.plugin.js");
		self.loadSettings();
		self.delegateMediaEvents(self.topElement, 'click', self.mediaEvents, 'play', self.check); //Add listener.
		console.log(`${self.getName()} v${self.getVersion()} has started.`);
	}

	stop() {
		self.removeDelegatedMediaEvents(self.topElement, 'click', self.mediaEvents, 'play', self.check);
	}

	load() {
		let libraryScript = document.getElementById('zeresLibraryScript');
		if (!libraryScript) {
			libraryScript = document.createElement('script');
			libraryScript.setAttribute('type', 'text/javascript');
			/*In part borrowed from Zere, so it redirects the user to download the Lib if it does not load correctly and the user does not have it.*/
			libraryScript.onload = function() {if(typeof ZLibrary === "undefined") {window.BdApi.alert("Library Missing",`The library plugin needed for ${self.getName()} is missing and could not be loaded.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);}};
			libraryScript.setAttribute('src', 'https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js');
			libraryScript.setAttribute('id', 'zeresLibraryScript');
			document.head.appendChild(libraryScript);
		}
	}

	saveSettings() {
        ZLibrary.PluginUtilities.saveSettings(self.getName(), self.settings);
    }

    loadSettings() {
        self.settings = ZLibrary.PluginUtilities.loadSettings(self.getName(), self.default);
    }

    getSettingsPanel() {
        let panel = $("<form>").addClass("form").css("width", "100%");
        self.generateSettings(panel);
        return panel[0];
	}
	
	generateSettings(panel) {
		new ZLibrary.Settings.SettingGroup('Options', {collapsible: true, shown: true}).appendTo(panel).append(
			new ZLibrary.Settings.Textbox('Set volume', 'Set a volume to use, use a percent without the symbol.', self.settings.volume, text => {
				let x = parseInt(text, 10); 
				if (x !== NaN && x >= 1 && x <= 100) {
					self.settings.volume = x;
					self.saveSettings();
				}else{
					self.regeneratePanel(panel);
				}
			}));
			const resetButton = $('<button>', {type: 'button', text: 'Reset Settings', style: 'margin: 10px 0; float: right;', class: 'button-38aScr lookOutlined-3sRXeN colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN'}).click(function() {
				if(self.debug)console.log('reset');
				self.settings = self.default;
				self.regeneratePanel(panel);
			});
			panel.append(resetButton);
	}

	regeneratePanel(panel) {
		if (panel !== undefined) {
			self.saveSettings();
			panel.empty();
			self.generateSettings(panel);
		}
	}

	delegateMediaEvents(topEle, topEvent, lowSelector, lowEvent, funct) { //Solution to .on not working with media events.
		if (document.contains(topEle) && typeof topEle === 'object') { //Check if topEle is an element.
			self.handler = function callback(){self.mainEvent(lowSelector, lowEvent, funct)};
			topEle.addEventListener(topEvent, self.handler); //Moved the actual function to mainEvent so that it can be removed with ease.
		}
	}

	removeDelegatedMediaEvents(topEle, topEvent, lowSelector, lowEvent, funct) {

		topEle.removeEventListener(topEvent, self.handler);
		if (Array.isArray(lowSelector) && typeof lowSelector === 'object' && typeof funct === 'function') { //Can send an array, why not. This should mean the top event will trigger both where plausable.
			for (let i of lowSelector) {for (let x of document.querySelectorAll(i)) {x.removeEventListener(lowEvent, funct);}}
		}else if (typeof lowSelector === 'string' && typeof funct === 'function') {
			for (let x of document.querySelectorAll(lowSelector)) {x.removeEventListener(lowEvent, funct);}
		}
	}

	mainEvent(lowSelector, lowEvent, funct) {
		if(self.debug)console.log('mainEvent');
		if (Array.isArray(lowSelector) && typeof lowSelector === 'object' && typeof funct === 'function') { //Can send an array, why not. This should mean the top event will trigger both where plausable.
			for (let i of lowSelector) {for (let x of document.querySelectorAll(i)) {x.addEventListener(lowEvent, funct);}}
		}else if (typeof lowSelector === 'string' && typeof funct === 'function') {
			for (let x of document.querySelectorAll(lowSelector)) {x.addEventListener(lowEvent, funct);}
		}
	}

	check(event) { //Changes volumes and adds classes.
		if(self.debug)console.log('check');
		let volumes = self.conversions(), element = event.target.closest(self.audioParent) || event.target.closest(self.videoParent) || event.target;
		//Above would throw an error if I used query selector on something that does not exist, even though it should perform falsy. This forces two step operations.
		element = element.querySelector('audio') || element.querySelector('video') || event.target;
		if (!element.classList.contains(self.class) && element.volume !== volumes.volumeD) {
			if(self.debug)console.log('click');
			element.classList.add(self.class);
			element.volume = volumes.volumeD;
		}
	}
	conversions() {
		if (self.settings !== undefined) { //Try to use settings first,
			return {
				volumeP: `${self.settings.volume}%`,
				volumeD: self.settings.volume / 100
			};
		}else if(self.settings === undefined && self.default !== undefined) { //then use defaults.
			return {
				volumeP: `${self.default.volume}%`,
				volumeD: self.default.volume / 100
			};
		}else{ //In the case everything goes wrong, redundant defaults.
			return {
				volumeP: '10%',
				volumeD: 0.1
			};
		}
	}
}
