/* keyMap */
var keyMap = {
	fNextPath : "des:a.nextBtn",
	fPrevPath : "des:a.prevBtn",
	fHomePath : "des:a.homeBtn",
	fTplMnuPath : "tplMnu",
	fCorrectionBtnPath : "des:div.btnCorrection/chi:a.btnQuiz",
	fResetBtnPath : "des:div.btnReset/chi:a.btnQuiz",
	fKeyMap : {next:"key_right",
	           previous:"key_left",
			   menu:"f2",
			   reset:"key_esc",
			   correction:"key_enter",
			   home:"key_home"},

	init : function(){
		scCoLib.util.log("keyMap.init");
		var vKeyMap = this;
		//Init Listeners
		this.fKeyMap = keyMap.xProcessKeyMap(keyMap.fKeyMap);
		this.fListeners = {};
		this.fListeners['onKeyPress'] = new Array();
		if(scCoLib.isIE) document.body.attachEvent("onkeyup", function(){keyMap.sOnKeyUp(window.event,vKeyMap)});
		else window.addEventListener("keyup", function(pEvt){keyMap.sOnKeyUp(pEvt,vKeyMap)},true);
	},
	/** keyMap.xKeyMgr */
	xKeyMgr : function(pCharCode){
		//scCoLib.util.log("keyMap.xKeyMgr: "+pCharCode);
		this.xNotifyListeners("onKeyPress", pCharCode);
		var vAction;
		try{
			vAction = this.fKeyMap[String(pCharCode)];
		} catch(e){};
		if (!vAction) return false;
		switch(vAction){
			case "next":
				var vNextBtn = scPaLib.findNode(keyMap.fNextPath);
				/**
				xfireEvent est nécessaire dans le cas de rubis pour utiliser le lien recréé par le preloadMgr
				Impossible d'utiliser btn.click() - cela ne fonctionne pas
				Et dans ce cas, récupérer le href : window.location.href=vNextBtn.href ne sert à rien car il a été modifié en #
				*/
				if(vNextBtn) keyMap.xFireEvent(vNextBtn,"click");
				return false;
			case "previous":
				var vPrevBtn = scPaLib.findNode(keyMap.fPrevPath);
				if(vPrevBtn) keyMap.xFireEvent(vPrevBtn,"click");
				return false;
			case "menu":
				if(sc$(keyMap.fTplMnuPath)) mnuMgr.toggleMnu();
				return false;
			case "reset":
				var vResetBtn = scPaLib.findNode(keyMap.fResetBtnPath);
				if(vResetBtn) keyMap.xFireEvent(vResetBtn,"click");
				return false;
			case "correction":
				var vCorrectionBtn = scPaLib.findNode(keyMap.fCorrectionBtnPath);
				if(vCorrectionBtn) keyMap.xFireEvent(vCorrectionBtn,"click");
				return false;
			case "home":
				var vHomeBtn = scPaLib.findNode(keyMap.fHomePath);
				if(vHomeBtn) keyMap.xFireEvent(vHomeBtn,"click");
				return false;
		}
	},
	/** keyMap.xNotifyListeners - calls all the listeners of a given type. */
	xNotifyListeners : function(pType,pRes) {
		//scCoLib.util.log("keyMap.xNotifyListeners: "+pType);
		var vListener = this.fListeners[pType];
		for (i in vListener) {
			try {
				vListener[i](pRes);
			} catch(e) {scCoLib.util.logError("ERROR keyMap.xNotifyListeners",e);}
		}
	},
	xProcessKeyMap: function(pMap) {
		var i, vAction, vKeys, vKey;
		var vMap = {};
		var xKeyCode = function (pStr){
			if (!pStr || pStr.length == 0) return 0;
			switch(pStr){
				case "key_right" : return 39;
				case "key_left" : return 37;
				case "f2" : return 113;
				case "key_esc" : return 27;
				case "key_enter" : return 13;
				case "key_home" : return 36;
				default: return pStr.toUpperCase().charCodeAt(0);
			}
		}
		for (vAction in pMap) {
			vKeys = pMap[vAction];
			if (typeof vKeys == "object"){
				for (i = 0; i < vKeys.length; i++){
					vMap[String(xKeyCode(vKeys[i]))] = vAction;
				}
			} else vMap[String(xKeyCode(vKeys))] = vAction;
		}
		return vMap;
	},
	xFireEvent : function(pElt,pEvt) {
		if(document.createEvent) {
			var evElt = document.createEvent('MouseEvents');
			evElt.initEvent( pEvt, true, false );
			pElt.dispatchEvent( evElt );
		} else if(document.createEventObject) {
			var evElt = document.createEventObject();
			pElt.fireEvent('on'+pEvt, evElt);
		}
	},
	sOnKeyUp : function(pEvt, pMgr){
		var vEvt = pEvt || window.event;
		var vCharCode = vEvt.which || vEvt.keyCode;
		return pMgr.xKeyMgr(vCharCode);
	},
	
	loadSortKey : "zChrono"
}