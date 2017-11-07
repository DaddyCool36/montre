// fichier javascript principal

/**
* Inclusion d'autres fichiers javascript
*/

function include (nomDuFichier) {
	var header = document.createElement('script');
	header.type = 'text/javascript';
	header.src = nomDuFichier;
	document.head.appendChild(header);

}

	
$(function(){ 
	// modes de la montre : 
	// 0 = heure
	montreMode = 0;

	var lcd1 = new LCD();
	lcd1.init();
	lcd1.update();
	
	
	
	
})