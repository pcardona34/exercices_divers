/* Chrono */
var chrono = {
	fTotalTime : 1*30*60*1000, //Default val - 30 minutes
	fFra : "ide:tplFraPge",
	fNxtSibling : "ide:tplTop",
	fMainCo : "ide:main_co",
	fResultPage : "des:.result_page ",
	fSolPage : "des:.evalSol",
	fIsChrono : null,
	fTimer : null,
	fAlert : null,
	fStartTime : null,
	fRemainingTime : new Date(),

	init : function(){
		if (this.fIsChrono && this.fIsChrono == "yes") {
			var vPassedTime = scServices.suspendDataStorage ? scServices.suspendDataStorage.getVal(["time"]) || 0 : 0;
			//this.fStartTime est réinitialisé si l'éval est réinitialisé
			this.fStartTime = new Date().getTime() - vPassedTime;
			this.fFraNode = scPaLib.findNode(this.fFra);
			this.fMainCoNode = scPaLib.findNode(this.fMainCo);
			this.fResultPageNode = scPaLib.findNode(this.fResultPage);
			this.fSolPageNode = scPaLib.findNode(this.fSolPage);
			this.fNxtSiblingNode = scPaLib.findNode(this.fNxtSibling);
			this.fRemainingTime.setTime(this.fTotalTime - vPassedTime);
			if(this.fFraNode) {
				if(!(this.fResultPageNode || this.fSolPageNode)) {
					this.fChronoNode = this.xAddElt("div",this.fFraNode,"tplChrono",null,null,this.fNxtSiblingNode);
					this.fAlertNode = this.xAddElt("div",this.fFraNode,"tplAlert",null,null,this.fChronoNode);
					this.chronoExec();
					this.fTimer = window.setInterval("chrono.chronoExec()", 200);
					//Gère le timer si on revient sur la page d'accueil afin que le temps proposé corresponde toujours au temps total et non au temps restant
					this.fAlert = window.setTimeout("chrono.chronoAlert()", (this.fTotalTime-this.fRemainingTime<=this.fTotalTime/3 ? this.fTotalTime/3-(this.fTotalTime-this.fRemainingTime) : (this.fRemainingTime>this.fTotalTime/3 ? this.fRemainingTime-this.fTotalTime/3 : this.fRemainingTime)));
				} else {
					//Arrêt du chrono si on est sur la page de résultat ...
					this.fChronoNode = this.xAddElt("div",this.fFraNode,"tplChrono",null,null,this.fNxtSiblingNode);
					this.chronoExec();
					window.clearInterval(this.fTimer);
					window.clearTimeout(this.fAlert);
				}
			}
			else {
				//Affichage du temps sur la page d'accueil
				if(vPassedTime == 0) {
					this.fTimeoutStartNode = this.xAddElt("div",this.fMainCoNode,"tplTimeout",null,null,null);
					this.fTimeoutStartNode.innerHTML = 'Vous avez ' + this.xFormatTime(this.fRemainingTime, true) + ' pour réaliser ce test';
				} else {
					this.fTimeoutRestartNode = this.xAddElt("div",this.fMainCoNode,"tplTimeout",null,null,null);
					if(this.fRemainingTime > 0) this.fTimeoutRestartNode.innerHTML = 'Il reste ' + this.xFormatTime(this.fRemainingTime, true) + ' pour terminer ce test';
					else this.fTimeoutRestartNode.innerHTML = 'Le temps pour réaliser ce test est écoulé ...';
				}
			}
		}
		scCoLib.util.log("chrono.init");
	},
	chronoExec : function() {
		var vTime = new Date();
		var vPassedTime = vTime.getTime() - this.fStartTime;
		if(scServices.suspendDataStorage) scServices.suspendDataStorage.setVal(["time"], vPassedTime);
		this.fRemainingTime.setTime(this.fTotalTime - vPassedTime);
		if(this.fRemainingTime.getTime() > 0) {
			if (this.fChronoNode) this.fChronoNode.innerHTML = this.xFormatTime(this.fRemainingTime);
		} else window.clearInterval(this.fTimer);
	},
	chronoAlert : function() {
		if(this.fRemainingTime.getTime() > 0) {
			if(this.fRemainingTime.getTime() >= 200) this.fAlertNode.innerHTML = '<div class="chronoAlertDeco"></div><span>Il reste ' + this.xFormatTime(this.fRemainingTime, true) + ' pour terminer ce test</span>';
			else this.fAlertNode.innerHTML = '<div class="chronoAlertDeco"></div><span>Le temps disponible est écoulé. Vous devriez avoir fini le test !</span>';
			//Fade du div
			try {
				new chrono.FadeEltTask(this.fAlertNode,1,null,null,null);
			} catch(e) {scCoLib.util.logError("ERROR chrono.chronoAlert",e);}
			window.clearTimeout(this.fAlert);
			this.fAlert = window.setTimeout("chrono.chronoAlert()", this.fTotalTime/3);
			this.fHideAlert = setTimeout("chrono.hideAlertNode()",10000);
		} else window.clearTimeout(this.fAlert);
	},
	hideAlertNode : function() {
		//Fade du div
		try {
			new chrono.FadeEltTask(this.fAlertNode,0,null,null,null);
		} catch(e) {scCoLib.util.logError("ERROR chrono.chronoAlert",e);}
		window.clearTimeout(this.fHideAlert);
	},
/** === Tools ============================================================== */
	xFormatTime : function(pTime,pFormat) {
		var vH = pTime.getUTCHours();
		var vM = pTime.getUTCMinutes();
		var vS = pTime.getUTCSeconds();
		if(!pFormat) var vStr = (vH > 0 ? (vH > 9 ? "" : "0") + vH + ":" : "") + (vM > 9 ? "" : "0") + vM + (vS > 9 ? ":" : ":0") + vS;
		else var vStr = (vH > 0 ? (vH > 9 ? "" : "0") + vH + " heures " : "") + (vM > 0 ? (vM > 9 ? "" : "0") + vM + " minutes " : "") + (vS > 0 ? (vS > 9 ? "" : "0") + vS + " secondes " : "");
		return(vStr);
	},
	xAddElt : function(pName, pParent, pClassName, pNoDisplay, pHidden, pNxtSib){
		var vElt;
		if(scCoLib.isIE && pName.toLowerCase() == "iframe") {
			var vEltHolder = pParent.ownerDocument.createElement("div");
			if (pNxtSib) pParent.insertBefore(vEltHolder,pNxtSib)
			else pParent.appendChild(vEltHolder);
			vEltHolder.innerHTML = "<iframe scrolling='no' frameborder='0' allowtransparency='true'></iframe>";
			vElt = vEltHolder.firstChild;
		} else {
			vElt = pParent.ownerDocument.createElement(pName);
			if (pNxtSib) pParent.insertBefore(vElt,pNxtSib)
			else pParent.appendChild(vElt);
		}
		if (pClassName) vElt.className = pClassName;
		if (pNoDisplay) vElt.style.display = "none";
		if (pHidden) vElt.style.visibility = "hidden";
		return vElt;
	},
	loadSortKey : "zChrono"
}
/* === Generic tasks ======================================================== */
/** chrono.FadeEltTask : TiLib task that fades a given element in or out.
 * @param pElt element to fade.
 * @param pDir fade direction : 0=out, 1=in.
 * @param pStartFunc optionnal function that will be executed at the start of the task.
 * @param pEndFunc optionnal function that will be executed at the end of the task.
 * @param pInstant optionnal parameter if true no animation. */
