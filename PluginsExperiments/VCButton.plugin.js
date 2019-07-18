//META{"name":"VCButton","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/VCButton.plugin.js","website":"https://git.io/vhWjm"}*//

class VCButton{

	getName(){return"VCButton";}

	getDescription(){return"Adds a button to voice channels that make it easier to video share on any server without the discord experiments plugin.";}

	getVersion(){return"1.3";}

	getAuthor(){return"CompletelyUnbelievable";}

	constructor(){
		//this.getGuild=BdApi.findModuleByProps("getGuildId","getLastSelectedGuildId");
		//this.selectedGuildId=this.getGuild.getGuildId;
		//this.getGuildChannels=BdApi.findModuleByProps("getChannels","getDefaultChannel").getChannels;//These might look the same with the one below but they are different.
		//this.channels=BdApi.findModuleByProps("getChannels","hasChannel").getChannels;
		this.changeChannel=BdApi.findModuleByProps("selectChannel","selectVoiceChannel").selectChannel;//function(guildId,channelId,?messageId) *strings*
		this.type=BdApi.findModuleByProps("ChannelTypes").ChannelTypes||{GUILD_TEXT:0,DM:1,GUILD_VOICE:2,GROUP_DM:3,GUILD_CATEGORY:4,GUILD_NEWS:5,GUILD_STORE:6,GUILD_LFG_LISTINGS:7};
		this.classes={channels:window.ZLibrary?window.ZLibrary.DiscordClasses.ChannelList.channels.first:"channels-Ie2l6A",channelName:"name-3_Dsmg",channelContainer:window.ZLibrary?window.ZLibrary.DiscordClasses.ChannelList.containerDefault.first:"containerDefault-1ZnADq",channelChildren:"children-Bmpf2Q"};
		this.ReactTools=window.ZLibrary&&window.ZLibrary.ReactTools&&window.ZLibrary.ReactTools.getOwnerInstance&&this.testFunction(window.ZLibrary.ReactTools.getOwnerInstance,window.ZLibrary.ReactTools,document.body)!==false?window.ZLibrary.ReactTools.getOwnerInstance.bind(window.ZLibrary.ReactTools):this.findReactComponent;
		this.currentChannel=BdApi.findModuleByProps("getChannelId","getVoiceChannelId");
		this.clipboard=window.require?require('electron').remote.clipboard:'';
		this.cleanup=[];//Array of functions, these functions will remove elements from the document that were added by the plugin.
	}

	start(){
		if(window.ZLibrary)window.ZLibrary.PluginUpdater.checkForUpdate(this.getName(),this.getVersion(),'https://raw.githubusercontent.com/CompletelyUnbelievable/BDAddons/master/PluginsExperiments/VCButton.plugin.js');
		this.init();
	}

	stop(){
		this.cleanup.forEach((func)=>{func();});
	}

	observer({addedNodes}){//I'm not sure how to do this any better.
		if(addedNodes.length===1&&addedNodes[0]&&addedNodes[0].classList&&addedNodes[0].classList.contains(this.classes.channelContainer))this.init();
	}

	get default(){//settings
		return{
			override:false,
		}
	}

	init(){
		this.addLinkToElement();
	}

