// LES OPTIONS

mode_presentation("1");
mode_evaluation("1");
mode_sauvegarde("1");
mel("patrick.cardona@ac-montpellier;fr");
titre_introduction("CONJUGAISON");
introduction("Cet exercice vous permet de vérifier votre maitrise des homophones.");
nombre_questions("5","10");
bouton_sup("MODE D'EMPLOI","pages/mode_emploi.html");
url_quitter("");

coef_rep_juste("2");
coef_rep_fausse("-1");
coef_rep_nulle("0");
note_sur("20");

appreciation("16","20","C'est très bien !||Parfait !||Excellent travail !");
appreciation("13","16","Bon travail !");
appreciation("10","13","Ensemble moyen.");
appreciation("6","10","Vous pourriez revoir votre cours, puis tenter à nouveau ces exercices.");
appreciation("0","6","Ne vous découragez pas !||Etudiez votre cours avant de retenter ces exercices.");
non_termine("Vous avez quitté l'exercice sans avoir répondu à toutes les questions !");

juste("Parfait !||Excellent !||Juste !||Correct !||Bravo !||Bonne réponse !||C'est très bien!");
faux("Non...||Faux...||Erreur...||Inexact...||Dommage!");
abandon("Tentez de répondre la prochaine fois !||Ne vous découragez-pas!");


// LE QUESTIONNAIRE


theme("Homophones");

debut("Voici une série de questions sur les homophones.");

quest("C'EST ou S'EST ?");
rep("[*C'est*||S'est[v] en forgeant qu'on devient forgeron.");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe. Observez aussi la position du mot dans la phrase...");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("C'EST ou S'EST - CES ou SES ?");
rep("[C'est||*S'est*[v]-il aperçu de [ces||*ses*[v] erreurs ?");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("C'EST ou S'EST - CES ou SES");
rep("Quand on fait des efforts, [*c'est*||s'est[v] bien. Quand on persévère malgré [ces||*ses*[v] erreurs, [*c'est*||s'est[v] encore mieux.");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("C'EST ou S'EST - C'ÉTAIT ou S'ÉTAIT ?");
rep("Il [c'est||*s'est*[v] dit qu'il pourrait y arriver seul, mais il a vite compris que [*c'était*||s'était[v] plus difficile qu'il ne l'avait pensé.");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("CES ou SES ?");
rep("[*Ces*||Ses[v] roches ont roulé à [ces||*ses*[v] pieds.");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("CE FUT ou SE FUT");
rep("[*Ce fut*||Se fut[v] d'abord sa mère qui lui en parla.");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("ON ou ONT ?");
rep("[*On*||ont[v] peut dire qu'ils [on||*ont*[v] eu beaucoup de chance.");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("ON ou ONT ?");
rep("Sait-[*on*||ont[v] à qui ils [on||*ont*[v] confié ce secret ?");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("-É ou -ER ?");
rep("Pouvez-vous imagin[é||*er*[v] à quel point il a été choqu[*é*||er[v] ?");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");

quest("-É ou -ER ?");
rep("Il ne faut pas leur donn[é||*er*[v] à mang[é||*er*[v] après minuit. Sinon, ils pourraient se transform[é||*er*[v] en monstres, et le quartier serait dévast[*é*||er[v].");
debut("Pour choisir le mot, essayez de le remplacer mentalement par un autre mot de la même classe. Ou bien, faites varier le temps si c'est un verbe, etc.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Vous n'avez pas effectué le bon remplacement : il faut être plus attentif !");
abandon("Dommage, cette question était facile.");
