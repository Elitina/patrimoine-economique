// THIS MAY CHANGE IN THE FUTURE
// dateDebut = 01/01/2024
// montant = 400_000
// jour = 1
import Possession from "./Possession.js";
export default class Flux extends Possession {
  // Si salaire => +
  // Si train de vie => -
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement)
    this.valeur = 0;
    this.jour = jour;
    // this.source = source; // null || Compte
    // this.destination = destination; // Compte
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.valeurConstante = valeur
  }


<<<<<<< HEAD:ui/Patrimoine/src/models/possessions/Flux.js
getValeur(date) {

=======
  getValeur(date) {
>>>>>>> 23599c72b1c1c2aff0f36f8758caf09a8691d0d4:models/possessions/Flux.js
    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
      let compteur = 0;

      if (debut.getDate() < jourJ) {
        compteur++;
      }

      if (dateEvaluation.getDate() >= jourJ && !(debut.getFullYear() === dateEvaluation.getFullYear() && debut.getMonth() === dateEvaluation.getMonth())) {
        compteur++;
      }

      let totalMois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 + (dateEvaluation.getMonth() - debut.getMonth()) - 1;

      compteur += Math.max(0, totalMois);

      return compteur;
    };

    // Calculer le montant total sans modifier this.valeur
    const totalMois = nombreDeMois(this.dateDebut, date, this.jour);
    const montantTotal = totalMois * this.valeurConstante;

    return montantTotal;
  }
}