chrono.FadeEltTask = function(pElt,pDir,pStartFunc,pEndFunc,pInstant){
	//scCoLib.util.log("New scHPS.FadeEltTask");
	this.fRate = new Array();
	this.fRate[0] = [.9, .85, .8, .7, .6, .5, .4, .3, .2, .15, .1];
	this.fRate[1] = [.1, .15, .2, .3, .4, .5, .6, .7, .8, .85, .9];
	try{
		this.fElt = pElt;
		this.fDir = (pDir >= 1 ? 1 : 0);
		this.fMgr = {fEnableEffects:"true"};
		this.fStartFunc = pStartFunc || function(){};
		this.fEndFunc = pEndFunc || function(){};
		if (pInstant || !this.fMgr.fEnableEffects) {
			this.terminate();
			return;
		}
		if (this.fElt.fFadeTask) {
			this.fElt.fFadeTask.changeDir(this.fDir);
		} else {
			this.fStartFunc();
			if(scCoLib.isIE) this.fElt.style.filter = 1-this.fDir==1 ? "progid:DXImageTransform.Microsoft.Alpha(opacity=100)" : "progid:DXImageTransform.Microsoft.Alpha(opacity=0)";
			else this.fElt.style.opacity = 1-this.fDir;
			this.fElt.style.visibility = "";
			this.fEndTime = ( Date.now  ? Date.now() : new Date().getTime() ) + 100;
			this.fIdx = -1;
			this.fElt.fFadeTask = this;
			scTiLib.addTaskNow(this);
		}
	}catch(e){scCoLib.util.log("ERROR chrono.FadeEltTask : "+e);}
}
chrono.FadeEltTask.prototype = {
	/** FadeEltTask.execTask */
	execTask : function(){
		while(this.fEndTime < (Date.now ? Date.now() : new Date().getTime()) && this.fIdx < this.fRate[this.fDir].length) {
			this.fIdx++;
			this.fEndTime += 100;
		}
		this.fIdx++;
		this.fEndTime += 100;
		if(this.fIdx >= this.fRate[this.fDir].length) {
			if(scCoLib.isIE) this.fElt.style.filter = "";
			else this.fElt.style.opacity = this.fDir;
			if(this.fDir == 0) this.fElt.style.visibility = "hidden";
			else this.fElt.style.visibility = "";
			this.fEndFunc();
			this.fElt.fFadeTask = null;
			return false;
		}
		if(scCoLib.isIE) this.fElt.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.fRate[this.fDir][this.fIdx]*100;
		else this.fElt.style.opacity = this.fRate[this.fDir][this.fIdx];
		return true;
	},
	/** FadeEltTask.execchangeDirTask */
	changeDir : function(pDir){
		var vDir = (pDir >= 1 ? 1 : 0)
		if (vDir != this.fDir) this.fIdx = this.fRate[this.fDir].length - this.fIdx - 1;
		this.fDir = vDir;
	},
	/** FadeEltTask.terminate */
	terminate : function(){
		// 	scCoLib.util.log("scHPS.FadeEltTask.terminate");
		this.fIdx = this.fRate[this.fDir].length;
		this.execTask();
	}
}