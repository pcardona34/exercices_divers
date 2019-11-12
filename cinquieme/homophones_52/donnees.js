// LES OPTIONS

mode_presentation("1");
mode_evaluation("1");
mode_sauvegarde("1");
mel("patrick.cardona@ac-montpellier;fr");
titre_introduction("ORTHOGRAPHE");
introduction("Cet exercice vous permet de vérifier votre maîtrise des homophones.");
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


theme("Les homophones : série 52");

debut("Voici une série de questions sur les homophones.");

quest("A ou À ?");
rep("Il [*a*||à[v] souvent pensé [a||*à*[v] son ami.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("C'EST, CES ou SES ?");
rep("[*C'est*||Ces||Ses[v] en consultant sa leçon qu'il a pu comprendre [c'est||*ces*||ses[v] règles difficiles et améliorer [c'est||ces||*ses*[v] résultats.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("ON ou ONT ?");
rep("Quand [*on*||ont[v] pense qu'ils [on||*ont*[v] réussi à franchir l'obstacle, [*on*||ont[v] se dit qu'ils [on||*ont*[v] eu beaucoup de chance.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("MAI, MAIS, M'EST ou MET ?");
rep("Quand on [mai||mais||m'est||*met*[v] des cerises sur la table au mois de [*mai*||mais||m'est||met[v], on pense aux beaux jours de l'été, [mai||*mais*||m'est||met[v] il [mai||mais||*m'est*||met[v] aussi agréable de penser aux fruits de l'automne, aux pomme brillantes et sucrées qu'on [mai||mais||m'est||*met*[v] dans la compote.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("C'ÉTAIT ou S'ÉTAIT ?");
rep("Il [c'était||*s'était*[v] passé bien des jours avant qu'il ne revienne : [*c'était*||s'était[v] au cours de l'automne et mon frère [c'était||*s'était*[v] blessé à la chasse.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("QUAND, QUANT ou QU'EN ?");
rep("[*Quand*||Quant||Qu'en[v] mon frère est revenu, il n'a pas voulu savoir ce [quand||quant||*qu'en*[v] pensaient les voisins. [Quand||*Quant*||Qu'en[v] à mon père, je crois qu'il ne fallait pas lui en parler.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("CI, SI ou S'Y ?");
rep("Il était [ci||*si*||s'y[v] troublé par la profondeur du lac que cette fois-[*ci*||si||s'y[v] il ne voulut pas [ci||si||*s'y*[v] aventurer.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("AUTEL, AU TÉL, HÔTEL ?");
rep("Je l'ai eu [autel||*au tél*||hôtel[v] hier soir, avant qu'il ne dorme à son [autel||au tél||*hôtel*[v]. Je suis impatiente : demain, devant l'[*autel*||au tél||hôtel[v], nous échangerons nos alliances.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("CHŒUR ou CŒUR ?");
rep("Je n'ai jamais chanté dans un tel [*chœur*||cœur[v]. L'acoustique est superbe et les interprètes ont à [chœur||*cœur*[v] de toucher le public.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");

quest("-É ou -ER ?");
rep("Je n'ai jamais chant[*é*||er[v] avec autant de joie. J'ai pu touch[é||*er*[v] le public et je l'ai senti vibr[é||*er*[v] avec moi. Je suis heureux d'avoir partag[*é*||er[v] ce moment et j'espère pouvoir recommenc[é||*er*[v] bientôt.");
debut("Pour effectuer le bon choix, pensez à remplacer le mot par autre mot de la même classe grammaticale.");
juste("C'est exact, vous avez bien choisi !");
faux("Attention ! Soyez plus attentif.ive !");
abandon("Dommage, cette question était facile.");




