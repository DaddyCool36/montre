// CasioG7900
// Afficheur 7 segments
var tabConstantes = {	
		largeurSupport : 500, // par défaut
		hauteurSupport : 500, // par défaut
		//couleurFond : "hsl(80, 20%, 80%)",
		couleurChiffrePlein : "hsl(0, 0%, 15%)",
		couleurChiffreContour : "hsl(0, 0%, 35%)",
		echelle : 100,
		};

// contexte		
var ctx;

// declaration des segments pour afficheur 7 segments. Le 0 n'est pas utilisé pour le moment. Le 8 et 9 sont les carrés
// à l'intérieur représentants donc les séparateurs heure-minute
//   1
// 6 8 2
//   7
// 5 9 3
//   4
var segment = [
	// 0
	[], 
	// 1
	[[7,0],[65,0],[45,20],[25,20],[7,0]], 
	// 2
	[[68,1],[72,6],[72,54],[65,58],[47,50],[47,22],[68,1]], 
	// 3
	[[65,61],[72,64],[72,111],[65,120],[47,95],[47,71],[65,61]], 
	// 4
	[[63,122],[46,99],[25,99],[2,114],[10,122],[63,122]], 
	// 5
	[[0,112],[0,65],[8,61],[24,71],[24,96],[0,112]], 
	// 6
	[[8,59],[24,50],[24,23],[5,2],[0,7],[0,54],[8,59]], 
	// 7
	[[11,60],[26,52],[45,52],[62,60],[45,69],[26,69],[11,60]], 
	// 8
	[[29,28],[46,28],[46,48],[29,48],[29,28]],
	// 9
	[[29,76],[46,76],[46,96],[29,96],[29,76]],
	
];
	
var chiffre = function (){
	this.valeur = 0;
	this.origineX = 50;
	this.origineY = 15;
	//this.epaisseur = 20; pas encore utilisé
	this.echelle = 100;
	this.afficher = true;
	this.tabSegments = [];
	
	
	this.dessiner = function () {
		this.valeurVersSegments();
		if (this.tabSegments == null || this.tabSegments.length == 0) {
			return;
		}
		
		for (var i = 0 ; i < this.tabSegments.length ; i ++) {
			this.tracerSegment(this.tabSegments[i]);
		}
	};

	this.tracerSegment = function (segmentATracer){
		if (!this.afficher) {
			return;
		}
	
		var coordonnees = segment[segmentATracer];
		
		for (var i = 0 ; i < coordonnees.length ; i ++) {
			x = coordonnees[i][0];
			y = coordonnees[i][1];
			
			larg = tabConstantes.largeurSupport;
			haut = tabConstantes.hauteurSupport;
			
			if (i == 0) {
				ctx.moveTo(this.origineX + ( x * this.echelle / 100), this.origineY + ( y * this.echelle / 100)); 
			} else {
				ctx.lineTo(this.origineX + ( x * this.echelle / 100), this.origineY + ( y * this.echelle / 100)); 
			}
		}
		
		ctx.stroke();
		ctx.fill();

	};
	
	this.valeurVersSegments = function() {

		this.tabSegments = [];
		/*
		if (this.valeur > 9) {
			segment1(moimeme);
			segment4(moimeme);
			segment5(moimeme);
			segment6(moimeme);
			segment7(moimeme);
			return;
		}*/
		if (this.valeur < 0) {
			return;
		}
		
		if (this.valeur < 10) {
			// factorisation des tests
			if (this.valeur != 1) {
				if (this.valeur != 4) {
					this.tabSegments.push(1);
					if (this.valeur != 7) {
						this.tabSegments.push(4);
						if (this.valeur % 2 == 0) {
							this.tabSegments.push(5);
						}
					}
				}
				if (this.valeur != 7) {
					if (this.valeur != 0) {
						this.tabSegments.push(7);
					}
					if (this.valeur != 2 && this.valeur != 3) {
						this.tabSegments.push(6);
					}
				}
			}
			
			// pour le segment 2
			if (this.valeur != 5 && this.valeur != 6) {
				this.tabSegments.push(2);
			}
			// pour le segment 3
			if (this.valeur != 2) {
				this.tabSegments.push(3);
			}
		}
		// pour les séparateurs
		if (this.valeur == 10) {
			this.tabSegments.push(8);
			this.tabSegments.push(9);
		}
	}

};

var dessinerFondGris = function () {
	ctx.fillStyle = tabConstantes.couleurFond;
	ctx.fillRect(0, 0, tabConstantes.largeurSupport, tabConstantes.hauteurSupport);
	ctx.fill();
};

var effacer = function() {
	ctx.clearRect(0, 0, tabConstantes.largeurSupport, tabConstantes.hauteurSupport);
	ctx.beginPath();
	//dessinerFondGris();
	
	ctx.fillStyle = tabConstantes.couleurChiffrePlein;
	ctx.strokeStyle = tabConstantes.couleurChiffreContour;
};
	



		
var getContext = function () {
	var canvas = $("#CasioG7900")[0];
	if(!canvas)
	{
		console.log("Impossible de récupérer le canvas");
		return null;
	}
	
	var ctx = canvas.getContext('2d');
	if(!ctx)
	{
		console.log("Impossible de récupérer le context du canvas");
		return null;
	}
	return ctx;
};

