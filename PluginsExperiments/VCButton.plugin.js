//META{"name":"VCButton","source":"https://github.com/CompletelyUnbelievable/BDAddons/blob/master/PluginsExperiments/VCButton.plugin.js","website":"https://git.io/vhWjm"}*//

class VCButton{

	getName(){return"VCButton";}

	getDescription(){return"Adds a button to voice channels that make it easier to video share on any server without the discord experiments plugin.";}

	getVersion(){return"1.6";}

	getAuthor(){return"CompletelyUnbelievable";}

	constructor(){
		this.changeChannel=BdApi.findModuleByProps("selectChannel","selectVoiceChannel").selectChannel;//function(guildId,channelId,?messageId) *strings*
		this.type=BdApi.findModuleByProps("ChannelTypes").ChannelTypes||{GUILD_TEXT:0,DM:1,GUILD_VOICE:2,GROUP_DM:3,GUILD_CATEGORY:4,GUILD_NEWS:5,GUILD_STORE:6,GUILD_LFG_LISTINGS:7};
		this.classes={channels:"container-PNkimc",channelName:"name-3_Dsmg",channelContainer:window.ZLibrary?window.ZLibrary.DiscordClasses.ChannelList.containerDefault.first:"containerDefault-1ZnADq",channelChildren:"children-Bmpf2Q"};
		this.ReactTools=window.ZLibrary&&window.ZLibrary.ReactTools&&window.ZLibrary.ReactTools.getOwnerInstance&&this.testFunction(window.ZLibrary.ReactTools.getOwnerInstance,window.ZLibrary.ReactTools,document.body)!==false?window.ZLibrary.ReactTools.getOwnerInstance.bind(window.ZLibrary.ReactTools):this.findReactComponent;
		this.currentChannel=BdApi.findModuleByProps("getChannelId","getVoiceChannelId");
		this.clipboard=window.require?require('electron').remote.clipboard:'';
	}

	start(){
		if(window.ZLibrary)window.ZLibrary.PluginUpdater.checkForUpdate(this.getName(),this.getVersion(),'https://raw.githubusercontent.com/CompletelyUnbelievable/BDAddons/master/PluginsExperiments/VCButton.plugin.js');
		this.promises = {state:{cancelled: false}, cancel(){this.state.cancelled = true;}};
		this.patches = [];
		this.patchVC(this.promises.state);
	}
	
