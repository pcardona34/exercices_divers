/* RECOMMENCER */
function more(){self.location.href = self.location.href;}

var i=0; var tm;

var RPC=[]; // éléments dans l'ordre correct avec délimiteurs éventuels
var RC=[]; // éléments séparés dans l'ordre correct
var RM=[]; // éléments séparés mélangés

RPC[0]="M. de Francueil invite Jean-Jacques à l'opéra. | Il achète les deux billets, et en donne un à Jean-Jacques. |  Comme les spectateurs sont encore debout, JJ en profite pour retourner sur ses pas. | Il sort du théâtre et se fait rembourser le billet. |  Il réalise que son absence sera forcément remarquée par M. de Francueil.";

RC[0] = new Array("M. de Francueil invite Jean-Jacques à l'opéra. "," Il achète les deux billets, et en donne un à Jean-Jacques. ","  Comme les spectateurs sont encore debout, JJ en profite pour retourner sur ses pas. "," Il sort du théâtre et se fait rembourser le billet. ","  Il réalise que son absence sera forcément remarquée par M. de Francueil.");

RM[0]= new Array("  Comme les spectateurs sont encore debout, JJ en profite pour retourner sur ses pas. ","M. de Francueil invite Jean-Jacques à l'opéra. "," Il sort du théâtre et se fait rembourser le billet. "," Il achète les deux billets, et en donne un à Jean-Jacques. ","  Il réalise que son absence sera forcément remarquée par M. de Francueil.");

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
