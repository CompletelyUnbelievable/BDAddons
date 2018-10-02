//META{"name":"StartingVolume"}*//

var PluginName, PluginDesc, PluginVers, PluginAuth, ClassElement, ReplacedClass, VolValP, VolValD;


class StartingVolume {

	getName () {PluginName = "StartingVolume"; return PluginName;}

	getDescription () {PluginDesc = "Sets the volume on the default discord video and audio embeds. Does not visually update properly."; return PluginDesc;}

	getVersion () {PluginVers = "Alpha"; return PluginVers;}

	getAuthor () {PluginAuth = "CompletelyUnbelievable"; return PluginAuth;}

	observer () {
		Player('video', 'video-8eMOth');
		Player('audio', 'audio-2-PNle');
	}

	stop () {
		RemoveClasses();
	}

	start () {
		VolValP = '10%';
		ReplacedClass = 'AudioFixed';
		ClassElement = [];
	}
}

function Player(Tag, TagClass) { /*Tag name, verify with a class*/
	if (document.getElementsByTagName(Tag)[0]) {
		for (i = 0; i < document.getElementsByTagName(Tag).length; i++) {
			if (document.getElementsByTagName(Tag)[i].classList.contains(TagClass) && !document.getElementsByTagName(Tag)[i].classList.contains(ReplacedClass)) {
				ClassElement[i] = document.getElementsByTagName(Tag)[i];
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

function CalcVolume(x) {
	if(!isNaN(parseFloat(x))){
		VolValD = parseFloat(x) / 100;
		return VolValD;
	}else{
		return null;
	}
}

function RemoveClasses() {
	if (document.getElementsByClassName(ReplacedClass)[0]) {
		for (i = 0; i < document.getElementsByClassName(ReplacedClass).length; i++) {
			if (document.getElementsByClassName(ReplacedClass)[i]) {
				if (CalcVolume('50%') != null) {
					document.getElementsByClassName(ReplacedClass)[i].volume = CalcVolume('50%');
				}
				document.getElementsByClassName(ReplacedClass)[i].classList.remove(ReplacedClass);
			}
		}
	}
}
