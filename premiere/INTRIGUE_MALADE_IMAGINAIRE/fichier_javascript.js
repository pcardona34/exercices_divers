/* RECOMMENCER */
function more(){self.location.href = self.location.href;}

var i=0; var tm;

var RPC=[]; // éléments dans l'ordre correct avec délimiteurs éventuels
var RC=[]; // éléments séparés dans l'ordre correct
var RM=[]; // éléments séparés mélangés

RPC[0]="Argan, veuf, s’est remarié avec Béline.|Angélique a rencontré Cléante, qui doit la demander en mariage.|Argan veut marier sa fille à T. Diafoirus, neveu de son médecin.|Argan annonce à Angélique qu’on l’a demandée en mariage.|Comprenant sa méprise, Angélique refuse d’épouser T. Diafoirus.|Argan menace Angélique du couvent.|Argan veut donner son héritage à Béline, au détriment de ses enfants.|Le notaire, convié par Béline, conseille Argan.|Toinette promet à Angélique de l’aider.|Intermède musical avec Polichinelle.";
RPC[1]="Cléante s’introduit chez Argante en faux maître de musique.|Visite des Diafoirus : compliments de Thomas.|Angélique profite de la leçon de musique pour rassurer Cléante.|Agacé, Argan chasse Cléante.|Angélique repousse les avances de T. Diafoirus.|Argan menace à nouveau Angélique du couvent.|Béline dénonce la nouvelle entrevue d’Angélique avec Cléante.|Argan menace Louison afin d’obtenir son témoignage.|Visite de Béralde qui propose à son frère un divertissement.|Intermède avec un ballet égyptien et des singes dressés.";
RPC[2]="Béralde promet d’apporter son soutien à Toinette pour aider Angélique.|Béralde tente de raisonner Argan au sujet du mariage, puis critique la médecine.|Béralde empêche l’apothicaire d’administrer le lavement prescrit.|Contrarié, M. Purgon maudit Argan et renonce à doter son neveu.|Toinette annonce à Argan, désespéré, la venue d’un nouveau médecin.|Déguisée en médecin, Toinette dénigre les traitements de M. Purgon.|Béralde intervient à nouveau en faveur d’Angélique, mais Argan s’obstine à la mettre au couvent.|Béralde soupçonne Béline d’agir contre sa belle-fille.|Toinette suggère à Argan de contrefaire le mort afin de connaître les sentiments de Béline.|L’épouse cupide est confondue par le stratagème de Toinette.";
RPC[3]="Toinette suggère à Argan de contrefaire le mort afin de connaître les sentiments d’Angélique.|Angélique témoigne une réelle affliction.|Cléante se joint à la tristesse d’Angélique.|Angélique veut renoncer à épouser Cléante.|Argan accepte le mariage à la condition que Cléante devienne médecin.|Béralde suggère à Argan de devenir lui-même médecin.|Intermède : mascarade en pseudo-latin pour introniser Argan en médecin.";

RC[0] = new Array("Argan, veuf, s’est remarié avec Béline.","Angélique a rencontré Cléante, qui doit la demander en mariage.","Argan veut marier sa fille à T. Diafoirus, neveu de son médecin.","Argan annonce à Angélique qu’on l’a demandée en mariage.","Comprenant sa méprise, Angélique refuse d’épouser T. Diafoirus.","Argan menace Angélique du couvent.","Argan veut donner son héritage à Béline, au détriment de ses enfants.","Le notaire, convié par Béline, conseille Argan.","Toinette promet à Angélique de l’aider.","Intermède musical avec Polichinelle.");
RC[1] = new Array("Cléante s’introduit chez Argante en faux maître de musique.","Visite des Diafoirus : compliments de Thomas.","Angélique profite de la leçon de musique pour rassurer Cléante.","Agacé, Argan chasse Cléante.","Angélique repousse les avances de T. Diafoirus.","Argan menace à nouveau Angélique du couvent.","Béline dénonce la nouvelle entrevue d’Angélique avec Cléante.","Argan menace Louison afin d’obtenir son témoignage.","Visite de Béralde qui propose à son frère un divertissement.","Intermède avec un ballet égyptien et des singes dressés.");
RC[2] = new Array("Béralde promet d’apporter son soutien à Toinette pour aider Angélique.","Béralde tente de raisonner Argan au sujet du mariage, puis critique la médecine.","Béralde empêche l’apothicaire d’administrer le lavement prescrit.","Contrarié, M. Purgon maudit Argan et renonce à doter son neveu.","Toinette annonce à Argan, désespéré, la venue d’un nouveau médecin.","Déguisée en médecin, Toinette dénigre les traitements de M. Purgon.","Béralde intervient à nouveau en faveur d’Angélique, mais Argan s’obstine à la mettre au couvent.","Béralde soupçonne Béline d’agir contre sa belle-fille.","Toinette suggère à Argan de contrefaire le mort afin de connaître les sentiments de Béline.","L’épouse cupide est confondue par le stratagème de Toinette.");
RC[3] = new Array("Toinette suggère à Argan de contrefaire le mort afin de connaître les sentiments d’Angélique.","Angélique témoigne une réelle affliction.","Cléante se joint à la tristesse d’Angélique.","Angélique veut renoncer à épouser Cléante.","Argan accepte le mariage à la condition que Cléante devienne médecin.","Béralde suggère à Argan de devenir lui-même médecin.","Intermède : mascarade en pseudo-latin pour introniser Argan en médecin.");

