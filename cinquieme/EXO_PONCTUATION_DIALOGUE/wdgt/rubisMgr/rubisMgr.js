/* rubisMgr */
var rubisMgr = {
	fMainNav : "ide:main_nav",
	fQuizValidBtn : "des:.quizBtns",
	fContentPath : "ide:tplCo",
	
	init : function(){
		scCoLib.util.log("rubisMgr.init");
		this.fMainNavNode = scPaLib.findNode(this.fMainNav);
		this.fQuizValidBtnNode = scPaLib.findNode(this.fQuizValidBtn);
		this.fContent = scPaLib.findNode(this.fContentPath);
		scOnLoads[scOnLoads.length] = this;
	},
	onLoad : function(){
		scCoLib.util.log("rubisMgr.onLoad");
		//Gère le placement vertical du menu sur la page d'accueil et les pages de validation
		if (this.fMainNavNode) this.fMainNavNode.style.marginTop = - this.fMainNavNode.offsetHeight/2+'px';
		//Fade QuizValid et déplacement de tplCo
		if (this.fQuizValidBtnNode) {
			this.fContent.style.top = "70px";
			this.fQuizValidBtnNode.onmouseover = function(){new rubisMgr.FadeEltTask(this,1,null,null,null)};
			this.fQuizValidBtnNode.onmouseout = function(){new rubisMgr.FadeEltTask(this,.2,null,null,null)};
		}
	},
	loadSortKey : "zRubisMgr"
}
/* === Generic tasks ======================================================== */
/** rubisMgr.FadeEltTask : TiLib task that fades a given element in or out.
 * @param pElt element to fade.
 * @param pDir fade direction : 0=out, 1=in.
 * @param pStartFunc optionnal function that will be executed at the start of the task.
 * @param pEndFunc optionnal function that will be executed at the end of the task.
 * @param pInstant optionnal parameter if true no animation. */
rubisMgr.FadeEltTask = function(pElt,pDir,pStartFunc,pEndFunc,pInstant){
	//scCoLib.util.log("New scHPS.FadeEltTask");
	this.fRate = new Array();
	this.fRate[.5] = [.9, .8, .7, .6, .5];
	this.fRate[1] = [.5, .6, .7, .8, .9];
	try{
		this.fElt = pElt;
		this.fDir = (pDir >= 1 ? 1 : .5);
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
	}catch(e){scCoLib.util.log("ERROR rubisMgr.FadeEltTask : "+e);}
}
rubisMgr.FadeEltTask.prototype = {
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
		var vDir = (pDir >= 1 ? 1 : .5)
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