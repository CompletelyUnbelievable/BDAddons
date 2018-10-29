//META{"name":"StartingVolume","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/StartingVolume.plugin.js","website":"https://git.io/vhWjm"}*//

class StartingVolume {

	getName () {return "StartingVolume";}

	getDescription () {return "Sets the volume on the default discord video and audio embeds. Does not visually update properly.";}

	getVersion () {return "1.0";}

	getAuthor () {return "CompletelyUnbelievable";}

	observer () {
		SVPlayer('video', 'video-8eMOth');
		SVPlayer('audio', 'audio-2-PNle');
	}

	stop () {
		SVRemoveClasses();
	}

	start () {
		this.observer();
	}
}

function SVSetVolume() {
	return '10%';
}

function SVReplacedClass() {
	return 'AudioFixed';
}

function SVPlayer(Tag, TagClass) { /*Tag name, verify with a class*/
	if (document.getElementsByTagName(Tag)[0]) {
		for (i = 0; i < document.getElementsByTagName(Tag).length; i++) {
			if (document.getElementsByTagName(Tag)[i].classList.contains(TagClass) && !document.getElementsByTagName(Tag)[i].classList.contains(SVReplacedClass())) {
				let ClassElement = [];
				ClassElement[i] = document.getElementsByTagName(Tag)[i];
				if (ClassElement[i].classList.contains(SVReplacedClass()) == false) {
					ClassElement[i].classList.add(SVReplacedClass());
					if (SVCalcVolume(SVSetVolume()) != null) {
						ClassElement[i].volume = SVCalcVolume(SVSetVolume());
					}
				}
			}
		}
	}
}

function SVCalcVolume(x) {
	if(!isNaN(parseFloat(x))){
		return (parseFloat(x) / 100);
	}else{
		return null;
	}
}

function SVRemoveClasses() {
	if (document.getElementsByClassName(SVReplacedClass())[0]) {
		for (i = 0; i < document.getElementsByClassName(SVReplacedClass()).length; i++) {
			if (document.getElementsByClassName(SVReplacedClass())[i]) {
				if (SVCalcVolume('50%') != null) {
					document.getElementsByClassName(SVReplacedClass())[i].volume = SVCalcVolume('50%');
				}
				document.getElementsByClassName(SVReplacedClass())[i].classList.remove(SVReplacedClass());
			}
		}
	}
}
