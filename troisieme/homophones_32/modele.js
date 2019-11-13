// DYRIS version 21


// VARIABLES GLOBALES

var zt_focus, fen_guide=null, clignot=null;


// CONSTRUCTEURS

function C_appreciation(a,b,c) {
	this.note_min=a*1;
	this.note_max=b*1;
	if (b*1<a*1) {
		this.note_min=b*1;
		this.note_max=a*1;
	}
	this.enonce=c;
}
function C_page(a,b,c,d) {
	this.nom=a;
	this.adresse=b;
	this.larg=c;
	this.haut=d;
}
function C_complement() {
	this.schema="aucun";
	this.debut="";
	this.juste="";
	this.faux="";
	this.abandon="";
	this.audio=[];
	this.caractere=[];
	this.bouton_aide=[];
	this.bouton_correction=[];
	this.ajouter_bouton_aide=function(a,b,c,d) { this.bouton_aide[this.bouton_aide.length]=new C_page(a,b,c,d); };
}
function C_reponse(a) {
	var i, ch=a.substring(0,3), pos=a.indexOf("]");
	var nt=mod.th.length-1, nq=mod.th[nt].quest.length-1, nr=mod.th[nt].quest[nq].rep.length, id=nt+"_"+nq+"_"+nr;
	if (ch=="[x]"||ch=="[o]"||ch=="[*]"||ch=="[ ]") {
		this.type="case";
		this.id=id;
		if (ch=="[ ]") this.sol="decoche"; else this.sol="coche";
		this.repondu="";
		this.txt='<input type="checkbox" id="'+id+'">&nbsp;&nbsp;'+a.substring(3);
	}
	else if (ch=="(x)"||ch=="(o)"||ch=="(*)"||ch=="( )") {
		this.type="bouton";
		this.id=id;
		if (ch=="( )") this.sol="decoche"; else this.sol="coche";
		this.repondu="";
		this.txt='<input type="radio" id="'+id+'" name="ch_rep">&nbsp;&nbsp;'+a.substring(3);
	}
	else if (a.indexOf("]")==-1) {
		this.type="texte";
		this.txt=a;
	}
	else {
		this.type="champ_ou_liste";
		this.id=[];
		this.sol=[];
		this.repondu=[];
		this.txt="";
		while (pos!=-1) {
			this.id[this.id.length]=id+"_"+this.id.length;
			this.repondu[this.repondu.length]="";
			ch=a.substring(0,pos+1);
			a=a.substring(pos+1);
			pos=ch.indexOf("[");
			this.txt+=ch.substring(0,pos);
			ch=ch.substring(pos+1,ch.length-1);
			if (ch.substring(ch.length-2)=="[v") {
				ch=ch.substring(0,ch.length-2);
				this.txt+='<select id="'+this.id[this.id.length-1]+'"><option></option>'
				var opt=ch.split("||");
				for (i=0; i<opt.length; i++) {
					if (opt[i].substring(0,1)=="*"&&opt[i].substring(opt[i].length-1)=="*") {
						opt[i]=opt[i].substring(1,opt[i].length-1);
						this.sol[this.sol.length]=opt[i];
					}
					this.txt+='<option>'+opt[i]+'</option>';
				}
				this.txt+='</select>';
			}
			else {
				this.sol[this.sol.length]=ch;
				this.txt+='<input type="text" id="'+this.id[this.id.length-1];
				this.txt+='" size="'+ch.split("||")[0].length;
				this.txt+='" onFocus="zt_focus=\''+this.id[this.id.length-1]+'\';">';
			}
			pos=a.indexOf("]");
		}
		this.txt+=a.substring(pos+1);
	}
}
function C_question(a) {
	var fin, pos=a.indexOf("//");
	this.com=new C_complement();
	if (pos==-1) {
		this.enonce=a;
		this.bareme=1;
		this.mode="ordre";
	}
	else {
		this.enonce=a.substring(0,pos);
		fin=a.substring(pos+2,a.length);
		pos=fin.indexOf("a");
		if (pos==-1) {
			if (1*fin>0) this.bareme=1*fin; else this.bareme=1;
			this.mode="ordre";
		}
		else {
			fin=fin.substring(0,pos)+fin.substring(pos+1,fin.length);
			if (1*fin>0) this.bareme=1*fin; else this.bareme=1;
			this.mode="aleatoire";
		}
	}
	this.etat="libre";
	this.rep=[];
	this.ajouter_reponse=function(b) { this.rep[this.rep.length]=new C_reponse(b); };
}
function C_theme(a) {
	this.com=new C_complement();
	this.etat="libre";
	this.titre=a;
	this.choisi="non";
	this.quest=[];
	this.ajouter_question=function(b) {this.quest[this.quest.length]=new C_question(b);};
}


// OBJETS

var txt={};
txt.titre=[];
txt.bouton=[];
txt.fenetre=[];
txt.mot=[];

var opt={};
opt.mode_presentation="1";
opt.mode_evaluation="1";
opt.mode_sauvegarde="1";
opt.mel="aucun";
opt.titre="";
opt.commentaire="";
opt.nb_questions=[];
opt.bouton=[];
opt.quitter="";
opt.coef_rep_juste=1;
opt.coef_rep_nulle=0;
opt.coef_rep_fausse=-0.5;
opt.note_sur="";
opt.appr=[];
opt.non_fini="";
opt.ajouter_bouton_sup=function(a,b,c,d) { this.bouton[this.bouton.length]=new C_page(a,b,c,d); };
opt.ajouter_appr=function(a,b,c) { this.appr[this.appr.length]=new C_appreciation(a,b,c); };

