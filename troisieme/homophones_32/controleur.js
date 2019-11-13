// DYRIS version 21


// OBJET CONTROLEUR

var cont={};
cont.debut=null;
cont.fin=null;
cont.nb_quest_choisi=0;
cont.nb_quest_faites=0;
cont.num_theme=0;
cont.num_question=0;
cont.num_page="1";
cont.note=0;
cont.note_maxi=0;
cont.identifiant="";
cont.num_th_ch=function() {
	var i, j, liste_themes="";
	for (i=0;i<mod.th.length;i++) {
		if (mod.th[i].choisi=="oui") {
			j=i+1;
			if (liste_themes=="") liste_themes=j;
			else liste_themes+=" - "+j;
		}
	}
	return liste_themes;
};
cont.liste_th_ch=function() {
	var i, liste_themes="";
	for (i=0;i<mod.th.length;i++) {
		if (mod.th[i].choisi=="oui") {
			if (liste_themes=="") liste_themes=mod.th[i].titre;
			else liste_themes+="<br>"+mod.th[i].titre;
		}
	}
	return liste_themes;
};
cont.temps=function() {
	var duree=Math.round((cont.fin.getTime()-cont.debut.getTime())/1000),
	    minutes=Math.floor(duree/60), secondes=duree-60*minutes, temps="";
	if (minutes==0) temps=secondes+" s";
	else {
		if (secondes==0) temps=minutes+" min";
		else temps=minutes+" min "+secondes+" s";
	}
	return temps;
};
cont.note_finale=function() {
	var note, note_max=opt.note_sur;
	if (note_max=="") note_max=cont.nb_quest_choisi;
	note=Math.round((cont.note*note_max/cont.note_maxi)*10)/10;
	if (note<0) note=0;
	if (cont.nb_quest_faites!=cont.nb_quest_choisi) note="-";
	note+=' / '+note_max;
	return note;
};
cont.com=function() {
	var i, com="", notesur20=cont.note*20/cont.note_maxi;
	if (cont.nb_quest_faites!=cont.nb_quest_choisi) com=opt.non_fini.hasard();
	else {
		for (i=0;i<opt.appr.length;i++) {
			if (opt.appr[i].note_min<=notesur20 && notesur20<=opt.appr[i].note_max) {
				com=opt.appr[i].enonce.hasard();
			}
		}
	}
	return com;
};
cont.sauv=function() {
	return cont.identifiant+'§'+cont.num_th_ch()+'§'+cont.nb_quest_choisi+'§'+cont.temps()+'§'+cont.note_finale();
};
cont.getcookie=function(nom) {
	var position, fin, recherche=nom+'=';
	if (document.cookie.length>0) {
		position=document.cookie.indexOf(recherche);
		if (position!=-1) {
			position=position+recherche.length; // On passe après nom=
			fin=document.cookie.indexOf(';',position); // On cherche la fin (";")
			if (fin==-1) fin=document.cookie.length; // Sans le ";", le cookie va jusqu'au bout
			return unescape(document.cookie.substring(position,fin));
		}
		else return '';
	}
	else return '';
};
cont.putcookie=function(nom,texte,jours) {
	var datecourante=new Date(), expires=new Date();
	expires.setTime(datecourante.getTime()+1000*60*60*24*jours);
	document.cookie=nom+'='+escape(texte)+'; expires='+expires.toGMTString();
};
cont.sauv_cookies=function() {
	// Sauvegarde dans le cookie "dyris_2"
	var sauv=cont.getcookie("dyris_2");
	sauv+=cont.sauv()+"\n";
	cont.putcookie("dyris_2",sauv,10);
	// Affichage de la page "score.html"
	var l=screen.width/1.3, h=screen.height/1.5;
	if (opt.mode_evaluation==1) ouvrir_fenetre("scores.html",l,h);
	else ouvrir_fenetre("confirmation.html",l,h);
};
cont.test_cookies=function() {
	cont.putcookie("dyris_1","essai",10);
	var test=cont.getcookie("dyris_1");
	if (test!="") return"ok"; else return"non";
};
cont.sauv_php=function() {
	var mot=cont.sauv(), l=screen.width/1.3, h=screen.height/1.5;
	if (opt.mode_evaluation==1) ouvrir_fenetre("scores.php?enr="+mot,l,h);
	else {
		mot+="&mel="+opt.mel+"&sujet="+txt.mot[3]+"&contenu="+txt.mot[4];
		ouvrir_fenetre("confirmation.php?enr="+mot,l,h);
	}
};


// FONCTIONS APPELEES DEPUIS LA PREMIERE PAGE

function p1_choisir_themes() { if ($("tous").checked) { for (var i=0;i<mod.th.length;i++) $("th"+i).checked=true; } }

