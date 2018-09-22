//META{"name":"FixActivityMenu"}*//

var PluginName, PluginDesc, PluginVers, PluginAuth;


class FixActivityMenu {

	getName () {PluginName = "FixActivityMenu"; return PluginName;}

	getDescription () {PluginDesc = "Makes the images in the activity menu full sized, also adds some styles to make the cards look better."; return PluginDesc;}

	getVersion () {PluginVers = "1.0"; return PluginVers;}

    getAuthor () {PluginAuth = "CompletelyUnbelievable"; return PluginAuth;}


    observer () {
        checkForPage();
    }

    stop () {
        removeClass('background-1ri_HN', 'CUReplaced');
        removeClass('background-3zYSQO', 'CUReplaced');
        removeClass('splashArt-1anaP9', 'CUReplaced');

        if (document.getElementById(PluginName + 'CSS')) {
            BdApi.clearCSS(PluginName + 'CSS');
        }
    }

    start () {
        BdApi.injectCSS(PluginName + 'CSS', setStyles());
    }
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

function FindModify(x, y) { /*Find x, remember with y.*/
    if (document.getElementsByClassName(x)[0]) {
        $('.' + x).each(function(i, obj) {
            if (document.getElementsByClassName(x)[i].classList.contains(y) == false) {
                document.getElementsByClassName(x)[i].style.backgroundImage = AmendString(document.getElementsByClassName(x)[i].style.backgroundImage);
                document.getElementsByClassName(x)[i].classList.add(y);
            }
        });
    }
}

function removeClass(x, y) { /*Find x, remove with y.*/
    if (document.getElementsByClassName(x, y)) {
        $('.' + x).each(function(i, obj) {
        document.getElementsByClassName(x)[i].classList.remove(y);
        });
    }
}

function AmendString(x) {

    if (x.lastIndexOf(".") > -1 && x.lastIndexOf(".") + 15 != x.length) {
        x = x.slice(0, x.lastIndexOf(".") + 4);
        x += "?format=png"; /*Prevents Gifs from playing, this would easily be a setting.*/
     }

    if (x.lastIndexOf(".") + 15 == x.length) {
        console.log("Repeat")
    }

    return (x);
}

function checkForPage() {
    if (document.getElementsByClassName('activityFeed-28jde9')) {
        FindModify('background-1ri_HN', 'CUReplaced');
        FindModify('background-3zYSQO', 'CUReplaced');
        FindModify('splashArt-1anaP9', 'CUReplaced');
    }
}