var mod={};
mod.com=new C_complement();
mod.th=[];
mod.ajouter_theme=function(a) { mod.th[mod.th.length]=new C_theme(a); };


// FONCTIONS APPELEES PAR LE FICHIER "textes.js"

function titre(a) { txt.titre[txt.titre.length]=a; }
function bouton(a) { txt.bouton[txt.bouton.length]=a; }
function fenetre(a) { txt.fenetre[txt.fenetre.length]=a; }
function mot(a) { txt.mot[txt.mot.length]=a; }
function score() {}


// FONCTIONS APPELEES PAR LA PARTIE "OPTIONS" DU FICHIER "donnees.js"

function mode_presentation(a) { if (a=="1"||a=="2") opt.mode_presentation=a; }
function mode_evaluation(a) { if (a=="1"||a=="2") opt.mode_evaluation=a; }
function mode_sauvegarde(a) { if (a=="1"||a=="2") opt.mode_sauvegarde=a; }
function mel(a) { opt.mel=a; }
function titre_introduction(a) { opt.titre+=" "+a; }
function introduction(a) { opt.commentaire+=" "+a; }
function nombre_questions() { for (var i=0;i<arguments.length;i++) opt.nb_questions[i]=arguments[i]; }
function bouton_sup() {
	var n=arguments[0], u=arguments[1], l=screen.width/1.3, h=screen.height/1.5;
	if (arguments.length==4) {
		l=arguments[2];
		h=arguments[3];
	}
	opt.ajouter_bouton_sup(n,u,l,h);
}
function url_quitter(a) { opt.quitter=a; }
function coef_rep_juste(a) { opt.coef_rep_juste=a; }
function coef_rep_fausse(a) { opt.coef_rep_fausse=a; }
function coef_rep_nulle(a) { opt.coef_rep_nulle=a; }
function note_sur(a) { opt.note_sur=a; }
function appreciation(a,b,c) { opt.ajouter_appr(a,b,c); }
function non_termine(a) { opt.non_fini=a; }


// FONCTIONS APPELEES PAR LA PARTIE "QUESTIONNAIRE" DU FICHIER "donnees.js"

function theme(a) { mod.ajouter_theme(a); }
function question(a) {
	if (mod.th.length==0) mod.ajouter_theme("Theme_non_defini");
	mod.th[mod.th.length-1].ajouter_question(a.traiter());
}
function reponse(a) {
	var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
	mod.th[num_theme].quest[num_question].ajouter_reponse(a.traiter());
}
function image(n) {
	if (mod.th.length==0) mod.com.schema=n;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		mod.th[num_theme].com.schema=n;
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		mod.th[num_theme].quest[num_question].com.schema=n;
	}
}
function audio() {
	var i;
	if (mod.th.length==0) {
		for (i=0;i<arguments.length;i++) mod.com.audio[i]=arguments[i];
	}
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		for (i=0;i<arguments.length;i++) mod.th[num_theme].com.audio[i]=arguments[i];
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		for (i=0;i<arguments.length;i++) {
			mod.th[num_theme].quest[num_question].com.audio[i]=arguments[i];
		}
	}
}
function debut(a) {
	if (mod.th.length==0) mod.com.debut=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		mod.th[num_theme].com.debut=a;
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		mod.th[num_theme].quest[num_question].com.debut=a;
	}
}
function juste(a) {
	if (mod.th.length==0) mod.com.juste=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		mod.th[num_theme].com.juste=a;
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		mod.th[num_theme].quest[num_question].com.juste=a;
	}
}
function faux(a) {
	if (mod.th.length==0) mod.com.faux=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		mod.th[num_theme].com.faux=a;
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		mod.th[num_theme].quest[num_question].com.faux=a;
	}
}
function abandon(a) {
	if (mod.th.length==0) mod.com.abandon=a;
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		mod.th[num_theme].com.abandon=a;
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		mod.th[num_theme].quest[num_question].com.abandon=a;
	}
}
function caracteres_speciaux() {
	var i;
	if (mod.th.length==0) {
		for (i=0;i<arguments.length;i++) mod.com.caractere[i]=arguments[i];
	}
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		for (i=0;i<arguments.length;i++) mod.th[num_theme].com.caractere[i]=arguments[i];
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		for (i=0;i<arguments.length;i++) {
			mod.th[num_theme].quest[num_question].com.caractere[i]=arguments[i];
		}
	}
}
function aide() {
	var n, u, l=screen.width/1.3, h=screen.height/1.5;
	if (arguments.length==1) {
		n=txt.bouton[8];
		u=arguments[0];
	}
	if (arguments.length==2) {
		n=arguments[0];
		u=arguments[1];
	}
	if (arguments.length==3) {
		n=txt.bouton[8];
		u=arguments[0];
		l=arguments[1];
		h=arguments[2];
	}
	if (arguments.length==4) {
		n=arguments[0];
		u=arguments[1];
		l=arguments[2];
		h=arguments[3];
	}
	if (mod.th.length==0) mod.com.ajouter_bouton_aide(n,u,l,h);
	else if (mod.th[mod.th.length-1].quest.length==0) {
		var num_theme=mod.th.length-1;
		mod.th[num_theme].com.ajouter_bouton_aide(n,u,l,h);
	}
	else {
		var num_theme=mod.th.length-1, num_question=mod.th[num_theme].quest.length-1;
		mod.th[num_theme].quest[num_question].com.ajouter_bouton_aide(n,u,l,h);
	}
}


// RACCOURCIS

var quest=question, rep=reponse, sch=schema=im=image, bouton_indice=aide;

