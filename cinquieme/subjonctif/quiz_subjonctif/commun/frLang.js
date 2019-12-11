/*
Programmer: Larry Battle
Date: May 17, 2011
Purpose: This file provides a template for jQuizMe language object. 
The variable SHORT-LANGUAGE-CODE_Lang is the object template.
The variable default_Langauge is jQuizMe default language object.
More information here: http://code.google.com/p/jquizme/wiki/Translations
*/

var frLang = {
                ans:{   // The "ans" attributes are shown during the display of .q-result(the answer result).
                        corrAns: "Réponse attendue :",
                        praise: 'Bon travail. Exact !',
                        whyAns: "Info :",
                        retry: "Erreur. Proposez une autre réponse.",
                        yourAns: "Votre réponse :"
                },
                btn:{   
                // [ "text", "title" ], 
                // The button will display the text, and show the title when the user hover over the button.
                // The "title" is not required.
                        begin: [ "Commencer" ],
                        check: [ "Vérifier", "Vérifier votre réponse" ],
                        del: [ "Fermer", "Fermer cet exercice" ],
                        help: [ "Aide", 'Cliquez pour afficher une aide'],
                        next: [ "Suivant", "Question suivante" ],
                        restart: [ "Recommencer", "Recommencer depuis le début" ],
                        details: [ "Détails", "Voir le bilan" ],
                        review: [ "Résumé", "Revoir les questions" ],
                        showOnlyMissed: [ " *", "Cliquez pour voir seulement les questions manquées." ],
                        quit: [ "Bilan", "Afficher le bilan" ],
                        quitNo: [ "->", "Revenir" ],
                        quitYes: [ '', "Oui, quitter" ]
                },
                err:{
                        badQType: "Type de questionnaire non valide.",
                        badKey: " n'est pas une clé valable.",
                        error: "Erreur", 
                        noQType: "Aucun type de questionnaire.",
                        noQues: "Le questionnaire ne comporte aucune question.",
                        notArr: "Doit être un tableau.",
                        notObj: "Structure du questionnaire non conforme. On attend un tableau."
                },
                stats:{
                        right: "Exact",
                        rate: "Taux",
                        score: "Score",
                        wrong: "Faux",
                        total: "Total",
                        tried: "Essais"
                },
                quiz:{
                        tfEqual: " <br/>=<br/> ",
                        tfFalse: "Faux",
                        tfTrue: "Vrai"
                }
        };