var LCD = function () {

	var self = this;
	
	ctx = getContext();
	effacer();
	
	var nbChiffres = 7;
	var tabChiffres = Array(nbChiffres);
	
	
	this.init = function() {
	
		for (var i = 0 ; i < nbChiffres ; i ++) {
			tabChiffres[i] = new chiffre();
			tabChiffres[i].afficher = true;
			tabChiffres[i].valeur = 0;
		}
		
		var maDiv = $("#afficheur7Segments")[0];
		tabConstantes.largeurSupport = maDiv.clientWidth;
		tabConstantes.hauteurSupport = tabConstantes.largeurSupport / 4.23;
		maDiv.height = tabConstantes.hauteurSupport + 'px' ;
		
		var canv = $("#CasioG7900")[0];
		canv.width = tabConstantes.largeurSupport;
		canv.height = tabConstantes.hauteurSupport ;

		// echelle des chiffres
		tabChiffres[0].echelle = tabConstantes.largeurSupport / 5.21;
		tabChiffres[1].echelle = tabChiffres[0].echelle;
		tabChiffres[2].echelle = tabChiffres[0].echelle;
		tabChiffres[3].echelle = tabChiffres[0].echelle;
		tabChiffres[4].echelle = tabChiffres[0].echelle;
		tabChiffres[5].echelle = tabChiffres[4].echelle * 0.75;
		tabChiffres[6].echelle = tabChiffres[5].echelle;

		// Heure
		// dizaine
		tabChiffres[0].origineX = 1;
		tabChiffres[0].origineY = 1;
		
		
		// unite
		tabChiffres[1].origineX = tabChiffres[0].echelle - (tabChiffres[0].echelle * 0.12); 
		tabChiffres[1].origineY = tabChiffres[0].origineY;

		// séparateur heure-minute
		tabChiffres[2].origineX = tabChiffres[1].origineX + (tabChiffres[1].echelle * 0.65); 
		tabChiffres[2].origineY = tabChiffres[1].origineY;
		tabChiffres[2].valeur = 10;
		
		// minutes
		// dizaine
		tabChiffres[3].origineX = tabChiffres[1].origineX + (tabChiffres[1].echelle * 1.33);
		tabChiffres[3].origineY = tabChiffres[0].origineY;
		// unite
		tabChiffres[4].origineX = tabChiffres[3].origineX + (tabChiffres[3].echelle * 0.85);
		tabChiffres[4].origineY = tabChiffres[3].origineY;

		// secondes
		// dizaine
		tabChiffres[5].origineX = tabChiffres[4].origineX + (tabChiffres[4].echelle * 0.95); 
		tabChiffres[5].origineY = tabChiffres[4].origineY + (tabChiffres[4].echelle * 0.30);
		// unite
		tabChiffres[6].origineX = tabChiffres[5].origineX + (tabChiffres[4].echelle * 0.65); 
		tabChiffres[6].origineY = tabChiffres[5].origineY;
		
	};
	
	this.afficherHeure = function() {
		var maDate = new Date();
		
		
		
		// heures
		// dizaine
		tabChiffres[0].valeur = Math.floor(maDate.getHours() / 10);
		tabChiffres[0].afficher = true;
		// on n'affiche pas le 0 des dizaines de l'heure.
		if (tabChiffres[0].valeur == 0) {
			tabChiffres[0].afficher = false;
		}
		tabChiffres[1].valeur = maDate.getHours() - (tabChiffres[0].valeur * 10);
		
		tabChiffres[3].valeur = Math.floor(maDate.getMinutes() / 10);
		tabChiffres[4].valeur = maDate.getMinutes() - (tabChiffres[3].valeur * 10);
		
		var deciSeconde = Math.floor(maDate.getMilliseconds() / 100);
		tabChiffres[2].afficher = false;
		if (deciSeconde < 5 ) {
			tabChiffres[2].afficher = true;
		}
		
		tabChiffres[5].valeur = Math.floor(maDate.getSeconds() / 10);;
		tabChiffres[6].valeur = maDate.getSeconds() - (tabChiffres[5].valeur * 10);

	};
	

	this.avancer = function() {
	
		// Attention ! ici c'est le mode d'affichage du LCD
		// 0 : Heure - Minutes - Secondes
		if (montreMode == 0) {
			self.afficherHeure();

		}
	};
	
	this.dessiner = function() {
		effacer();
		for(var i = 0 ; i < nbChiffres ; i ++ ) {
			tabChiffres[i].dessiner();
		}
	};
	
	this.update = function() {
		self.avancer();
		self.dessiner();
		window.requestAnimationFrame(self.update);
	};
	

}



$(function(){ 
	
	
})
