scServices.preloadMgr = scOnLoads[scOnLoads.length] = {

	fMainFraPath : "ide:mainFrame",
	fBtnPaths : [],
	onLoad : function() {
		scCoLib.util.log("preloadMgr.onLoad");
		this.fCurFra = scPaLib.findNode(this.fMainFraPath);
		this.fFraId = this.fCurFra.id;
		this.xInitFra(this.fCurFra);
	},
	addBtnPath : function (pPath){
		this.fBtnPaths.push(pPath);
	},
	setMainFraPath : function (pPath){
		this.fMainFraPath = pPath;
	},
	goTo : function (pUrl){
		scCoLib.util.log("preloadMgr.goTo: "+pUrl);
		if (!pUrl || pUrl.length==0) return;
		if (this.fCurFra.fNavStarted) return;
		this.fCurFra.fNavStarted = true;
		this.fNxtFra = this.xAddFra();
		this.fNxtFra.src = pUrl;
		return false;
	},
	reload : function (){
		this.goTo(this.fCurFra.src);
	},
	// this == iframe
	sOnLoadPage : function (){
		try{
			if(scCoLib.isIE && this.readyState != "complete") return;
			scServices.preloadMgr.xInitPage(this)		
		} catch(e){scCoLib.util.logError("ERROR error loading page.", e);}
	},
	xInitPage : function (pFra){
		var vPgeDoc = pFra.contentWindow.document;
		scCoLib.util.log("preloadMgr.xInitPage: "+vPgeDoc.title);
		var vMgr = scServices.preloadMgr;
		if (vMgr.fNxtFra) {
			vMgr.fNxtFra.style.visibility="";
			vMgr.fCurFra.parentNode.removeChild(vMgr.fCurFra);
			vMgr.fCurFra = vMgr.fNxtFra;
			vMgr.fNxtFra = null;
			vMgr.fCurFra.id = vMgr.fFraId;
		}
		for(var i in vMgr.fBtnPaths) {
			var vBtns = scPaLib.findNodes(vMgr.fBtnPaths[i],vPgeDoc);
			for (var j in vBtns) vMgr.xInitBtn(vBtns[j]);
		}
		var vSubScDynUiMgr  = pFra.contentWindow.scDynUiMgr;
		if (vSubScDynUiMgr) vSubScDynUiMgr.subWindow.addOnLoadListener(vMgr.xInitPage);
		if(scCoLib.isIE) pFra.contentWindow.focus();
		else pFra.focus();
	},
	xInitBtn : function (pBtn){
		var vUrl = pBtn.href;
		pBtn.onclick = function() {return scServices.preloadMgr.goTo(vUrl)}
		pBtn.href = "#";
	},
	xAddFra : function (){
		var vFra;
		if(scCoLib.isIE) {
			//BUG IE : impossible de masquer les bordures si on ajoute l'iframe via l'API DOM.
			var vFrmHolder = document.createElement("div");
			document.body.appendChild(vFrmHolder);
			vFrmHolder.innerHTML = "<iframe scrolling='no' frameborder='0'></iframe>";
			vFra = vFrmHolder.firstChild;
			document.body.appendChild(vFra);
			document.body.removeChild(vFrmHolder);
		} else {
			vFra = document.createElement("iframe");
			vFra.setAttribute("frameborder","0");
			document.body.appendChild(vFra);
		}
		vFra.style.width = "100%";
		vFra.style.height = "100%";
		vFra.style.visible = "hidden";
		this.xInitFra(vFra);
		return vFra;
	},
	xInitFra : function (pFra){
		if(scCoLib.isIE) pFra.onreadystatechange = scServices.preloadMgr.sOnLoadPage;
		else pFra.onload = scServices.preloadMgr.sOnLoadPage;
	},
	loadSortKey : "zPreloadMgr"
}
