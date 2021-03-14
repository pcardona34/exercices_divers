/* RECOMMENCER */
function more(){self.location.href = self.location.href;}

/* MONTRER LES BONNES REPONSES */
document.getElementById("soluces").style.display="inline";

var i=0; var tm;

var RPC=[]; // éléments dans l'ordre correct avec délimiteurs éventuels
var RC=[]; // éléments séparés dans l'ordre correct
var RM=[]; // éléments séparés mélangés

RPC[0]="Plusieurs années auparavant, Meursault a fait interner sa mère dans un asile, à Marengo.|Meursault reçoit un télégramme : sa mère vient de mourir.|Meursault sollicite un congé auprès de son employeur et se rend en autocar à Marengo.|Meursault veille sa mère défunte et assiste aux obsèques le lendemain, sans manifester de chagrin.|Le lendemain de l'enterrement, Meursault va nager à l'établissement de bains du port.|Meursault rencontre Marie, qui avait travaillé dans la même entreprise que lui.|Le soir, Meursault et Marie vont au cinéma voir une comédie de Fernandel, puis ils dorment ensemble.|Le lendemain, son voisin, Raymond Sintès, lui demande d’écrire une lettre pour attirer sa maîtresse dans un guet-apens.|La semaine suivante, Raymond frappe et injurie sa maîtresse dans son appartement, sans susciter l’intervention de Meursault.";
RPC[1]="La police intervient et convoque Raymond au commissariat.|Raymond demande à Meursault de témoigner en sa faveur.|Pour le remercier, Raymond invite Meursault et Marie à déjeuner le dimanche suivant dans un cabanon au bord de la mer, chez son ami Masson.|Ce jour-là, Marie demande à Meursault s'il veut se marier avec elle. Il ne semble pas ému, mais il ne rejette pas l’idée.|Le dimanche après midi, Meursault, Raymond et Masson  croisent sur la plage deux Arabes : l’un est le frère de la maîtresse maltraitée de Raymond.|Dans la bagarre qui se déclenche, Raymond est blessé au visage d'un coup de couteau.|Plus tard, Meursault retourne seul sur la plage, avec l’arme de Raymond dans la poche.|Il retrouve un des Arabes, qui le menace avec un couteau.|Meursault tire et tue l'Arabe, puis il tire encore quatre fois sur le corps.";
RPC[2]="Meursault est arrêté et interrogé.|Son avocat est décontenancé par l’attitude de Meursault : celui-ci ne manifeste aucun remords.|Lors de l’instruction, puis du procès, on s’étonne de son comportement lors de l'enterrement de sa mère, puis de ses loisirs les jours suivants.|Meursault tente de justifier son acte par les circonstances, l’éblouissement du soleil.|Meursault est condamné à mort.|L’aumônier de la prison tente d’obtenir la confession de Meursault.|Meursault refuse l’aide du prêtre et se met en colère contre lui.|La veille de son exécution, Meursault espère la présence d’une foule vindicative.";

RC[0] = new Array("Plusieurs années auparavant, Meursault a fait interner sa mère dans un asile, à Marengo.","Meursault reçoit un télégramme : sa mère vient de mourir.","Meursault sollicite un congé auprès de son employeur et se rend en autocar à Marengo.","Meursault veille sa mère défunte et assiste aux obsèques le lendemain, sans manifester de chagrin.","Le lendemain de l'enterrement, Meursault va nager à l'établissement de bains du port.","Meursault rencontre Marie, qui avait travaillé dans la même entreprise que lui.","Le soir, Meursault et Marie vont au cinéma voir une comédie de Fernandel, puis ils dorment ensemble.","Le lendemain, son voisin, Raymond Sintès, lui demande d’écrire une lettre pour attirer sa maîtresse dans un guet-apens.","La semaine suivante, Raymond frappe et injurie sa maîtresse dans son appartement, sans susciter l’intervention de Meursault.");
RC[1] = new Array("La police intervient et convoque Raymond au commissariat.","Raymond demande à Meursault de témoigner en sa faveur.","Pour le remercier, Raymond invite Meursault et Marie à déjeuner le dimanche suivant dans un cabanon au bord de la mer, chez son ami Masson.","Ce jour-là, Marie demande à Meursault s'il veut se marier avec elle. Il ne semble pas ému, mais il ne rejette pas l’idée.","Le dimanche après midi, Meursault, Raymond et Masson  croisent sur la plage deux Arabes : l’un est le frère de la maîtresse maltraitée de Raymond.","Dans la bagarre qui se déclenche, Raymond est blessé au visage d'un coup de couteau.","Plus tard, Meursault retourne seul sur la plage, avec l’arme de Raymond dans la poche.","Il retrouve un des Arabes, qui le menace avec un couteau.","Meursault tire et tue l'Arabe, puis il tire encore quatre fois sur le corps.");
RC[2] = new Array("Meursault est arrêté et interrogé.","Son avocat est décontenancé par l’attitude de Meursault : celui-ci ne manifeste aucun remords.","Lors de l’instruction, puis du procès, on s’étonne de son comportement lors de l'enterrement de sa mère, puis de ses loisirs les jours suivants.","Meursault tente de justifier son acte par les circonstances, l’éblouissement du soleil.","Meursault est condamné à mort.","L’aumônier de la prison tente d’obtenir la confession de Meursault.","Meursault refuse l’aide du prêtre et se met en colère contre lui.","La veille de son exécution, Meursault espère la présence d’une foule vindicative.");

