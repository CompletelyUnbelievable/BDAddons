//META{"name":"StartingVolume","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/StartingVolume.plugin.js","website":"https://git.io/vhWjm"}*//

class StartingVolume {

	getName(){return "StartingVolume";}

	getDescription(){return "Sets the volume on certain audio/video embeds, see settings panel for details.";}

	getVersion(){return "1.9";}

	getAuthor(){return "CompletelyUnbelievable";}
	
	constructor(){
		this.mediaEvents=['video.video-8eMOth','audio.audio-2-PNle'];
		this.class='SVAudioFixed'; //Identifing class.
		this.videoParent=`.${BdApi.findModuleByProps('embedVideo').embedVideo.split(' ')[0]}`||`.embedVideo-3nf0O9`;
		this.audioParent=`.${BdApi.findModuleByProps('wrapperAudio').wrapperAudio.split(' ')[0]}`||`.wrapperAudio-1jDe0Q`;
		this.embedIframe=`iframe.${BdApi.findModuleByProps('embedIframe').embedIframe.split(' ')[0]}`||`iframe.embedIframe-2hcNY5`;
		this.debug=false; //Console logs the steps to make sure events are being triggered.
		this.debugSP=false; //Additional options that will be in testing phases for now, some might not do anything.
		this.handler; //The delegated event handlers gets put here, makes it easier to remove.
		this.iframeHandler; //The delegated event handlers for iframes gets put here, makes it easier to remove.
		this.initialized=false;
	}

	get default(){
		if(!this.debugSP){
			return {
				native:true,
				volume:10,
				soundcloud:false,
				soundcloudVolume:10
			}
		}else{
			return {
				native:true,
				volume:10,
				soundcloud:false,
				soundcloudVolume:10,
				youtube:false,
				youtubeVolume:10,
				twitter:false,
				twitterVolume:10,
				twitch:false,
				twitchVolume:10
			}
		}
	}

	observer(){} //Don't want to use the observer at all.

	start(){
		let libraryScript=document.getElementById('ZLibraryScript');
		if(typeof window.ZLibrary!=="undefined")this.initialize();
		else libraryScript.addEventListener('load',()=>this.initialize());
	}

	initialize(){
		this.initialized=true;
		window.ZLibrary.PluginUpdater.checkForUpdate(this.getName(),this.getVersion(),"https://raw.githubusercontent.com/CompletelyUnbelievable/BDAddons/master/PluginsExperiments/StartingVolume.plugin.js");
		this.loadSettings();
		this.handler=this.delegateEvents(document,'click',this.mediaEvents,'play',this.check.bind(this)); //Add listener.
		this.iframeHandler=this.delegateEvents(document,'click',this.embedIframe,'load',this.iframeHandling.bind(this)); //Iframes need a seperate event handler, such as load, in order to have any hope of being triggered.
		console.log(`${this.getName()} v${this.getVersion()} has (re)initialized.`);
	}

	stop(){
		this.initialized=false;
		this.removeDelegatedEvents(document,'click',this.mediaEvents,'play',this.check.bind(this),this.handler);
		this.removeDelegatedEvents(document,'click',this.embedIframe,'load',this.iframeHandling.bind(this),this.iframeHandler);
	}