	addLinkToElement(){
		var VCelements=this.cleanArray(this.HtmlCollectionToArray(document.getElementsByClassName(this.classes.channels)[0].getElementsByClassName(this.classes.channelContainer)).map((v)=>{let react=this.ReactTools(v);if(react&&react.props&&react.props.channel&&react.props.channel.type&&react.props.channel.type===this.type.GUILD_VOICE)return v;}));
		if(VCelements.length>0){
			var reactEles=VCelements.map((v)=>{return this.ReactTools(v).props.channel}),
			iconEles=VCelements.map((v)=>{return v.getElementsByClassName(this.classes.channelChildren)[0];});
			iconEles.forEach(function(ele,index){
				if(!ele.getElementsByClassName(this.getName())[0]){//Make sure it isn't already there.
					//Button to be added to the voice channel.
					var template=this.parseHTML(`<div class="${this.getName()} iconItem-1-bXkn iconBase-2IHuka da-iconItem da-iconBase" role="button" aria-label="Enter Voice Channel">
						<svg name="Link" class="actionIcon-2Hi9ZG da-actionIcon" style="display:block!important" width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
							<g style="display:inline!important">
								<g style="display:inline!important" transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
									<path fill="currentColor" style="display:inline!important" d="M6792.8,4975.4c-326.6-59.8-678.5-202.4-977.4-397.9c-197.8-128.8-1189-1101.6-1258-1232.7c-36.8-71.3-43.7-121.9-36.8-234.6c11.5-177.1,87.4-301.3,236.9-388.7c126.5-75.9,328.9-85.1,450.8-23c43.7,23,296.7,255.3,561.2,515.2c266.8,262.2,535.9,510.6,600.3,549.7c289.8,181.7,650.9,271.4,998.2,250.7c269.1-18.4,411.7-55.2,653.2-172.5c556.6-269.1,894.6-816.5,894.6-1453.5c2.3-296.7-39.1-464.6-181.7-759L8628,1410.6L7692,479.2C6682.4-530.5,6638.7-567.2,6275.3-686.8c-163.3-55.2-220.8-62.1-506-62.1c-276-2.3-347.3,4.6-494.5,50.6c-241.5,75.9-446.2,188.6-630.2,349.6c-184,158.7-269.1,193.2-453.1,179.4c-255.3-18.4-434.7-213.9-434.7-476.1c0-163.3,73.6-294.4,255.3-455.4c878.5-784.2,2203.3-876.2,3201.4-223.1c195.5,126.5,1996.3,1904.3,2178,2148.1c667,894.6,678.5,2168.8,29.9,3079.5c-411.7,575-1046.4,970.6-1738.7,1083.2C7485,5019.1,6999.7,5012.2,6792.8,4975.4z"/>
									<path fill="currentColor" style="display:inline!important" d="M4021.4,1971.8c-340.4-27.6-667-117.3-961.3-264.5c-324.3-165.6-434.7-259.9-1391.4-1214.3C1146.6-26.8,668.2-519,606.1-601.7c-662.4-890-676.2-2173.4-32.2-3074.9c503.7-706.1,1285.6-1110.8,2148.1-1110.8c545.1,0,1007.3,138,1460.4,432.4c197.8,128.8,1189,1101.6,1258,1232.7c69,135.7,50.6,347.3-41.4,478.4c-135.7,193.2-409.4,269.1-607.2,167.9c-43.7-20.7-303.6-257.6-575-526.7c-308.2-301.3-542.8-515.2-625.6-561.2c-715.2-420.9-1690.4-243.8-2168.8,391c-236.9,315.1-340.4,623.3-340.4,1007.3c-2.3,296.7,39.1,466.9,181.7,759l108.1,218.5l899.3,903.8C3193.5,642.5,3333.8,764.4,3609.8,877.1c232.3,92,374.9,119.6,641.7,117.3c397.9-2.3,733.7-119.6,1014.2-356.5c273.7-227.7,296.7-239.2,492.2-239.2c154.1,0,186.3,6.9,266.8,62.1c140.3,98.9,202.4,207,211.6,374.9c11.5,179.4-34.5,278.3-213.9,450.8c-381.8,365.7-988.9,641.7-1494.9,676.2c-101.2,6.9-209.3,16.1-241.5,20.7C4253.7,1985.6,4136.4,1981,4021.4,1971.8z"/>
								</g>
							</g>
						</svg>
					</div>`)[0];
					//Event listener (onClick) for changing the channel.
					template.addEventListener('click',function(e){
						e.preventDefault();
						e.stopPropagation();
						//If something isn't working right then tell the user and return.
						if(this.toType(this.changeChannel)!=="function"||this.toType(this.currentChannel)!=="object"||this.toType(this.currentChannel.getChannelId)!=="function"||this.toType(this.currentChannel.getVoiceChannelId)!=="function"||this.toType(reactEles)!=="array"||this.toType(reactEles[index])!=="object"||this.toType(reactEles[index].guild_id)!=="string"||this.toType(reactEles[index].id)!=="string"){BdApi.showToast('Something went wrong, please check my GitHub for an issue report pertaining to this or make an issue report.',{type:"danger"});return;};
						//Handler to change channels.
						if(reactEles[index].id!==this.currentChannel.getChannelId()&&reactEles[index].id===this.currentChannel.getVoiceChannelId()||this.default.override===true){//Check if current channel is not the channel we are trying to access (No need to reaccess the same channel), make sure you are in the voice channel before changing to it, and last but not least check for override.
							this.changeChannel(reactEles[index].guild_id,reactEles[index].id);
						}else if(this.currentChannel.getVoiceChannelId()&&reactEles[index].id!==this.currentChannel.getVoiceChannelId()&&this.default.override===false){//Check if the user is in a voice channel, check if the current voice channel is not equal to the one being accessed, make sure override isn't being used.
							BdApi.showToast('You must be a member of the VC.',{type:"danger"});
						}else if(this.currentChannel.getVoiceChannelId()===null&&this.default.override===false){//Check if user is not in a voice channel and make sure override isn't being used.
							BdApi.showToast('You must enter a VC first.',{type:"danger"});
						}
						return;
					}.bind(this));
					//Event listener (onRightClick, contextmenu) for coping the channel link for users that do not have BBD/plugin.
					template.addEventListener('contextmenu',function(e){
						e.preventDefault();
						e.stopPropagation();
						//If something isn't working right then tell the user and return.
						if(this.toType(this.clipboard)!=="object"||this.toType(reactEles)!=="array"||this.toType(reactEles[index])!=="object"||this.toType(reactEles[index].guild_id)!=="string"||this.toType(reactEles[index].id)!=="string"){BdApi.showToast('Something went wrong, please check my GitHub for an issue report pertaining to this or make an issue report.',{type:"danger"});return;};
						//Handler
						this.clipboard.writeText(`<https://discordapp.com/channels/${reactEles[index].guild_id}/${reactEles[index].id}>`);
						BdApi.showToast('Channel link copied.',{type:"success"});
						return;
					}.bind(this));
					ele.prepend(template);//Add it as the first child so that everything else is in the same place as it usually is.
					this.cleanup.push(function(){template.remove();});//Add functions for removal of the elements for when the plugin is stopped.
				}
			}.bind(this));
		}
	}

