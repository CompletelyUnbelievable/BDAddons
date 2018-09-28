//META{"name":"StartingVolume"}*//

var PluginName, PluginDesc, PluginVers, PluginAuth, ClassElement, VolumeElement, ReplacedClass, VolValP, VolValD;


class StartingVolume {

	getName () {PluginName = "StartingVolume"; return PluginName;}

	getDescription () {PluginDesc = "Sets the volume on the default discord embedDoes not visually update properly."; return PluginDesc;}

	getVersion () {PluginVers = "Alpha"; return PluginVers;}

	getAuthor () {PluginAuth = "CompletelyUnbelievable"; return PluginAuth;}

	observer () {
		VideoPlayer();
	}

	stop () {
		RemoveClasses();
	}

	start () {
		VolValP = '10%';
		ReplacedClass = 'AudioFixed';
		ClassElement = [], VolumeElement = [];
	}
}

function CalcVolume(x) {
	if(!isNaN(parseFloat(x))){
		VolValD = parseFloat(x) / 100;
		return VolValD;
	}else{
		return null;
	}
}

function VideoPlayer() {
	if (document.getElementsByTagName('video')[0]) {
		for (i = 0; i < document.getElementsByTagName('video').length; i++) {
			if (document.getElementsByTagName('video')[i].classList.contains('video-8eMOth')) {
				ClassElement[i] = document.getElementsByTagName('video')[i];
				if (ClassElement[i].classList.contains(ReplacedClass) == false) {
					ClassElement[i].classList.add(ReplacedClass);
					if (CalcVolume(VolValP) != null) {
						ClassElement[i].volume = VolValD;
					}
				}
			}
		}
	}
}

function RemoveClasses() {
	if (Array.isArray(ClassElement)) {
		for (i = 0; i < ClassElement.length; i++) {
			if (ClassElement[i] && ReplacedClass) {
				ClassElement[i].classList.remove(ReplacedClass);
			}
		}
	}
}