	load(){
		let libraryScript=document.getElementById('ZLibraryScript'),soundCloudAPI=document.getElementById('soundCloudAPI'),youtubeIframeAPI=document.getElementById('youtubeIframeAPI'),twitterWidgetAPI=document.getElementById('twitterWidgetAPI'),twitchIframeAPI=document.getElementById('twitchIframeAPI');
		if(!window.ZLibrary&&!libraryScript){
			libraryScript=document.createElement('script');
			libraryScript.setAttribute('type','text/javascript');
			/*In part borrowed from Zere, so it redirects the user to download the Lib if it does not load correctly and the user does not have the plugin version of the lib.*/
			libraryScript.addEventListener("error",function(){if(typeof window.ZLibrary==="undefined"){window.BdApi.alert("Library Missing",`The library plugin needed for ${this.getName()} is missing and could not be loaded.<br /><br /><a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);}}.bind(this));
			libraryScript.setAttribute('src','https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js');
			libraryScript.setAttribute('id','ZLibraryScript');
			document.head.appendChild(libraryScript);
		}
		if(!soundCloudAPI)soundCloudAPI=this.createScriptElementAppend('text/javascript','soundCloudAPI',`https://w.soundcloud.com/player/api.js`);
		if(!youtubeIframeAPI&&this.debugSP)youtubeIframeAPI=this.createScriptElementAppend('text/javascript','youtubeIframeAPI',`https://www.youtube.com/iframe_api`);
		if(!twitterWidgetAPI&&this.debugSP)twitterWidgetAPI=this.createScriptElementAppend('text/javascript','twitterWidgetAPI',`https://platform.twitter.com/widgets.js`);
		if(!twitchIframeAPI&&this.debugSP)twitchIframeAPI=this.createScriptElementAppend('text/javascript','twitchIframeAPI',`https://player.twitch.tv/js/embed/v1.js`);
	}

	createScriptElementAppend(type,id,src){ //Very basic for now.
		let x=document.createElement('script');
		x.setAttribute('type',type);
		x.setAttribute('id',id);
		x.setAttribute('src',src);
		document.head.appendChild(x);
		return x;
	}

	saveSettings(){
        window.ZLibrary.PluginUtilities.saveSettings(this.getName(),this.settings);
	}

	loadSettings(){
        this.settings=window.ZLibrary.PluginUtilities.loadSettings(this.getName(),this.default);
	}

	/*
	** This was made to replace Jquery's .on, as opposed to the prior this can work with media events. 
	**
	** topEle is the element that when topEvent occurs will add listeners to,
	** an element's selector that matches lowSelector.
	** 
	** The matched lowSelector elements will recieve listeners that trigger on lowEvent,
	** when the lowEvent is triggered it will trigger funct.
	**
	** Returns the handler for easy removal.
	*/
	delegateEvents(topEle,topEvent,lowSelector,lowEvent,funct){ //Solution to .on not working with media events.
		if(document.contains(topEle)&&typeof topEle==='object'){ //Check if topEle is an element.
			let array = [],
			handler=function handler(){
				if(Array.isArray(lowSelector)&&typeof lowSelector==='object'&&typeof funct==='function'){
					for(let i of lowSelector){
						for(let x of document.querySelectorAll(i)){
							if(array.indexOf(x)===-1){
								array.push(x);
								x.addEventListener(lowEvent,funct);
							}
						}
					}
				}
				else if(typeof lowSelector==='string'&&typeof funct==='function'){
					for(let x of document.querySelectorAll(lowSelector)){
						if(array.indexOf(x)===-1){
							array.push(x);
							x.addEventListener(lowEvent,funct);
						}
					}
				}
			}.bind(this);
			topEle.removeEventListener(topEvent,handler);
			topEle.addEventListener(topEvent,handler); //Moved the actual function to mainEvent so that it can be removed with ease.
			return handler;
		}
	}

	removeDelegatedEvents(topEle,topEvent,lowSelector,lowEvent,funct,handler){
		topEle.removeEventListener(topEvent,handler);
		/*if(Array.isArray(lowSelector)&&typeof lowSelector==='object'&&typeof funct==='function'){ //Mimics how delegated events sets listeners.
			for(let i of lowSelector){for(let x of document.querySelectorAll(i)){x.removeEventListener(lowEvent,funct);}}
		}else if(typeof lowSelector==='string'&&typeof funct==='function'){
			for(let x of document.querySelectorAll(lowSelector)){x.removeEventListener(lowEvent,funct);}
		}//*/
	}

	check(event){ //Changes volumes and adds classes.
		try{
			if(this.initialized){
				let volumes=this.conversions(),element=event.target;
				if(this.debug/*&&!element.classList.contains(this.class)*/)console.log('check'); //The lower event listeners seem to multiply? But it is kind of a non issue except it would log 'check' multiple times, which is solved by checking for no class on an element.
				if(this.settings.native&&!element.classList.contains(this.class)&&element.volume!==volumes.volumeD){
					if(this.debug)console.log(event.type);
					element.classList.add(this.class);
					element.volume=volumes.volumeD;
				}
			}
		}catch(e){
			throw(`Failure at native "check" function: `+e);
		}
	}

	iframeHandling(event){
		try{
			if(this.initialized){
				let element=event.target;
				if(this.debug)console.log('iframeHandler');
				if(this.settings.soundcloud&&typeof SC==='object'&&element.src.includes('soundcloud')&&!element.classList.contains(this.class)){
					(SC.Widget(element)).setVolume(this.settings.soundcloudVolume);
					if(this.debug)console.log(event.type);
					element.classList.add(this.class);
				}
			}
		}catch(e){
			throw(`Failure at iframeHandling function: `+e);
		}
	}

	conversions(){
		if(this.settings!==undefined){ //Try to use settings first,
			return{
				volumeP:`${this.settings.volume}%`,
				volumeD:this.settings.volume/100
			};
		}else if(this.settings===undefined&&this.default!==undefined){ //then use defaults.
			return{
				volumeP:`${this.default.volume}%`,
				volumeD:this.default.volume/100
			};
		}else{ //In the case everything goes wrong, redundant defaults.
			return{
				volumeP:'10%',
				volumeD:0.1
			};
		}
	}

	getSettingsPanel(){
		let panel=$("<form>",{class:'form',style:`width:100%;margin-left:auto;margin-right:auto;`});
		this.generateSettings(panel);
		return panel[0];
	}
	
	generateSettings(panel){
		let ProTip='Error, this should be set to something else.';
		if(!this.debugSP){
			ProTip=`Because of the way that soundcloud embeds have to be handled,the volume of SoundCloud embeds might be at full volume breifly. This handler could be used as a way to add a volume slider to their embeds,just food for thought. I also want to hand make my settings panel in the future.`;
			new window.ZLibrary.Settings.SettingGroup('Options',{collapsible:true,shown:true}).appendTo(panel).append(
				new window.ZLibrary.Settings.Switch('Native Embeds',`When enabled,changes the volume pertaining to discord's native embeds.`,this.settings.native,boolean=>{
					this.settings.native=boolean;
					this.saveSettings();
				}),
				new window.ZLibrary.Settings.Textbox('Native Embed Volume',`Set a volume to use for discord's native embeds,use a percent without the symbol.`,this.settings.volume,text=>{
					this.SPInputValidation('volume',text,panel);
				}),
				new window.ZLibrary.Settings.Switch('SoundCloud Embeds',`When enabled,changes the volume pertaining to SoundCloud embeds.`,this.settings.soundcloud,boolean=>{
					this.settings.soundcloud=boolean;
					this.saveSettings();
				}),
				new window.ZLibrary.Settings.Textbox('SoundCloud Embed Volume',`Set a volume to use for SoundCloud embeds,use a percent without the symbol.`,this.settings.soundcloudVolume,text=>{
					this.SPInputValidation('soundcloudVolume',text,panel);
				})
			);
		}else{
			ProTip=`IFrames are incredibly difficult to interact with, so do not expect me to actually be able to change volumes on YouTube/Twitter/Twitch embeds anytime soon.`;
			new window.ZLibrary.Settings.SettingGroup('Super Secret Debug Menu',{collapsible:true,shown:true}).appendTo(panel).append(
				new window.ZLibrary.Settings.Switch('Native Embeds',`When enabled, changes the volume pertaining to discord's native embeds.`,this.settings.native,boolean=>{
					this.settings.native=boolean;
					this.saveSettings();
				}),
				new window.ZLibrary.Settings.Textbox('Native Embed Volume',`Set a volume to use for discord's native embeds, use a percent without the symbol.`,this.settings.volume,text=>{
					this.SPInputValidation('volume',text,panel);
				}),
				new window.ZLibrary.Settings.Switch('SoundCloud Embeds',`When enabled, changes the volume pertaining to SoundCloud embeds.`,this.settings.soundcloud,boolean=>{
					this.settings.soundcloud=boolean;
					this.saveSettings();
				}),
				new window.ZLibrary.Settings.Textbox('SoundCloud Embed Volume',`Set a volume to use for SoundCloud embeds, use a percent without the symbol.`,this.settings.soundcloudVolume,text=>{
					this.SPInputValidation('soundcloudVolume',text,panel);
				}),
				new window.ZLibrary.Settings.Switch('YouTube Embeds',`When enabled, changes the volume pertaining to YouTube embeds.`,this.settings.youtube,boolean=>{
					this.settings.youtube=boolean;
					this.saveSettings();
				}),
				new window.ZLibrary.Settings.Textbox('Youtube Embed Volume',`Set a volume to use for YouTube embeds, use a percent without the symbol.`,this.settings.youtubeVolume,text=>{
					this.SPInputValidation('youtubeVolume',text,panel);
				}),
				new window.ZLibrary.Settings.Switch('Twitter Embeds',`When enabled, changes the volume pertaining to Twitter embeds.`,this.settings.twitter,boolean=>{
					this.settings.twitter=boolean;
					this.saveSettings();
				}),
				new window.ZLibrary.Settings.Textbox('Twitter Embed Volume',`Set a volume to use for Twitter embeds, use a percent without the symbol.`,this.settings.twitterVolume,text=>{
					this.SPInputValidation('twitterVolume',text,panel);
				}),
				new window.ZLibrary.Settings.Switch('Twitch Embeds',`When enabled, changes the volume pertaining to Twitch embeds.`,this.settings.twitch,boolean=>{
					this.settings.twitch=boolean;
					this.saveSettings();
				}),
				new window.ZLibrary.Settings.Textbox('Twitch Embed Volume',`Set a volume to use for Twitch embeds, use a percent without the symbol.`,this.settings.twitchVolume,text=>{
					this.SPInputValidation('twitchVolume',text,panel);
				})
			);
		}
		//ProTip box.
		panel.append($('<div>',{class:`protip-12obwm inline-136HKr`,style:`float:left;width:80%;margin:10px 0;`})
			.append($('<div>',{text:'Protip: ',style:`text-transform:uppercase;`,class:`pro-1T8RK7 small-29zrCQ size12-3R0845 height16-2Lv3qA statusGreen-pvYWjA weightBold-2yjlgw`})
				.append($('<div>',{text:ProTip,style:`text-transform:none;`,class:`tip-2ab612 primary-jw0I4K`})
				)
			)
		);
		const resetButton=$('<button>',{type:'button',text:'Reset Settings',style:'margin:10px 0;float:right;',class:'button-38aScr lookOutlined-3sRXeN colorRed-1TFJan sizeMedium-1AC_Sl grow-q77ONN'})
		.click(function(){
			if(this.debug)console.log('reset');
			this.settings=this.default;
			this.regeneratePanel(panel);
		}.bind(this));
		panel.append(resetButton);
	}

	regeneratePanel(panel){ //Remove redundancy from the settings panel.
		if(panel!==undefined){
			this.saveSettings();
			panel.empty();
			this.generateSettings(panel);
		}
	}

	SPInputValidation(setting,number,panel){ //Remove redundancy from the settings panel.
		number=parseInt(number,10);
		if(number!==NaN&&number>=1&&number<=100){
			this.settings[setting]=number;
			this.saveSettings();
		}else this.regeneratePanel(panel);
	}
}
