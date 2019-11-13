// DYRIS version 21


function ecrire_page1() {
	var i, j, ch='<h1>'+opt.titre+'</h1><p>'+opt.commentaire+'</p>';
	for (i=0;i<mod.th.length;i++) {
		mod.th[i].etat="libre";
		for (j=0;j<mod.th[i].quest.length;j++) mod.th[i].quest[j].etat="libre";
		if (mod.th[i].quest.length==0) mod.th[i].etat="fini";
	}
	if (mod.th.length>1 && opt.nb_questions.length>1) {
		ch+='<div style="float:left; width:55%;">'+afficher_themes()+'</div>';
		ch+='<div style="float:right; width:44%;">'+afficher_nb_questions()+'</div>';
		ch+='<div style="clear:both;"></div>';
	}
	if (mod.th.length<=1 && opt.nb_questions.length>1) {
		ch+='<div style="margin:auto; width:45%;">'+afficher_nb_questions()+'</div>';
	}
	if (mod.th.length>1 && opt.nb_questions.length<=1) {
		ch+='<div style="margin:auto; width:55%;">'+afficher_themes()+'</div>';
	}
	ch+='<div id="menu">';
	ch+=txt.mot[2]+'<input type="text" value="'+cont.identifiant+'" id="nom"><hr>';
	ch+='<button type="button" onclick="p1_commencer();">'+txt.bouton[0]+'</button>';
	for (i=0;i<opt.bouton.length;i++) {
		ch+='<button type="button" onclick="ouvrir_fenetre(\'';
		ch+=opt.bouton[i].adresse+'\',\'';
		ch+=opt.bouton[i].larg+'\',\'';
		ch+=opt.bouton[i].haut+'\');">';
		ch+=opt.bouton[i].nom+'</button>';
	}
	if (opt.quitter!="") {
		ch+='<button type="button" onclick="quitter_dyris();">'+txt.bouton[1]+'</button>';
	}
	ch+='</div>';
	$("page").innerHTML=ch;
}

function afficher_themes() {
	var i, ch='<div class="cadre"><h2>'+txt.titre[0]+'</h2>';
	if (opt.mode_presentation=="1") {
		for (i=0;i<mod.th.length;i++) {
			ch+='<input type="checkbox" id="th'+i+'" onclick="p1_choisir_themes();"';
			if (mod.th[i].choisi=="oui") ch+=' checked';
			ch+='>&nbsp;&nbsp;'+mod.th[i].titre+'<br>';
		}
		ch+='<input type="checkbox" id="tous" onclick="p1_choisir_themes();">&nbsp;&nbsp;'+txt.mot[0];
	}
	else {
		for (i=0;i<mod.th.length;i++) {
			ch+='<input type="radio" id="th'+i+'" name="ch_th"';
			if (i==0||mod.th[i].choisi=="oui") ch+=' checked';
			ch+='>&nbsp;&nbsp;'+mod.th[i].titre+'<br>';
		}
	}
	ch+='</div>';
	return ch;
}

function afficher_nb_questions() {
	var ch='<div class="cadre"><h2>'+txt.titre[1]+'</h2>';
	for (var i=0;i<opt.nb_questions.length;i++) {
		ch+='<input type="radio" id="nb'+i+'" name="ch_nb"';
		if (i==0||cont.nb_quest_choisi==opt.nb_questions[i]) ch+=' checked';
		ch+='>&nbsp;&nbsp;'+opt.nb_questions[i]+' '+txt.mot[1]+'<br>';
	}
	ch+='</div>';
	return ch;
}