function p1_commencer() {
	var i, verif_th="non", verif_quest="non", verif_nom="non";
	// Initialisation
	cont.nb_quest_faites=0;
	cont.note=0;
	cont.note_maxi=0;
	cont.num_page="1";
	// Vérification du choix des thèmes
	for (i=0;i<mod.th.length;i++) mod.th[i].choisi="non";
	if (mod.th.length==1) mod.th[0].choisi="oui";
	if (mod.th.length>1) { for (i=0;i<mod.th.length;i++) { if ($("th"+i).checked) mod.th[i].choisi="oui"; } }
	for (i=0;i<mod.th.length;i++) { if (mod.th[i].choisi=="oui") verif_th="ok"; }
	if (verif_th=="non") alert(txt.fenetre[0]);
	// Vérification du choix du nombre de questions
	if (verif_th=="ok") {
		var nb_quest_dispo=0;
		for (i=0;i<mod.th.length;i++) { if (mod.th[i].choisi=="oui") nb_quest_dispo+=mod.th[i].quest.length; }
		cont.nb_quest_choisi="aucun";
		if (opt.nb_questions.length==0) cont.nb_quest_choisi=nb_quest_dispo;
		if (opt.nb_questions.length==1) cont.nb_quest_choisi=opt.nb_questions[0];
		if (opt.nb_questions.length>1) {
			for (i=0;i<opt.nb_questions.length;i++) { if ($("nb"+i).checked) cont.nb_quest_choisi=opt.nb_questions[i]; }
		}
		if (cont.nb_quest_choisi!="aucun" && cont.nb_quest_choisi<=nb_quest_dispo) verif_quest="ok";
		if (cont.nb_quest_choisi=="aucun") alert(txt.fenetre[1]);
		if (cont.nb_quest_choisi>nb_quest_dispo) alert(txt.fenetre[2]);
	}
	// Vérification de l'identifiant de l'élève
	if (verif_quest=="ok") {
		if ($("nom").value.trim()!="") {
			cont.identifiant=$("nom").value.trim();
			verif_nom="ok";
		}
		if (verif_nom=="non") alert(txt.fenetre[3]);
	}
	// Début de l'exercice
	if (verif_nom=="ok") {
		cont.debut=new Date();
		nouvelle_question();
	}
}


// FONCTIONS APPELEES DEPUIS LA DEUXIEME PAGE