RM[0]= new Array("Comprenant sa méprise, Angélique refuse d’épouser T. Diafoirus.","Argan annonce à Angélique qu’on l’a demandée en mariage.","Intermède musical avec Polichinelle.","Argan veut donner son héritage à Béline, au détriment de ses enfants.","Le notaire, convié par Béline, conseille Argan.","Argan veut marier sa fille à T. Diafoirus, neveu de son médecin.","Argan menace Angélique du couvent.","Toinette promet à Angélique de l’aider.","Angélique a rencontré Cléante, qui doit la demander en mariage.","Argan, veuf, s’est remarié avec Béline.");
RM[1]= new Array("Cléante s’introduit chez Argante en faux maître de musique.","Angélique repousse les avances de T. Diafoirus.","Argan menace à nouveau Angélique du couvent.","Visite de Béralde qui propose à son frère un divertissement.","Béline dénonce la nouvelle entrevue d’Angélique avec Cléante.","Intermède avec un ballet égyptien et des singes dressés.","Visite des Diafoirus : compliments de Thomas.","Angélique profite de la leçon de musique pour rassurer Cléante.","Agacé, Argan chasse Cléante.","Argan menace Louison afin d’obtenir son témoignage.");
RM[2]= new Array("Béralde empêche l’apothicaire d’administrer le lavement prescrit.","Béralde promet d’apporter son soutien à Toinette pour aider Angélique.","Contrarié, M. Purgon maudit Argan et renonce à doter son neveu.","Déguisée en médecin, Toinette dénigre les traitements de M. Purgon.","Toinette annonce à Argan, désespéré, la venue d’un nouveau médecin.","Béralde soupçonne Béline d’agir contre sa belle-fille.","L’épouse cupide est confondue par le stratagème de Toinette.","Béralde tente de raisonner Argan au sujet du mariage, puis critique la médecine.","Béralde intervient à nouveau en faveur d’Angélique, mais Argan s’obstine à la mettre au couvent.","Toinette suggère à Argan de contrefaire le mort afin de connaître les sentiments de Béline.");
RM[3]= new Array("Intermède : mascarade en pseudo-latin pour introniser Argan en médecin.","Cléante se joint à la tristesse d’Angélique.","Angélique témoigne une réelle affliction.","Argan accepte le mariage à la condition que Cléante devienne médecin.","Béralde suggère à Argan de devenir lui-même médecin.","Toinette suggère à Argan de contrefaire le mort afin de connaître les sentiments d’Angélique.","Angélique veut renoncer à épouser Cléante.");

// ECRIRE LES QUESTIONS (li, divs, forms et inputs)
var O = document.getElementById("questions");
O.innerHTML = "";
for(i=0;i<RM.length;i++){
// d'abord créer le li
var L = document.createElement("li");
L.id = "li"+i;
O.appendChild(L);
// puis le div pour la réponse
var DV = document.createElement("div");
DV.id = "q"+i;
DV.className = "quest";
DV.innerHTML= "";
L.appendChild(DV);
// form
var FR = document.createElement("form");
FR.id = "f"+i;
FR.className = "frm";
L.appendChild(FR);
// les mots dans le désordre
var n = i;
for(x=0;x<RM[i].length;x++){
	var ip = document.createElement("input");
	ip.type = "button";
	ip.className = "elm";
	ip.id = "f"+i+"i"+x;
	ip.value = RM[i][x];
	ip.setAttribute("onclick","clic('q"+i+"',this.value,this.id);");
	document.getElementById("f"+i).appendChild(ip);
}
//retour chariot
	saut = document.createElement("br");
	document.getElementById("f"+i).appendChild(saut);
// bouton annuler
var ip = document.createElement("input");
ip.type = "button";
ip.className = "cmd";
ip.value = "Annuler";
var cancel = "nihil"+i;
ip.setAttribute("id",cancel);
ip.title = "Enlever le dernier élément";
ip.setAttribute("onclick","annuler('q"+i+"','f"+i+"');");
document.getElementById("f"+i).appendChild(ip);
}

