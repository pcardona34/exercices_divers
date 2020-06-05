/* Emeraude mnu manager */
var mnuMgr = {
	fTplMnuPath : "ide:tplMnu",
	fMapBtnPath : "des:a.mapBtn",
	fTplMnuTitle :["Cacher le plan (F2)","Voir le plan (F2)"],

	init : function(){
		// Gestion de affichage du menu
		this.fTplMnu = scPaLib.findNode(this.fTplMnuPath);
		this.fMapBtn = scPaLib.findNode(this.fMapBtnPath);
		if (this.fMapBtn && this.fTplMnu){
			this.fMapBtn.style.display = "block";
			this.fClassMapBtn = this.fMapBtn.className;
			this.fTplMnu.style.visibility = "hidden";
		}
		//if(document.cookie.indexOf("tplMnuOpen=true") >= 0) {
			//this.fTplMnu.style.visibility = "";
			//this.fMapBtn.title = this.fTplMnuTitle[0];
		//} else {
			//this.fTplMnu.style.visibility = "hidden";
			//this.fMapBtn.title = this.fTplMnuTitle[1];
		//}
		scOnLoads[scOnLoads.length] = this;
	},
	onLoad : function(){
		scCoLib.util.log("mnuMgr.onLoad");
	},
	toggleMnu : function(){
		scCoLib.util.log("mnuMgr.toggleMnu");
		//this.fTplMnuMode = (this.fTplMnuMode == 0 ? 1 : 0);
		//Ce qui est commenté permet de garder le menu en place quand on recharge la page sauf la ligne au dessus qui est un test
		//document.cookie = "quizModeSteped=" + (tplMgr.fQuizSteped == 0);
		if (this.fMapBtn && this.fTplMnu) {
			this.fMapBtn.className = this.fClassMapBtn + (this.fTplMnu.style.visibility == "hidden" ? " mapBtnOn" : "");
			if (this.fTplMnu.style.visibility == "hidden") {
				this.fTplMnu.style.visibility = "";
				this.fMapBtn.title = this.fTplMnuTitle[0];
				//document.cookie = "tplMnuOpen=true";
			} else {
				this.fTplMnu.style.visibility = "hidden";
				this.fMapBtn.title = this.fTplMnuTitle[1];
				//document.cookie = "tplMnuOpen=false";
			}
		}
	},
	loadSortKey : "zMnuMgr"
}

