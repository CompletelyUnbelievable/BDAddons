//META{"name":"FurryTalk"}*//

class FurryTalk {

	getName () {return "FurryTalk";}

	getDescription () {return "A plugin that makes the text in the chat area similar to that seen in furry roleplay. Client side only, this does not change the contents of any message you are sending and will not change multiline code blocks for sanity reasons.";}

	getVersion () {return "1.0";}

	getAuthor () {return "CompletelyUnbelievable";}

	observer () {
		FTGrabTextNodesWithjQuery(['markup-2BOw-j','markup-2BOw-j > strong','markup-2BOw-j > em','markup-2BOw-j > em > strong','markup-2BOw-j > s','markup-2BOw-j > u','markup-2BOw-j > code','username-_4ZSMR']);
	}

	stop () {
		//user just needs to move to another guild or channel and it will fix itself.
		if (settingsCookie['fork-ps-2'] === false) {
			BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has stopped.');
		}
	}

	start () {
		if (settingsCookie['fork-ps-2'] === false) {
			BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has started.');
		}
	}
}

function FTAddedClass(){
	return 'FTalkAdded';
}

function FTGrabTextNodesWithjQuery(array){
	let x;
	if (Array.isArray(array)) {
		for (y = 0; y < array.length; y++) {
			x = array[y];
			if ($('.' + x)[0]) {
				let contents = $('.' + x).contents();
				for (i = 0; i < contents.length; i++) {
					if (contents[i].nodeType === Node.TEXT_NODE && !contents[i].parentElement.classList.contains(FTAddedClass())) {
						contents[i].textContent = FTConvertText(contents[i].textContent);
						contents[i].parentElement.classList.add(FTAddedClass());
						//For debugging:
						//console.log(contents[i].textContent + " | " + FTConvertText(contents[i].textContent));
					}
				}
			}
		}
	}
}

function FTConvertText(x) {
	let faces=["(・`ω´・)",";;w;;","owo","UwU",">w<","^w^",">>///<<"];
	x = x.replace(/(?:r|l)/g, "w");
	x = x.replace(/(?:R|L)/g, "W");
	x = x.replace(/n([aeiou])/g, 'ny$1');
	x = x.replace(/N([aeiou])/g, 'Ny$1');
	x = x.replace(/N([AEIOU])/g, 'Ny$1');
	x = x.replace(/ove/g, "uv");
	x = x.replace(/\!+/g, " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");
	return x;
}