/* LES FONCTIONS */
function clic(t,v,iD){
	document.getElementById(iD).style.visibility="hidden";
	var sp = document.createElement("span");
	sp.setAttribute("id","S"+iD);
	sp.innerHTML = v;
	document.getElementById(t).appendChild(sp);
	document.getElementById("feedback").style.display="none"; // masquer le feedback
}

function annuler(Qid,Fid){
	Q = document.getElementById(Qid);
	if(Q.childNodes.length==0){return}
	else{
		// enlever le dernier span
		last = Q.lastChild;
		Q.removeChild(last);
		// récupérer le n° dans l'ID de ce span
		if(last.id){
			lastID = last.id;
			posI = lastID.search("i")+1; // position du "i" + 1
			no = lastID.substr(posI);
			// réafficher le bouton concerné
			document.getElementById(Fid+"i"+no).style.visibility="visible";
		}
	}
}

/* CORRECTION */
function corriger(){
	var rempli=0; var reponse="";
	for(i=0;i<RC.length;i++){
		DV = document.getElementById("q"+i);
		correct = RPC[i].replace(/[|]/g,"");
		if(DV.textContent){reponse = DV.textContent;}
		else if(DV.innerText){reponse = DV.innerText;}
		else {reponse = "";} // Si aucun des deux n'existe, cela est sûrement dû au fait qu'il n'y a pas de texte

		if(reponse==correct){
			DV.style.backgroundColor="Lime";
			document.getElementById("nihil"+i).style.display="none"; // effacer le bouton "Annuler"
			document.getElementById("f"+i).style.display="none"; // effacer le form
			rempli++;
		}
		else if(reponse!="" && reponse!=correct){
			DV.style.backgroundColor="#FFCCE6";
			rempli++;
		}
	}

		if(rempli==RC.length){ // s'il ne reste plus de box vide
			document.getElementById("check").disabled=true;// on désactive le bouton "Corriger"
			document.getElementById("encore").style.display="inline";// on affiche le bouton "Recommencer"
			for(i=0;i<RC.length;i++){
				document.getElementById("f"+i).style.display="none"; // masquer les mots à cliquer
				document.getElementById("nihil"+i).style.display="none"; // masquer le bouton "Annuler"
			}
		}
}

/* début du SCRIPT de DRAG-n-DROP réalisé par oli. http://blog.oli-web.com */
var isDragging = false; var objectToDrag, obj, ecartX, ecartY, curX, curY;
function positionne(p_id, p_posX, p_pos_Y){
	document.getElementById(p_id).style.left = p_posX;
	document.getElementById(p_id).style.top = p_pos_Y;
}
function getPositionCurseur(e){
	if(document.all){curX = event.clientX;curY = event.clientY;}//ie
	if(document.layers){curX = e.pageX;curY = e.pageY;}//netscape 4
	if(document.getElementById){curX = e.clientX;curY = e.clientY;}//mozilla
}
function beginDrag(p_obj,e){
	isDragging = true;
	objectToDrag = p_obj;
	getPositionCurseur(e);
	ecartX = curX - parseInt(objectToDrag.style.left);
	ecartY = curY - parseInt(objectToDrag.style.top);
}
function drag(e){
	var newPosX; var newPosY;
	if(isDragging == true){
		getPositionCurseur(e);
		newPosX = curX - ecartX;newPosY = curY - ecartY;
		objectToDrag.style.left = newPosX + "px";objectToDrag.style.top = newPosY + "px";
	}
}
function endDrag(){isDragging=false;}
/* fin du SCRIPT de DRAG-n-DROP réalisé par oli. http://blog.oli-web.com */

/* FEEDBACK */
function alerte(message){
	document.getElementById("fb").innerHTML=message;
	document.getElementById("feedback").style.display="block";
}
