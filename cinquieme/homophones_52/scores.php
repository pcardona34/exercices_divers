<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<title>Scores</title>
<link rel="stylesheet" href="style.css">
<script>
// Page affichée pour le mode évaluation 1
ch=[];
note=[];
// Fonctions appelées par le fichier "textes.js"
function titre() {}
function bouton() {}
function fenetre() {}
function mot() {}
function score(a) { ch[ch.length]=a; }
// Valeur de la note
function valeur(n) {
	if (n.charAt(0)=="-") return -1;
	else return eval(n);
}
<?php
// Récupération et enregistrement du score dans le fichier "scores.txt"
if (isset($_GET['enr'])) {
	$score=$_GET['enr'];
	if (strlen($score)!=0) {
		$fichier=fopen("scores.txt","a+");
		$entree=$score."\n";
		fputs($fichier,$entree);
		fclose($fichier);
	}
}
// Lecture du fichier "scores.txt" et création du tableau à deux entrées $note[$i][$j]
$ligne=file("scores.txt");
$note=array();
$verif=array();
$ind=0;
for($i=0; $i<count($ligne); $i++) {
	$verif[$i]=split("§", $ligne[$i]);
	if (count($verif[$i])==5) {
		$note[$ind]=split("§", $ligne[$i]);
		$note[$ind][4]=rtrim($note[$ind][4]);
		$ind++;
	}
}
// Conversion du tableau PHP en tableau JS
for ($i=0; $i<count($note); $i++) {
	echo "note[".$i."]=[];\n";
	for ($j=0;$j<5;$j++) { echo "note[".$i."][".$j."]='".$note[$i][$j]."';\n"; }
}
?>
// Ordonnancement du tableau à deux entrées note[i][j] selon les notes obtenues
for (i=0; i<note.length; i++) {
	var sauv=[];
	var max=i;
	for (var j=i; j<note.length; j++) { if (valeur(note[j][4])>valeur(note[max][4])) max=j; }
	if (max!=i) {
		for (var k=0; k<5; k++) {
			sauv[k]=note[i][k];
			note[i][k]=note[max][k];
			note[max][k]=sauv[k];
		}
	}
}
onload=function() {
	var i,j, txt='<table>';
	txt+='<tr><th>'+ch[0]+'</th><th>'+ch[1]+'</th><th>'+ch[2]+'</th><th>'+ch[3]+'</th><th>'+ch[4]+'</th></tr>';
	for (i=0; i<note.length; i++) {
		txt+='<tr>';
		for (j=0; j<5; j++) { txt+='<td>'+note[i][j]+'</td>'; }
		txt+='</tr>';
	}
	txt+='</table><div id="menu"><button type="button" onclick="effacer();">'+ch[6]+'</button>';
	txt+='<button type="button" onclick="self.close();">'+ch[5]+'</button></div>';
	document.body.innerHTML=txt;
};
</script>
<script src="textes.js"></script>
</head>

<body></body>

</html>