	async patchVC(promiseState){
		const VoiceChannel = await ZLibrary.ReactComponents.getComponentByName("VoiceChannel", ZLibrary.DiscordSelectors.ChannelList.containerDefault);
        if(promiseState.cancelled) return;
        let patch = ZLibrary.Patcher.after(this, VoiceChannel.component.prototype, "render", (thisObject, _, returnValue) => {
			if(!thisObject.props.connected) return;
			let el = ZLibrary.DiscordModules.React.createElement("div", {
				class: `${this.getName()} iconItem-1-bXkn iconBase-2IHuka da-iconItem da-iconBase`,
				role: "button",
				"aria-label": "Enter Voice Channel",
				onClick: (e)=>{
					e.preventDefault();
					e.stopPropagation();
					this.changeChannel(thisObject.props.guild.id, thisObject.props.channel.id);
				},
				onContextMenu: (e)=>{
					e.preventDefault();
					e.stopPropagation();
					this.clipboard.writeText(`<https://discordapp.com/channels/${thisObject.props.guild.id}/${thisObject.props.channel.id}>`);
					BdApi.showToast('Channel link copied.',{type:"success"});
				}
			}, ZLibrary.DiscordModules.React.createElement("svg", {
				name: "Link",
				class: "actionIcon-2Hi9ZG da-actionIcon",
				style: {
					display: "block !important",
				},
				width: "16",
				height: "16",
				version: "1.1",
				xmlns: "http://www.w3.org/2000/svg",
				"xmlns:xlink": "http://www.w3.org/1999/xlink",
				x: "0px",
				y: "0px",
				viewBox: "0 0 1000 1000",
				"enable-background": "new 0 0 1000 1000",
				"xml:space": "preserve"
			}, ZLibrary.DiscordModules.React.createElement("g", {
				style: {
					display: "inline !important"
				}
			}, ZLibrary.DiscordModules.React.createElement("g", {
				style: {
					display: "inline !important"
				},
				transform: "translate(0,511) scale(0.1,-0.1)"
			}, ZLibrary.DiscordModules.React.createElement("path", {
				fill: "currentColor",
				style: {
					display: "inline !important"
				},
				d: "M6792.8,4975.4c-326.6-59.8-678.5-202.4-977.4-397.9c-197.8-128.8-1189-1101.6-1258-1232.7c-36.8-71.3-43.7-121.9-36.8-234.6c11.5-177.1,87.4-301.3,236.9-388.7c126.5-75.9,328.9-85.1,450.8-23c43.7,23,296.7,255.3,561.2,515.2c266.8,262.2,535.9,510.6,600.3,549.7c289.8,181.7,650.9,271.4,998.2,250.7c269.1-18.4,411.7-55.2,653.2-172.5c556.6-269.1,894.6-816.5,894.6-1453.5c2.3-296.7-39.1-464.6-181.7-759L8628,1410.6L7692,479.2C6682.4-530.5,6638.7-567.2,6275.3-686.8c-163.3-55.2-220.8-62.1-506-62.1c-276-2.3-347.3,4.6-494.5,50.6c-241.5,75.9-446.2,188.6-630.2,349.6c-184,158.7-269.1,193.2-453.1,179.4c-255.3-18.4-434.7-213.9-434.7-476.1c0-163.3,73.6-294.4,255.3-455.4c878.5-784.2,2203.3-876.2,3201.4-223.1c195.5,126.5,1996.3,1904.3,2178,2148.1c667,894.6,678.5,2168.8,29.9,3079.5c-411.7,575-1046.4,970.6-1738.7,1083.2C7485,5019.1,6999.7,5012.2,6792.8,4975.4z"
			}), ZLibrary.DiscordModules.React.createElement("path", {
				fill: "currentColor",
				style: {
					display: "inline !important"
				},
				d: "M4021.4,1971.8c-340.4-27.6-667-117.3-961.3-264.5c-324.3-165.6-434.7-259.9-1391.4-1214.3C1146.6-26.8,668.2-519,606.1-601.7c-662.4-890-676.2-2173.4-32.2-3074.9c503.7-706.1,1285.6-1110.8,2148.1-1110.8c545.1,0,1007.3,138,1460.4,432.4c197.8,128.8,1189,1101.6,1258,1232.7c69,135.7,50.6,347.3-41.4,478.4c-135.7,193.2-409.4,269.1-607.2,167.9c-43.7-20.7-303.6-257.6-575-526.7c-308.2-301.3-542.8-515.2-625.6-561.2c-715.2-420.9-1690.4-243.8-2168.8,391c-236.9,315.1-340.4,623.3-340.4,1007.3c-2.3,296.7,39.1,466.9,181.7,759l108.1,218.5l899.3,903.8C3193.5,642.5,3333.8,764.4,3609.8,877.1c232.3,92,374.9,119.6,641.7,117.3c397.9-2.3,733.7-119.6,1014.2-356.5c273.7-227.7,296.7-239.2,492.2-239.2c154.1,0,186.3,6.9,266.8,62.1c140.3,98.9,202.4,207,211.6,374.9c11.5,179.4-34.5,278.3-213.9,450.8c-381.8,365.7-988.9,641.7-1494.9,676.2c-101.2,6.9-209.3,16.1-241.5,20.7C4253.7,1985.6,4136.4,1981,4021.4,1971.8z"
			})))));
			returnValue.props.children[0].props.children.unshift(el);
		});
		this.patches.push(patch);
		VoiceChannel.forceUpdateAll();
	}

	stop(){
        this.promises.cancel();
		this.patches.forEach(func=>func());
	}

	testFunction(func=undefined,bind=null){//Test a function, bind it if needed, and pass any other arguments this function gets as arguments for the function being tested.
		try{
			return func.apply(bind,Array.from(arguments).slice(2));//Remove the initial function and the bind then send the rest of the arguments to the function for the test.
		}catch(e){
			//console.log("Tested function returned error:",e);
			return false;
		}
	}
}
