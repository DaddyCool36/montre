function afficheur7Segments(ctx) {
  /*
  * declaration des segments pour afficheur 7 segments. L'identifiant 0 n'est pas utilisé pour le moment. Le 8 et 9 sont les carrés
  * à l'intérieur (ils représentent par exemple les séparateurs heure-minute)
  *   1
  * 6 8 2
  *   7
  * 5 9 3
  *   4
  */
  // liste des segments
  var segment1 = [[7,0],[65,0],[45,20],[25,20],[7,0]];
  var segment2 = [[68,1],[72,6],[72,54],[65,58],[47,50],[47,22],[68,1]];
	var segment3 = [[65,61],[72,64],[72,111],[65,120],[47,95],[47,71],[65,61]];
	var segment4 = [[63,122],[46,99],[25,99],[2,114],[10,122],[63,122]];
	var segment5 = [[0,112],[0,65],[8,61],[24,71],[24,96],[0,112]];
	var segment6 = [[8,59],[24,50],[24,23],[5,2],[0,7],[0,54],[8,59]];
	var segment7 = [[11,60],[26,52],[45,52],[62,60],[45,69],[26,69],[11,60]];
	var segment8 = [[29,28],[46,28],[46,48],[29,48],[29,28]];
	var segment9 = [[29,76],[46,76],[46,96],[29,96],[29,76]];
  // tous les segments rassemblés en un tableau
  var tabSegmentsModele = [this.segment1, this.segment2, this.segment3, this.segment4, this.segment5, this.segment6, this.segment7, this.segment8, this.segment9];
  // segments qui seront affichés
  var tabSegmentsAffichage = [];
  
  // point de référence
  this.origineX = 0;
  this.origineY = 0;
  this.echelle = 100;

  // valeur à afficher
  this.valeur = null;
  // couleur
  this.couleurSegmentPlein = "hsl(0, 0%, 15%)";
  this.couleurSegmentContour = "hsl(0, 0%, 35%)";
  
  this.effacer = function() {
    ctx.clearRect(this.origineX, this.origineY, this.origineX + ( 72 * this.echelle / 100), this.origineY + ( 122 * this.echelle / 100));
    ctx.beginPath();
    //dessinerFondGris();

    ctx.fillStyle = tabConstantes.couleurChiffrePlein;
    ctx.strokeStyle = tabConstantes.couleurChiffreContour;
  };
  
  
  
    
  this.dessiner = function() {
    this.calculerAffichageDesSegments();
    
    if (this.tabSegmentsAffichage == null || this.tabSegmentsAffichage.length == 0) {
			return;
		}
		
		for (var i = 0 ; i < this.tabSegmentsAffichage.length ; i ++) {
			this.tracerSegment(this.tabSegmentsAffichage[i]);
		}
  }
  
  // Cette fonction calcule les segments qu'il faut afficher pour correspondre à la valeur. 
  // le tableau tabSegmentsAffichage contiendra les segments à afficher.
  function calculerAffichageDesSegments () {
    this.tabSegmentsAffichage = [];
		if (this.valeur === null) {
			return;
		}
		
		if (this.valeur < 10) {
			// factorisation des tests
			if (this.valeur != 1) {
				if (this.valeur != 4) {
					this.tabSegmentsAffichage.push(1);
					if (this.valeur != 7) {
						this.tabSegmentsAffichage.push(4);
						if (this.valeur % 2 == 0) {
							this.tabSegmentsAffichage.push(5);
						}
					}
				}
				if (this.valeur != 7) {
					if (this.valeur != 0) {
						this.tabSegmentsAffichage.push(7);
					}
					if (this.valeur != 2 && this.valeur != 3) {
						this.tabSegmentsAffichage.push(6);
					}
				}
			}
			
			// pour le segment 2
			if (this.valeur != 5 && this.valeur != 6) {
				this.tabSegmentsAffichage.push(2);
			}
			// pour le segment 3
			if (this.valeur != 2) {
				this.tabSegmentsAffichage.push(3);
			}
		}
		// pour les séparateurs
		if (this.valeur == 10) {
			this.tabSegmentsAffichage.push(8);
			this.tabSegmentsAffichage.push(9);
		}
  }
  
  // Traçage du segment demandé.
  function tracerSegment(identifiantDuSegment) {
    var coordonnees = this.tabSegmentsModele[identifiantDuSegment];
		
		for (var i = 0 ; i < coordonnees.length ; i ++) {
			var x = coordonnees[i][0];
			var y = coordonnees[i][1];
			
			if (i == 0) {
				ctx.moveTo(this.origineX + ( x * this.echelle / 100), this.origineY + ( y * this.echelle / 100)); 
			} else {
				ctx.lineTo(this.origineX + ( x * this.echelle / 100), this.origineY + ( y * this.echelle / 100)); 
			}
		}
		
		ctx.stroke();
		ctx.fill();
  }
}