function ecrire_page2() {
	var i, j, s, num=[], t=mod.th[cont.num_theme], q=t.quest[cont.num_question], n=q.rep.length, ch='<div class="cadre"><h2>';
	if (opt.mode_evaluation==1) {
		ch+='<div id="info_note" style="float:right;">'+txt.titre[3]+'&nbsp;&nbsp;/'+q.bareme+'</div>';
	}
	ch+=txt.titre[2]+(cont.nb_quest_faites+1)+'/'+cont.nb_quest_choisi;
	ch+='</h2>';
	// Affichage de l'image associée à la question
	s="aucun";
	if (mod.com.schema!="aucun") s=mod.com.schema;
	if (t.com.schema!="aucun") s=t.com.schema;
	if (q.com.schema!="aucun") s=q.com.schema;
	if (s!="aucun") ch+='<img class="image" style="float:right;" src="'+s+'">';
	// Affichage de l'énoncé de la question
	if (q.enonce!="") ch+=q.enonce.hasard()+'<br><br>';
	if (q.mode=="ordre") for (i=0;i<n;i++) num[i]=i;
	else {
		var util=[], recom=1;
		num[0]=Math.floor(n*Math.random());
		util[0]=num[0];
		for (i=1;i<n;i++) {
			num[i]=Math.floor(n*Math.random());
			recom=1;
			while (recom==1) {
				recom=0;
				for (j=0;j<util.length;j++) {
					if (num[i]==util[j]) {
						recom=1;
						num[i]=Math.floor(n*Math.random());
					}
				}
			}
			util[i]=num[i];
		}
	}
	// Affichage des réponses proposées
	for (i=0;i<n;i++) { ch+=q.rep[num[i]].txt+"<br>"; }
	ch+='<div style="clear:both;"></div>';
	// Affichage du lecteur audio pour le son associé à la question
	s=[];
	if (mod.com.audio.length!=0) s=mod.com.audio;
	if (t.com.audio.length!=0) s=t.com.audio;
	if (q.com.audio.length!=0) s=q.com.audio;
	if (s.length!=0) {
		ch+='<audio controls class="audio">';
		for (i=0;i<s.length;i++) ch+='<source src="'+s[i]+'">';
		ch+='</audio>';
	}
	ch+='</div>';
	// Affichage du menu
	ch+='<div id="menu">';
	// Affichage du commentaire accompagnant la question posée
	if (q.com.debut!="") ch+=q.com.debut.hasard()+'<hr>';
	else if (t.com.debut!="") ch+=t.com.debut.hasard()+'<hr>';
	else if (mod.com.debut!="") ch+=mod.com.debut.hasard()+'<hr>';
	// Affichage de la barre de caractères spéciaux
	if (q.com.caractere.length!=0) {
		for (i=0;i<q.com.caractere.length;i++) {
			ch+='<button type="button" onclick="p2_inserer(\'';
			ch+=q.com.caractere[i]+'\')">'+q.com.caractere[i]+'</button>';
		}
		ch+='<hr>';
	}
	else if (t.com.caractere.length!=0) {
		for (i=0;i<t.com.caractere.length;i++) {
			ch+='<button type="button" onclick="p2_inserer(\'';
			ch+=t.com.caractere[i]+'\')">'+t.com.caractere[i]+'</button>';
		}
		ch+='<hr>';
	}
	else if (mod.com.caractere.length!=0) {
		for (i=0;i<mod.com.caractere.length;i++) {
			ch+='<button type="button" onclick="p2_inserer(\'';
			ch+=mod.com.caractere[i]+'\')">'+mod.com.caractere[i]+'</button>';
		}
		ch+='<hr>';
	}
	// Suite du menu
	ch+='<button type="button" onclick="p2_verifier();">'+txt.bouton[2]+'</button>';
	ch+='<button type="button" onclick="p2_ne_sais_pas();">'+txt.bouton[4]+'</button>';
	// Affichage des boutons d'aide
	if (q.com.bouton_aide.length!=0) {
		for (i=0;i<q.com.bouton_aide.length;i++) {
			ch+='<button type="button" onclick="ouvrir_fenetre(\'';
			ch+=q.com.bouton_aide[i].adresse+'\',\'';
			ch+=q.com.bouton_aide[i].larg+'\',\'';
			ch+=q.com.bouton_aide[i].haut+'\');">';
			ch+=q.com.bouton_aide[i].nom+'</button>';
		}
	}
	if (t.com.bouton_aide.length!=0) {
		for (i=0;i<t.com.bouton_aide.length;i++) {
			ch+='<button type="button" onclick="ouvrir_fenetre(\'';
			ch+=t.com.bouton_aide[i].adresse+'\',\'';
			ch+=t.com.bouton_aide[i].larg+'\',\'';
			ch+=t.com.bouton_aide[i].haut+'\');">';
			ch+=t.com.bouton_aide[i].nom+'</button>';
		}
	}
	if (mod.com.bouton_aide.length!=0) {
		for (i=0;i<mod.com.bouton_aide.length;i++) {
			ch+='<button type="button" onclick="ouvrir_fenetre(\'';
			ch+=mod.com.bouton_aide[i].adresse+'\',\'';
			ch+=mod.com.bouton_aide[i].larg+'\',\'';
			ch+=mod.com.bouton_aide[i].haut+'\');">';
			ch+=mod.com.bouton_aide[i].nom+'</button>';
		}
	}
	// Fin du menu
	if (opt.mode_evaluation=="1") ch+='<button type="button" onclick="p2_arreter();">'+txt.bouton[5]+'</button>';
	ch+='</div>';
	$("page").innerHTML=ch;
	// Mise en place du focus
	if (q.rep[0].type=="champ_ou_liste") $(q.rep[0].id[0]).focus();
}

