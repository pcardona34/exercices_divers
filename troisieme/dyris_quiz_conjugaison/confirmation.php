<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<title>Scores</title>
<link rel="stylesheet" href="style.css">
<script>
// Page affichée pour le mode évaluation 2
ch=[];
// Fonctions appelées par le fichier "textes.js"
function titre() {}
function bouton() {}
function fenetre() {}
function mot() {}
function score(a) { ch[ch.length]=a; }
<?php
// Récupération et enregistrement du score dans le fichier "scores.txt"
$score=$_GET['enr'];
if (strlen($score)!=0) {
	$fichier=fopen("scores.txt","a+");
	$entree=$score."\n";
	fputs($fichier,$entree);
	fclose($fichier);
}
// Envoi d'un mél
$mel=$_GET['mel'];
$sujet=$_GET['sujet'];
$contenu=$_GET['contenu'];
if ($mel!="aucun") { mail($mel,$sujet,$contenu); }
?>
onload=function() {
	var txt='<div class="message">'+ch[7]+'</div>';
	txt+='<div id="menu"><button type="button" onclick="self.close();">'+ch[5]+'</button></div>';
	document.body.innerHTML=txt;
};
</script>
<script src="textes.js"></script>
</head>

<body></body>

</html>

