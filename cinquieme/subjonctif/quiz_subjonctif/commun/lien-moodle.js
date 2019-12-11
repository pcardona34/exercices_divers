// Lien de retour vers le cours Moodle

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
// Get object of URL parameters
// var allVars = $.getUrlVars();

// Getting URL var by its nam
// var byName = $.getUrlVar('name');

	var id = $.getUrlVar('id');
	if ( id === undefined ) id = 374;
	var nomducours = $.getUrlVar('nomducours');
	if ( nomducours === undefined ) nomducours = "FR5E_CAR";
	
	var url = "http://www.environnementnumeriquedetravail.fr/moodle/course/view.php?id=" + id;
	var finh = " &gt; ";
	var lien = "<a href=\"" + url + "\">" + nomducours + "</a>";
	var texte = lien + " " + finh ;
	$(window).load(function() {
		$( "#titre" ).prepend(texte);
	});
	$( "a#lien" ).click(function() {alert(url)});
	

