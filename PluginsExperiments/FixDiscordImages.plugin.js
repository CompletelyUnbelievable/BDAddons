//META{"name":"FixDiscordImages"}*//

let ReplacedClass;


class FixDiscordImages {

	getName () {return "FixDiscordImages";}

	getDescription () {return "Makes the images in the activity menu full sized, also adds some styles to make the cards look better.";}

	getVersion () {return "1.1";}

	getAuthor () {return "CompletelyUnbelievable";}


	observer () {
		Main();
	}

	stop () {
		if (document.getElementById(this.getName() + 'CSS')) {
			BdApi.clearCSS(this.getName() + 'CSS');
		}
		removeClass(ReplacedClass);
		BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has stopped.');
	}

	start () {
		try {
			BdApi.injectCSS(this.getName() + 'CSS', setStyles());
			ReplacedClass = 'ReplacedFiAcMenu';
			Main();
			BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has started.');
		}catch(error) {
			BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has failed to start.');
			console.log('Error Caught: ' + error);
		}
	}
}

function Main() { /*I know this is not efficient, just want to do it this way so I know which classes are where. Otherwise I would make it so the function accepts arrays.*/
	CheckClassExists('background-1ri_HN', 'FindModify'); /*Activity menu*/
	CheckClassExists('background-3zYSQO', 'FindModify');
	CheckClassExists('splashArt-1anaP9', 'FindModify');
	CheckClassExists('splashArt-3yFzRe', 'FindModify');
	CheckClassExists('rowBackground-3MeNoN', 'FindModify'); /*Library menu*/
	CheckClassExists('storePaginationImg-2P8SMo', 'FindModify'); /*Store menu*/
	CheckClassExists('asset-3V-FUM', 'FindModify');
	CheckClassExists('itemImage-2Y74no', 'FindModify');
	CheckClassExists('paginationItem-1Pt2wI', 'FindModify');
}

function CheckClassExists(check, func) { /*func is for potential other options, right now it is not used for anything.*/
	if (document.getElementsByClassName(check)[0]) {
		if (func === 'FindModify') {
			FindModify(check, ReplacedClass);
		}
	}
}

function FindModify(x, y) { /*Find x, remember with y.*/
	$('.' + x).each(function(i, obj) {
		if (!document.getElementsByClassName(x)[i].classList.contains(y)) {
			if (document.getElementsByClassName(x)[i].style.backgroundImage) {
				document.getElementsByClassName(x)[i].style.backgroundImage = AmendString(document.getElementsByClassName(x)[i].style.backgroundImage);
			}else if (document.getElementsByClassName(x)[i].src) {
				
				let e = document.createElement('div');
				e.classList = document.getElementsByClassName(x)[i].classList;
				e.style.backgroundImage = 'url(' + AmendString(document.getElementsByClassName(x)[i].src) + ')';
				e.style.backgroundSize = 'cover';
				e.style.height = document.getElementsByClassName(x)[i].clientHeight + 'px';
				e.style.width = document.getElementsByClassName(x)[i].clientWidth + 'px';
				document.getElementsByClassName(x)[i].parentNode.replaceChild(e, document.getElementsByClassName(x)[i]);
				
			}
			document.getElementsByClassName(x)[i].classList.add(y);
		}
	});
}

function removeClass(x) { /*Find x, remove with x.*/
	if (document.getElementsByClassName(x)) {
		$('.' + x).each(function(i, obj) {
			let ele = document.getElementsByClassName(x)[i]
			ele.classList.remove(x);
		});
	}
}

function AmendString(str, option) {

	if (str.lastIndexOf("?") > -1 && str.lastIndexOf(".webp?size") <= -1) {
			str = str.slice(0, str.lastIndexOf("?"));
			if (option === 'NoFormat') { /*Potental setting.*/
				return (str);
			}else{
				str += "?format=png"; /*Prevents Gifs from playing, this would easily be a setting.*/
			}
	}

	return (str);
}

function setStyles() {
	var styles = `#app-mount .news-2GDtLJ {
		background: transparent;
	}
	
	#app-mount .body-3NySJS, .article-3kb3qm > div:not(.background-1ri_HN) {
		background: rgba(46,49,54,0.9);
		padding: 10px 10px 10px 10px;
		border-radius: 10px;
		margin: 0 auto 0 auto;
	}
	
	#app-mount .article-3kb3qm, #app-mount .carousel-JbsNzL, #app-mount .paginationItem-3-MBTL {
		background: transparent;
	}
	
	#app-mount .background-1ri_HN, #app-mount .background-3zYSQO {
		height: 100%;
		background-size: cover;
	}
	
	#app-mount .background-1ri_HN, #app-mount .storePromotionBackground-3DvkVd, #app-mount .splashArt-1anaP9, #app-mount .background-3zYSQO {
		-webkit-mask: none;
		filter: none;
		opacity: 0.9;
	}`;

	return styles;
}
