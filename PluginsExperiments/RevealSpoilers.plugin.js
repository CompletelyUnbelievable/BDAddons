//META{"name":"RevealSpoilers","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/RevealSpoilers.plugin.js","website":"https://git.io/vhWjm"}*//

class RevealSpoilers {

	getName () {return "RevealSpoilers";}

	getDescription () {return "Reveals image and text based spoilers.";}

	getVersion () {return "1.0";}

	getAuthor () {return "CompletelyUnbelievable";}


	get RSConfig() {
		return {
			textReveal: true, //Reveal text spoilers.
			imageReveal: true, //Reveal image spoilers.
			parentClass: DiscordClasses.Messages.message.value.split(' ')[0], //Text spoiler parent class.
			spoilerClass: BdApi.findModuleByProps('spoilerText').spoilerText.split(' ')[0], //Not required anymore, just here if it becomes needed for text spoilers.
			hiddenClass: BdApi.findModuleByProps('spoilerText').hidden.split(' ')[0], //This is what is looked for as it pertains to spoiler text, this class goes away when it is no longer hidden.
			imageParentClass: BdApi.findModuleByProps('spoilerText').spoilerContainer.split(' ')[0], //Image spoiler parent class.
			imageSpoilerClass: 'spoiler-1PPAUc', //Not required anymore, just here if it becomes needed for image spoilers.
			imageHiddenClass: 'hiddenSpoilers-1ksnR6', //This is what is looked for as it pertains to spoiler images, this class goes away when it is no longer hidden.
			revealSpoilersClass: 'RevealedS', //A class that was going to be used to check if a spoiler was revealed or not, but it is currently unneeded.
		}
	}

	observer () {
		let self = this;
		if (document.querySelector(`.${self.RSConfig.hiddenClass}`)&&self.RSConfig.textReveal === true) { //Text.
			for (let x of document.querySelectorAll(`.${self.RSConfig.hiddenClass}`)) {
				x.click();
			}
		}
		if (document.querySelector(`.${self.RSConfig.imageParentClass} .${self.RSConfig.imageHiddenClass}`)&&self.RSConfig.imageReveal === true) { //Images.
			for (let x of document.querySelectorAll(`.${self.RSConfig.imageParentClass} .${self.RSConfig.imageHiddenClass}`)) {
				x.click();
			}
		}
	}

	load(){ //for safty reasons, thought this is mostly uneeded except for checking for updates.
		let libraryScript = document.getElementById('zeresLibraryScript');
        if (!libraryScript) {
            libraryScript = document.createElement('script');
            libraryScript.setAttribute('type', 'text/javascript');
            /*In part borrowed from Zere, so it redirects the user to download the Lib if it does not load correctly and the user does not have it.*/
            libraryScript.onload = function() {if(typeof ZLibrary === "undefined") {window.BdApi.alert("Library Missing",`The library plugin needed for ` + 'ThemePreview' + ` is missing and could not be loaded.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);}};
            libraryScript.setAttribute('src', 'https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js');
            libraryScript.setAttribute('id', 'zeresLibraryScript');
            document.head.appendChild(libraryScript);
        }
	}

	stop () {
		//Does not need anything since the spoilers will hide themselves with almost any redirect.
	}

	start () {
		let self = this; //kind of unneeded, but w/e.
		if (typeof window.ZLibrary !== "undefined") { //Just checking for updates.
			ZLibrary.PluginUpdater.checkForUpdate(self.getName(), self.getVersion(), 'https://completelyunbelievable.github.io/BDAddons/PluginsExperiments/RevealSpoilers.plugin.js');
		}
	}
}
