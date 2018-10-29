//META{"name":"FixDiscordImages","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/FixDiscordImages.plugin.js","website":"https://git.io/vhWjm"}*//

class FixDiscordImages {

	getName () {return "FixDiscordImages";}

	getDescription () {return "Makes the images in the activity menu full sized, also adds some styles to make the cards look better.";}

	getVersion () {return "1.2";}

	getAuthor () {return "CompletelyUnbelievable";}


	observer () {
		FDIMain();
	}

	stop () {
		if (document.getElementById(this.getName() + 'CSS')) {
			BdApi.clearCSS(this.getName() + 'CSS');
		}
		FDIremoveClass(FDIReplacedClass());
		//BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has stopped.');
	}

	start () {
		try {
			BdApi.injectCSS(this.getName() + 'CSS', FDIsetStyles());
			FDIMain();
			//BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has started.');
		}catch(error) {
			BdApi.showToast(this.getName() + ' v' + this.getVersion() + ' has failed to start.');
			console.log('Error Caught: ' + error);
		}
	}
}

function FDIReplacedClass() {
	return 'ReplacedFiAcMenu';
}

function FDIMain() { /*I know this is not efficient, just want to do it this way so I know which classes are where. Otherwise I would make it so the function accepts arrays.*/
	FDICheckClassExists('background-1ri_HN', 'FindModify'); /*Activity menu*/
	FDICheckClassExists('background-3zYSQO', 'FindModify');
	FDICheckClassExists('backgroundImage-dOYlay', 'FindModify');
	FDICheckClassExists('splashArt-1anaP9', 'FindModify');
	FDICheckClassExists('splashArt-3yFzRe', 'FindModify');
	FDICheckClassExists('rowBackground-3MeNoN', 'FindModify'); /*Library menu*/
	FDICheckClassExists('storePaginationImg-2P8SMo', 'FindModify'); /*Store menu*/
	FDICheckClassExists('asset-3V-FUM', 'FindModify');
	FDICheckClassExists('itemImage-2Y74no', 'FindModify');
	FDICheckClassExists('paginationItem-1Pt2wI', 'FindModify');
}

function FDICheckClassExists(check, func) { /*func is for potential other options, right now it is not used for anything.*/
	if (document.getElementsByClassName(check)[0]) {
		if (func === 'FindModify') {
			FDIFindModify(check, FDIReplacedClass());
		}
	}
}

function FDIFindModify(x, y) { /*Find x, remember with y.*/
	$('.' + x).each(function(i, obj) {
		if (!document.getElementsByClassName(x)[i].classList.contains(y)) {
			if (document.getElementsByClassName(x)[i].style.backgroundImage) {
				document.getElementsByClassName(x)[i].style.backgroundImage = FDIAmendString(document.getElementsByClassName(x)[i].style.backgroundImage);
			}else if (document.getElementsByClassName(x)[i].src) {
				
				let e = document.createElement('div');
				e.classList = document.getElementsByClassName(x)[i].classList;
				e.style.backgroundImage = 'url(' + FDIAmendString(document.getElementsByClassName(x)[i].src) + ')';
				e.style.backgroundSize = 'cover';
				if (document.getElementsByClassName(x)[i].clientHeight > 0 && document.getElementsByClassName(x)[i].clientWidth > 0) { /*The FDImain way an image should be seen.*/
					e.style.height = document.getElementsByClassName(x)[i].clientHeight + 'px';
					e.style.width = document.getElementsByClassName(x)[i].clientWidth + 'px';
				}else if (document.getElementsByClassName(x)[i].offsetHeight > 0 && document.getElementsByClassName(x)[i].offsetWidth > 0) { /*backup so image can be seen.*/
					e.style.height = document.getElementsByClassName(x)[i].offsetHeight + 'px';
					e.style.width = document.getElementsByClassName(x)[i].offsetWidth + 'px';
				}else{ /*Last resort so image can be seen.*/
					e.style.minHeight = '100px';
					e.style.minWidth = '560px';
				}
				
				document.getElementsByClassName(x)[i].parentNode.replaceChild(e, document.getElementsByClassName(x)[i]);
				
			}
			document.getElementsByClassName(x)[i].classList.add(y);
		}
	});
}

function FDIremoveClass(x) { /*Find x, remove with x.*/
	if (document.getElementsByClassName(x)) {
		$('.' + x).each(function(i, obj) {
			let ele = document.getElementsByClassName(x)[i]
			ele.classList.remove(x);
		});
	}
}

function FDIAmendString(str, option) {

	if (str.lastIndexOf("?") > -1 && str.lastIndexOf(".webp?size") <= -1 && str.lastIndexOf(".gif?size") <= -1) {
			str = str.slice(0, str.lastIndexOf("?"));
			if (option === 'NoFormat') { /*Potental setting.*/
				return (str);
			}else{
				str += "?format=png"; /*Prevents Gifs from playing, this would easily be a setting.*/
			}
	}

	return (str);
}

function FDIsetStyles() {
	let styles = `#app-mount .activityFeed-28jde9 .news-2GDtLJ, #app-mount .activityFeed-28jde9 .article-3kb3qm, #app-mount .activityFeed-28jde9 .carousel-JbsNzL, #app-mount .activityFeed-28jde9 .paginationItem-3-MBTL, #app-mount .applicationStore-1pNvnv .itemBackground-1jfD8p:before {
		background: transparent;
	}

	#app-mount .applicationStore-1pNvnv .itemBackground-1jfD8p, #app-mount .applicationStore-1pNvnv .collapsed-1454et .asset-3V-FUM {
		border-radius: 5px;
	}

	#app-mount .applicationStore-1pNvnv .collapsed-1454et {
		padding-bottom: 30px;
	}
	
	#app-mount .body-3NySJS, .article-3kb3qm > div:not(.background-1ri_HN), .applicationStore-1pNvnv .itemDescription-1_B4j2 {
		background: rgba(46,49,54,0.9);
		padding: 10px 10px 10px 10px;
		border-radius: 10px;
		margin: 0 auto 0 auto;
	}
	
	#app-mount .background-1ri_HN, #app-mount .background-3zYSQO {
		height: 100%;
		background-size: cover;
	}
	
	#app-mount .background-1ri_HN, #app-mount .storePromotionBackground-3DvkVd, #app-mount .splashArt-1anaP9, #app-mount .background-3zYSQO, #app-mount .applicationStore-1pNvnv .collapsed-1454et {
		-webkit-mask: none;
		filter: none;
		opacity: 0.9;
	}`;

	return styles;
}