function p2_verifier() {
	var i, j, k, sol, tmp, bareme, note=0, com="", repondu="juste", rep=[], type=["?","?","?"], verif=["?","?","?"],
	    t=mod.th[cont.num_theme], q=t.quest[cont.num_question], r, n=q.rep.length;
	// Conservation des réponses apportées par l'élève 
	for (i=0;i<n;i++) {
		r=q.rep[i];
		if (r.type=="case"||r.type=="bouton") {
			if ($(r.id).checked) {
				if (r.sol=="coche") r.repondu="juste";
				else r.repondu="faux";
			}
			else {
				if (r.sol=="coche") r.repondu="faux";
				else r.repondu="juste";
			}
		}
		if (r.type=="champ_ou_liste") {
			for (j=0;j<r.id.length;j++) {
				sol=r.sol[j].split("||");
				r.repondu[j]="faux";
				for (k=0;k<sol.length;k++) {
					if ($(r.id[j]).value.trim()==sol[k].trim()) r.repondu[j]="juste";
				}
			}
		}
	}
	// Identification des types de réponses proposées
	for (i=0;i<n;i++) {
		r=q.rep[i];
		if (r.type=="case") type[0]="pose";
		if (r.type=="bouton") type[1]="pose";
		if (r.type=="champ_ou_liste") type[2]="pose";
	}
	// Vérification qu'une réponse est apportée par l'élève
	if (type[0]=="pose") verif[0]="non fait";
	if (type[1]=="pose") verif[1]="non fait";
	if (type[2]=="pose") verif[2]="pose";
	for (i=0;i<n;i++) {
		r=q.rep[i];
		if (r.type=="case") { if ($(r.id).checked) verif[0]="fait"; }
		if (r.type=="bouton") { if ($(r.id).checked) verif[1]="fait"; }
		if (r.type=="champ_ou_liste") {
			for (j=0;j<r.id.length;j++) {
				if ($(r.id[j]).value.trim()=="") {
					if (verif[2]=="pose") verif[2]="non fait";
					if (verif[2]=="fait") verif[2]="fait en partie"; 
				}
				else {
					if (verif[2]=="pose") verif[2]="fait";
					if (verif[2]=="non fait") verif[2]="fait en partie";
				}
			}
		}
	}
	// Suite selon la vérification 
	if (verif[0]!="fait"&&verif[1]!="fait"&&(verif[2]=="?"||verif[2]=="non fait")) {
		alert(txt.fenetre[4]);
		return;
	}
	if ((verif[0]=="fait"&&verif[1]=="non fait")||(verif[0]=="non fait"&&verif[1]=="fait")||verif[2]=="fait en partie") {
		if (!confirm(txt.fenetre[5])) return;
	}
	// Traitement des réponses
	if (type[0]=="pose") {
		if (verif[0]=="non fait") tmp="aucune";
		else {
			tmp="juste";
			for (i=0;i<n;i++) {
				r=q.rep[i];
				if (r.type=="case") {
					if ($(r.id).checked) { if (r.sol=="decoche") tmp="fausse"; }
					else { if (r.sol=="coche") tmp="fausse"; }
				}
			}
		}
		rep[rep.length]=tmp;
	}
	if (type[1]=="pose") {
		if (verif[1]=="non fait") tmp="aucune";
		else {
			tmp="juste";
			for (i=0;i<n;i++) {
				r=q.rep[i];
				if (r.type=="bouton") {
					if ($(r.id).checked) { if (r.sol=="decoche") tmp="fausse"; }
					else { if (r.sol=="coche") tmp="fausse"; }
				}
			}
		}
		rep[rep.length]=tmp;
	}
	if (type[2]=="pose") {
		for (i=0;i<n;i++) {
			r=q.rep[i];
			if (r.type=="champ_ou_liste") {
				for (j=0;j<r.id.length;j++) {
					if ($(r.id[j]).value.trim()=="") tmp="aucune";
					else {
						tmp="fausse";
						sol=r.sol[j].split("||");
						for (k=0;k<sol.length;k++) { if ($(r.id[j]).value.trim()==sol[k].trim()) tmp="juste"; }
					}
					rep[rep.length]=tmp;
				}
			}
		}
	}
	// Note et résultats obtenus à la question
	bareme=q.bareme/rep.length;
	for (i=0;i<rep.length;i++) {
		if (rep[i]=="juste") note+=bareme;
		if (rep[i]=="aucune") { 
			note+=opt.coef_rep_nulle*bareme/opt.coef_rep_juste;
			repondu="faux";
		}
		if (rep[i]=="fausse") {
			note+=opt.coef_rep_fausse*bareme/opt.coef_rep_juste;
			repondu="faux";
		}
	}
	// Commentaire sur la réponse apportée par l'élève
	if (repondu=="juste") {
		if (q.com.juste!="") com=q.com.juste.hasard();
		else if (t.com.juste!="") com=t.com.juste.hasard();
		else if (mod.com.juste!="") com=mod.com.juste.hasard();
	}
	if (repondu=="faux") {
		if (q.com.faux!="") com=q.com.faux.hasard();
		else if (t.com.faux!="") com=t.com.faux.hasard();
		else if (mod.com.faux!="") com=mod.com.faux.hasard();
	}
	// Conclusion
	cont.note+=note;
	cont.note_maxi+=q.bareme;
	q.etat="corrigee";
	cont.nb_quest_faites++;
	if (opt.mode_evaluation==1) {
		maj_page2(note,com);
		cont.num_page="2bis";
		if (repondu=="faux") p2_clignoter();
	}
	else p2_suivant();
}

function p2_ne_sais_pas() {
	var i, j, note, com="", t=mod.th[cont.num_theme], q=t.quest[cont.num_question], r, n=q.rep.length;
	// Conservation des réponses apportées par l'élève 
	for (var i=0;i<n;i++) {
		r=q.rep[i];
		if (r.type=="case"||r.type=="bouton") r.repondu="faux";
		if (r.type=="champ_ou_liste") { for (j=0;j<r.id.length;j++) r.repondu[j]="faux"; }
	}
	// Note obtenue à la question
	note=opt.coef_rep_nulle*q.bareme/opt.coef_rep_juste;
	// Commentaire sur la réponse apportée par l'élève
	if (q.com.abandon!="") com=q.com.abandon.hasard();
	else if (t.com.abandon!="") com=t.com.abandon.hasard();
	else if (mod.com.abandon!="") com=mod.com.abandon.hasard();
	// Conclusion
	cont.note+=note;
	cont.note_maxi+=q.bareme;
	q.etat="corrigee";
	cont.nb_quest_faites++;
	if (opt.mode_evaluation==1) {
		maj_page2(note,com);
		cont.num_page="2bis";
		p2_clignoter();
	}
	else p2_suivant();
}

function p2_suivant() {
	if (cont.nb_quest_faites>=cont.nb_quest_choisi) p2_terminer();
	else nouvelle_question();
}