function maj_page2(note_question,commentaire) {
	var nouv_men='', a=cont.num_theme, b=cont.num_question;
	if (commentaire!="") nouv_men=commentaire+'<hr>';
	nouv_men+='<button type="button" onclick="p2_suivant();">'+txt.bouton[3]+'</button>';
	// Suite du menu
	if (cont.nb_quest_faites<cont.nb_quest_choisi) {
		nouv_men+='<button type="button" onclick="p2_arreter();">'+txt.bouton[5]+'</button>';
	}
	$("menu").innerHTML=nouv_men;
	$("info_note").innerHTML=txt.titre[3]+Math.round(note_question*100)/100+'/'+mod.th[a].quest[b].bareme;
}

function ecrire_page3() {
	var ch='';
	// Affichage de la liste des thèmes choisis
	if (mod.th.length>1) ch+='<div class="cadre"><h2>'+txt.titre[0]+'</h2>'+cont.liste_th_ch()+'</div>';
	// Affichage du nombre de questions choisi
	ch+='<div class="cadre"><h2>'+txt.titre[5]+'</h2>'+cont.nb_quest_choisi+'</div>';
	// Affichage du temps mis pour répondre aux questions
	ch+='<div class="cadre"><h2>'+txt.titre[7]+'</h2>'+cont.temps()+'</div>';
	// Affichage de la note finale
	if (cont.nb_quest_faites==cont.nb_quest_choisi) ch+='<div class="cadre"><h2>'+txt.titre[6]+'</h2>'+cont.note_finale()+'</div>';
	// Affichage de l'appréciation
	if (cont.com()!="") ch+='<div class="cadre"><h2>'+txt.titre[8]+'</h2>'+cont.com()+'</div>';
	ch+='<div id="menu">';
	// Sauvegarde proposée dans le cas d'une évaluation formative
	if (opt.mode_evaluation==1) {
		if (opt.mode_sauvegarde==1) {
			// Proposer une sauvegarde si le navigateur accepte les cookies
			if (cont.test_cookies()=="ok") {
				ch+='<button type="button" onclick="p3_sauv_cookies();">';
				ch+=txt.bouton[7]+'</button>';
			}
		}
		if (opt.mode_sauvegarde==2) {
			ch+='<button type="button" onclick="p3_sauv_php();">';
			ch+=txt.bouton[7]+'</button>';
		}
	}
	ch+='<button type="button" onclick="ecrire_page1();">'+txt.bouton[6]+'</button>';
	if (opt.quitter!="") ch+='<button type="button" onclick="quitter_dyris();">'+txt.bouton[1]+'</button>';
	ch+='</div>';
	$("page").innerHTML=ch;
}