	parseHTML(html){//Modified from: https://stackoverflow.com/a/35385518
		if(this.toType(html)==='string'&&/(<[^<>]+>)/g.test(html)){//Checks that it is a string and to see if it has anything resembling a tag.
			var template=document.createElement('template');
			template.innerHTML=html;//If trimmed it will never return a text node of whitespace as the result.
			//Instead it does not return text nodes /w that filter.
			return template&&template.content&&template.content.childNodes&&template.content.childNodes.length>0?this.HtmlCollectionToArray(template.content.childNodes).filter((v)=>{if(v.nodeName&&v.nodeName!=='#text')return v;}):null;//return null when there is no element(s) to be returned.
		}
		return null;
	}
	

	cleanArray(arr=[]){
		if(this.toType(arr)==='array')return arr.filter(v=>{if(v)return v;});
		return[];
	}

	toType(obj=undefined){//Faster and more percise than typeof, should be used for instances of defined variables/values. Modified from: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
		if(global&&obj===global)return"global";
		return({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	}

	findReactComponent(el=undefined){//Modified from: https://stackoverflow.com/a/48335220
		if(el&&Object.keys(el).includes('__reactInternalInstance$')){
			const fiberNode=el['__reactInternalInstance$'];
			return fiberNode&&fiberNode.return&&fiberNode.return.stateNode;
		}
		return null;
	}

	testFunction(func=undefined,bind=null){//Test a function, bind it if needed, and pass any other arguments this function gets as arguments for the function being tested.
		try{
			return func.apply(bind,Array.from(arguments).slice(2));//Remove the initial function and the bind then send the rest of the arguments to the function for the test.
		}catch(e){
			//console.log("Tested function returned error:",e);
			return false;
		}
	}

	HtmlCollectionToArray(context=document,selectors=[]){//Believe it or not, this seems to be up to 2x faster than jquery's .find() even when the returned array of elements is wrapped with jquery. More performance testing required.
		if(context&&selectors){
			if(selectors.constructor===String)selectors=[selectors];else if(selectors.constructor!==Array)selectors=[];//Cleanup selectors
			if(context.constructor===HTMLCollection||(NodeList&&context.constructor===NodeList)||(jQuery&&context instanceof jQuery))context=Array.from(context)/*.filter((ele)=>{if(ele instanceof Element)return ele;})*/;//If context is an html-collection/NodeList/jQuery-Collection then make context iterable and ensure it only contains elements.
			const isSelectorValid=function(s){try{document.createDocumentFragment().querySelector(s);return true;}catch{return false;}};//Check if css selector is valid, based off of: https://stackoverflow.com/a/42149818
			if(selectors.length===0){
				if(context.constructor===Array)return context;
			}else if(selectors.length===1){
				if(context.querySelector&&isSelectorValid(selectors[0]))return Array.from(context.querySelectorAll(selectors[0]));
			}else if(selectors.length>1){
				let arr=[];
				if(context.querySelector){
					for(let s of selectors){//Single parent element, grab child elements that match selectors.
						if(isSelectorValid(s))arr=arr.concat(Array.from(context.querySelectorAll(s)));//Seems to be the best way to turn into an array.
					}
				}else if(context.constructor===Array){
					for(let ele of context){//For each parent element, grab child elements that match selectors.
						for(let s of selectors){
							if(isSelectorValid(s))arr=arr.concat(Array.from(ele.querySelectorAll(s)));
						}
					}
				}
				if(arr.length>0)return arr/*[...new Set(arr)]*/;//Remove duplicates: https://stackoverflow.com/a/9229821
			}
		}
	return[];
	}

	/*channelIdToElement(id=undefined){//Much simpler, does effectively the same thing as "addElementPropToChannels".
		if(this.toType(id)==='string'){
			var ele=this.cleanArray(this.HtmlCollectionToArray(document.getElementsByClassName(this.classes.channels)[0].getElementsByClassName(this.classes.channelContainer)).map((v)=>{let react=this.ReactTools(v);if(react&&react.props&&react.props.channel&&react.props.channel.id&&react.props.channel.id===id)return v;}));
			if(this.toType(ele)==='array'&&ele.length===1&&ele[0]&&document.contains(ele[0]))return ele[0];
		}
		return null;
	}//*/

	/*objToArray(obj=undefined){
		if(obj&&this.toType(obj)==='object')return Object.keys(obj).map(function(key){return obj[key];});
		return[];
	}//*/
	
	/*getCurrentChannelsByType(type=[]){//Nothing for all channels even if they are not on the page, use this.type as a guide. Is ordered with a single type from top to bottom, but not with both. It could be done in order but it would have to look at the page instead of discord's internals.
		if(this.toType(type)==='string'||this.toType(type)==='number')type=[].concat(type);
		if(this.toType(type)==='array'&&this.getGuildChannels&&this.selectedGuildId){
			return this.objToArray(this.getGuildChannels(this.selectedGuildId())).flat().filter((v)=>{if(v&&v.channel&&v.channel.id&&v.channel.id!=='null'&&(type.length===0||(v.channel.hasOwnProperty('type')&&type.includes(v.channel.type))))return v;}).map((v)=>{return v.channel;});
		}
	}//*/

	/*addButtonsToElement(elements=undefined){//This can be done better; can just check all the elements with a map/filter instead of using the discord's internal module to distinguish which elements are voice channels. 
		if(this.toType(elements)!=='array')elements=this.HtmlCollectionToArray(elements);
		if(elements&&this.toType(elements)==='array'){
			let iconEles=elements.map((v)=>{return v.getElementsByClassName(this.classes.channelChildren)[0];}),
			reactEles=elements.map((v)=>{return this.ReactTools(v).props.channel});
			iconEles.forEach(function(ele,index){
				if(!ele.getElementsByClassName(this.getName())[0]){
					//Element to be added, TODO look for a method that is not jQuery.
					var template=$(`<div class="${this.getName()} iconItem-1-bXkn iconBase-2IHuka da-iconItem da-iconBase" role="button" aria-label="Enter Voice Channel"><svg name="Link" class="actionIcon-2Hi9ZG da-actionIcon" width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path fill="currentColor" d="M6792.8,4975.4c-326.6-59.8-678.5-202.4-977.4-397.9c-197.8-128.8-1189-1101.6-1258-1232.7c-36.8-71.3-43.7-121.9-36.8-234.6c11.5-177.1,87.4-301.3,236.9-388.7c126.5-75.9,328.9-85.1,450.8-23c43.7,23,296.7,255.3,561.2,515.2c266.8,262.2,535.9,510.6,600.3,549.7c289.8,181.7,650.9,271.4,998.2,250.7c269.1-18.4,411.7-55.2,653.2-172.5c556.6-269.1,894.6-816.5,894.6-1453.5c2.3-296.7-39.1-464.6-181.7-759L8628,1410.6L7692,479.2C6682.4-530.5,6638.7-567.2,6275.3-686.8c-163.3-55.2-220.8-62.1-506-62.1c-276-2.3-347.3,4.6-494.5,50.6c-241.5,75.9-446.2,188.6-630.2,349.6c-184,158.7-269.1,193.2-453.1,179.4c-255.3-18.4-434.7-213.9-434.7-476.1c0-163.3,73.6-294.4,255.3-455.4c878.5-784.2,2203.3-876.2,3201.4-223.1c195.5,126.5,1996.3,1904.3,2178,2148.1c667,894.6,678.5,2168.8,29.9,3079.5c-411.7,575-1046.4,970.6-1738.7,1083.2C7485,5019.1,6999.7,5012.2,6792.8,4975.4z"/><path fill="currentColor" d="M4021.4,1971.8c-340.4-27.6-667-117.3-961.3-264.5c-324.3-165.6-434.7-259.9-1391.4-1214.3C1146.6-26.8,668.2-519,606.1-601.7c-662.4-890-676.2-2173.4-32.2-3074.9c503.7-706.1,1285.6-1110.8,2148.1-1110.8c545.1,0,1007.3,138,1460.4,432.4c197.8,128.8,1189,1101.6,1258,1232.7c69,135.7,50.6,347.3-41.4,478.4c-135.7,193.2-409.4,269.1-607.2,167.9c-43.7-20.7-303.6-257.6-575-526.7c-308.2-301.3-542.8-515.2-625.6-561.2c-715.2-420.9-1690.4-243.8-2168.8,391c-236.9,315.1-340.4,623.3-340.4,1007.3c-2.3,296.7,39.1,466.9,181.7,759l108.1,218.5l899.3,903.8C3193.5,642.5,3333.8,764.4,3609.8,877.1c232.3,92,374.9,119.6,641.7,117.3c397.9-2.3,733.7-119.6,1014.2-356.5c273.7-227.7,296.7-239.2,492.2-239.2c154.1,0,186.3,6.9,266.8,62.1c140.3,98.9,202.4,207,211.6,374.9c11.5,179.4-34.5,278.3-213.9,450.8c-381.8,365.7-988.9,641.7-1494.9,676.2c-101.2,6.9-209.3,16.1-241.5,20.7C4253.7,1985.6,4136.4,1981,4021.4,1971.8z"/></g></g></svg></div>`)[0];
					//Event listener (onClick) for changing the channel.
					template.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(this.changeChannel&&reactEles&&reactEles[index]&&reactEles[index].guild_id&&reactEles[index].id)this.changeChannel(reactEles[index].guild_id,reactEles[index].id);}.bind(this));
					//Event listener (onRightClick, contextmenu) for coping the channel link for users that do not have BBD/plugin.
					template.addEventListener('contextmenu',function(e){e.preventDefault();e.stopPropagation();if(this.clipboard&&reactEles&&reactEles[index]&&reactEles[index].guild_id&&reactEles[index].id){this.clipboard.writeText(`https://discordapp.com/channels/${reactEles[index].guild_id}/${reactEles[index].id}`);BdApi.showToast('Channel link copied.',{type:"success"});return;}BdApi.showToast('Could not copy channel link.',{type:"danger"});return;}.bind(this));
					ele.prepend(template);//Add it as the first child so that everything else is in the same place as it usually is.
					this.cleanup.push(function(){template.remove();});//Add functions for removal of the elements for when the plugin is stopped.
				}
			}.bind(this));
		}
	}//*/

	/*getAllChannels(){
		return this.objToArray(this.channels());
	}//*/

	/*mergeDeep(target,...sources){//Can loop forever if it points to itself. Modified from: https://stackoverflow.com/a/34749873
		if(!sources.length)return target;
		const source=sources.shift();
		if(this.toType(target)==='object'&&this.toType(source)==='object'){
			for(const key in source){
				if(this.toType(source[key])==='object'){
					if(!target[key])Object.assign(target,{[key]:{}});
					this.mergeDeep(target[key],source[key]);
				}else Object.assign(target,{[key]:source[key]});
			}
		}
		return this.mergeDeep(target,...sources);
	}//*/

	/*addElementPropToChannels(){//Great idea, checks the id on the channels on the page to see if it exists and then resolves as it's element property.
		this.getAllChannels().forEach(function(channel){
			channel.element=function(){
				if(this.toType(channel.getGuildId)==='function'&&channel.getGuildId()===this.selectedGuildId()){
					var ele=this.cleanArray(this.HtmlCollectionToArray(document.getElementsByClassName(this.classes.channels)[0].getElementsByClassName(this.classes.channelContainer)).map((v)=>{let react=this.ReactTools(v);if(react&&react.props&&react.props.channel&&react.props.channel.id&&react.props.channel.id===channel.id)return v;}));
					if(this.toType(ele)==='array'&&ele.length===1&&ele[0]&&document.contains(ele[0]))return ele[0];
				}
				return null;
			}.bind(this);
		}.bind(this));
	}//*/

	/*findReactEventHandlers(el=undefined){
		if(el&&Object.keys(el).includes('__reactEventHandlers$')){
			const fiberNode=el['__reactEventHandlers$'];
			return fiberNode;
		}
		return null;
	}//*/

	/*elementsByInnerText(elements=[],text=undefined){//Causes issues.
		elements=this.HtmlCollectionToArray(elements);
		if(elements.length>0&&this.toType(text)==='string'){
			return elements.filter((v)=>{if(v.innerText===text)return v;});
		}
	}//*/

	/*addElementPropOfChannels(){//Huge pain and has limitations, such as there won't be an element property on each channel object which will be an issue later.
		var elements=this.HtmlCollectionToArray(document.querySelectorAll(`.${BdApi.getPlugin('VCButton').classes.channels} .${BdApi.getPlugin('VCButton').classes.channelContainer}`)),
		reactEle=elements.map((v)=>{let react=this.ReactTools(v);if(react&&react.props&&react.props.channel)return react.props.channel;});
		reactEle.forEach((v,index)=>{v['element']=function(){if(document.contains(elements[index]))return elements[index];return null;}});
		return reactEle;
	}//*/

	/*FindReact(dom){//Modified from: https://stackoverflow.com/a/39165137
		let key=Object.keys(dom).find(key=>key.startsWith("__reactInternalInstance$"));
		let internalInstance=dom[key];
		if(internalInstance==null)return null;
	
		if(internalInstance.return){// react 16+
			return internalInstance._debugOwner?internalInstance._debugOwner.stateNode:internalInstance.return.stateNode;
		}else{//react <16
			return internalInstance._currentElement._owner._instance;
		}
	}//*/

	/*xPath(sclass,text){
		return document.evaluate(`//div[text()="${text}" and contains(@class,"${sclass}")]`,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
	}//*/
}