function p2_arreter() {
	if (cont.nb_quest_faites>=cont.nb_quest_choisi) p2_terminer();
	else { if (confirm(txt.fenetre[6])) p2_terminer(); }
}

function p2_terminer() {
	clearTimeout(clignot);
	cont.fin=new Date();
	// Sauvegarde automatique dans le cas d'une évaluation sommative
	if (opt.mode_evaluation==2) {
		if (opt.mode_sauvegarde==1) {
			// Sauvegarder si le navigateur accepte les cookies
			if (cont.test_cookies()=="ok") cont.sauv_cookies();
		}
		if (opt.mode_sauvegarde==2) cont.sauv_php();
	}
	ecrire_page3();
	cont.num_page="3";
}

function p2_clignoter() {
	var i, j, t=mod.th[cont.num_theme], q=t.quest[cont.num_question], r, n=q.rep.length;
	var montrer=function() {
		for (i=0;i<n;i++) {
			r=q.rep[i];
			if (r.type=="case"||r.type=="bouton") { if (r.sol=="coche") $(r.id).checked=true; }
			if (r.type=="champ_ou_liste") {
				for (j=0;j<r.id.length;j++) {
					if (r.repondu[j]!="juste") $(r.id[j]).value=r.sol[j].split("||")[0];
				}
			}
		}
	};
	var cacher=function() {
		for (i=0;i<n;i++) {
			r=q.rep[i];
			if (r.type=="case"||r.type=="bouton") { if (r.repondu!="juste") $(r.id).checked=false; }
			if (r.type=="champ_ou_liste") {
				for (j=0;j<r.id.length;j++) {
					if (r.repondu[j]!="juste") $(r.id[j]).value="";
				}
			}
		}
	};
	var alterner=function() {
		cacher();
		setTimeout(montrer,50);
		setTimeout(cacher,300);
	};
	clignot=setInterval(alterner,450);
}

function p2_inserer(caractere) {
	$(zt_focus).focus();
	$(zt_focus).value+=caractere;
}


// FONCTIONS APPELEES DEPUIS LA TROISIEME PAGE

function p3_sauv_cookies() {
	cont.sauv_cookies();
	ecrire_page1();
}

function p3_sauv_php() {
	cont.sauv_php();
	ecrire_page1();
}

// FONCTIONS APPELEES DEPUIS PLUSIEURS DES TROIS PAGES

function nouvelle_question() {
	var i, a, b;
	// Arrêt du clignotement des cases à cocher
	clearTimeout(clignot);
	if (opt.nb_questions.length!=0) {
		// Choix d'un thème disponible pris au hasard
		a=Math.floor(mod.th.length*Math.random());
		while (mod.th[a].choisi=="non"||mod.th[a].etat=="fini") { a=Math.floor(mod.th.length*Math.random()); }
		cont.num_theme=a;
		// Choix d'une question disponible prise au hasard
		b=Math.floor(mod.th[a].quest.length*Math.random());
		while (mod.th[a].quest[b].etat!="libre") { b=Math.floor(mod.th[a].quest.length*Math.random()); }
		cont.num_question=b;
	}
	if (opt.nb_questions.length==0) {
		// Choix du 1er thème disponible
		a=0;
		while (mod.th[a].choisi=="non"||mod.th[a].etat=="fini") a++;
		cont.num_theme=a;
		// Choix de la 1ère question disponible
		b=0;
		while (mod.th[a].quest[b].etat!="libre") b++;
		cont.num_question=b;
	}
	mod.th[a].quest[b].etat="affichee";
	// Vérification du thème pour savoir s'il est terminé ou non
	mod.th[a].etat="fini";
	for (i=0;i<mod.th[a].quest.length;i++) { if (mod.th[a].quest[i].etat=="libre") mod.th[a].etat="libre"; }
	ecrire_page2();
	cont.num_page="2";
}

function ouvrir_fenetre(adresse,largeur,hauteur) {
	var pos_x=(screen.width-largeur)/2, pos_y=(screen.height-hauteur)/2.5,
	    dimensions='width='+largeur+',height='+hauteur+',left='+pos_x+',top='+pos_y,
	    proprietes='menubar=no,toolbar=no,directories=no,location=no,status=no,scrollbars=yes';
	if (fen_guide!=null) { if (fen_guide.closed==false) fen_guide.close(); }
	fen_guide=window.open(adresse,'message',dimensions+proprietes);
	fen_guide.focus();
}

function quitter_dyris() {
	if (fen_guide!=null) { if (fen_guide.closed==false) fen_guide.close(); }
	document.location.href=opt.quitter;
}