RM[0]= new Array("Meursault veille sa mère défunte et assiste aux obsèques le lendemain, sans manifester de chagrin.","Meursault sollicite un congé auprès de son employeur et se rend en autocar à Marengo.","Le soir, Meursault et Marie vont au cinéma voir une comédie de Fernandel, puis ils dorment ensemble.","Plusieurs années auparavant, Meursault a fait interner sa mère dans un asile, à Marengo.","Le lendemain, son voisin, Raymond Sintès, lui demande d’écrire une lettre pour attirer sa maîtresse dans un guet-apens.","Le lendemain de l'enterrement, Meursault va nager à l'établissement de bains du port.","La semaine suivante, Raymond frappe et injurie sa maîtresse dans son appartement, sans susciter l’intervention de Meursault.","Meursault reçoit un télégramme : sa mère vient de mourir.","Meursault rencontre Marie, qui avait travaillé dans la même entreprise que lui.");
RM[1]= new Array("Raymond demande à Meursault de témoigner en sa faveur.","Dans la bagarre qui se déclenche, Raymond est blessé au visage d'un coup de couteau.","Ce jour-là, Marie demande à Meursault s'il veut se marier avec elle. Il ne semble pas ému, mais il ne rejette pas l’idée.","Plus tard, Meursault retourne seul sur la plage, avec l’arme de Raymond dans la poche.","Pour le remercier, Raymond invite Meursault et Marie à déjeuner le dimanche suivant dans un cabanon au bord de la mer, chez son ami Masson.","La police intervient et convoque Raymond au commissariat.","Il retrouve un des Arabes, qui le menace avec un couteau.","Meursault tire et tue l'Arabe, puis il tire encore quatre fois sur le corps.","Le dimanche après midi, Meursault, Raymond et Masson  croisent sur la plage deux Arabes : l’un est le frère de la maîtresse maltraitée de Raymond.");
RM[2]= new Array("Son avocat est décontenancé par l’attitude de Meursault : celui-ci ne manifeste aucun remords.","Lors de l’instruction, puis du procès, on s’étonne de son comportement lors de l'enterrement de sa mère, puis de ses loisirs les jours suivants.","Meursault est arrêté et interrogé.","Meursault refuse l’aide du prêtre et se met en colère contre lui.","L’aumônier de la prison tente d’obtenir la confession de Meursault.","La veille de son exécution, Meursault espère la présence d’une foule vindicative.","Meursault est condamné à mort.","Meursault tente de justifier son acte par les circonstances, l’éblouissement du soleil.");

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

/* MONTRER LES SOLUTIONS */
function answers(){
	for(i=0;i<RC.length;i++){
		correct = RPC[i].replace(/[|]/g," ");
		document.getElementById("q"+i).innerHTML = correct;
		document.getElementById("q"+i).style.cssText = "color:Green;padding-left:5px;";
		inputs = document.getElementById("f"+i).getElementsByTagName("input");
		for(w=0;w<inputs.length;w++){
			if(inputs[w].type=="button"){inputs[w].style.visibility="hidden";}
		}
	}
	document.getElementById("check").disabled = true; // désactiver le bouton "corriger"
document.getElementById("encore").style.display="inline";
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
