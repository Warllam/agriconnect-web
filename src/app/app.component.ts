import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Actionneur, Capteur, EtatActionneur, Historique, Limite, Releve} from "./models/models";
import { AgApiService } from "./services/ag-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  capteurs: Capteur[] = [];
  releves: Releve[] = [];
  actionneurs: Actionneur[] = [];
  limites: { [key: number]: Limite } = {}; // Dictionnaire pour stocker les limites par ID capteur

  actionneurDefaut: Actionneur = {
    id: 0,
    etat: EtatActionneur.DESACTIVE,
    longitude: 0,
    latitude: 0
  };
  capteurDefaut: Capteur = {
    id: 0,
    longitude: 0,
    latitude: 0,
    temperature: 0,
    humidite: 0,
    intervalle: 0,
    idUtilisateur: 0
  };
  limiteDefaut: Limite = {
    id: 0,
    idCapteur: 0,
    idActionneurTemp: 0,
    idActionneurHum: 0,
    limitTemp: 0,
    limitHum: 0,
    dureeActionneurTemp: 0,
    dureeActionneurHum: 0
  };

  currentCapteur: Capteur = this.capteurDefaut;
  currentActionneur: Actionneur = this.actionneurDefaut;
  currentLimite: Limite = this.limiteDefaut;
  isEditingCapteur = false;
  isAddingCapteur = false;
  isEditingActionneur = false;
  isAddingActionneur = false;
  isEditingLimite = false;
  isAddingLimite = false;
  historiques: Historique[] = [];

  constructor(private apiService: AgApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.getCapteurs().subscribe(data => {
      this.capteurs = data;
      data.forEach(capteur => {
        this.apiService.getLimiteByCapteurId(capteur.id).subscribe(limite => {
          this.limites[capteur.id] = limite; // Stocker les limites récupérées
        });
      });
    });
    this.apiService.getReleves().subscribe(data => {
      this.releves = data;
    });
    this.apiService.getActionneurs().subscribe(data => {
      this.actionneurs = data;
    });
  }

  getLimiteDisplay(idCapteur: number): string {
    if (this.limites[idCapteur]) {
      return `${this.limites[idCapteur].limitTemp}°C / ${this.limites[idCapteur].limitHum}%`;
    }
    return 'Non défini';
  }

  manageLimite(capteur: Capteur) {
    this.currentCapteur = capteur;
    this.currentLimite = this.limites[capteur.id] || null;
    if (this.currentLimite) {
      this.isEditingLimite = true;
    } else {
      this.isAddingLimite = true;
    }
  }

  submitLimiteForm() {
    if (this.isAddingLimite) {
      this.apiService.addLimite(this.currentCapteur.id, this.currentLimite!).subscribe(data => {
        this.limites[this.currentCapteur.id] = data;
        this.isAddingLimite = false;
        this.currentLimite = this.limiteDefaut;
      });
    } else if (this.isEditingLimite) {
      this.apiService.updateLimite(this.currentCapteur.id, this.currentLimite!).subscribe(data => {
        this.limites[this.currentCapteur.id] = data;
        this.isEditingLimite = false;
        this.currentLimite = this.limiteDefaut;
      });
    }
  }

  cancelEditLimite() {
    this.isAddingLimite = false;
    this.isEditingLimite = false;
    this.currentLimite = this.limiteDefaut;
  }

  addCapteur() {
    this.currentCapteur = {} as Capteur;
    this.isAddingCapteur = true;
  }

  editCapteur(capteur: Capteur) {
    this.currentCapteur = { ...capteur };
    this.isEditingCapteur = true;
  }

  deleteCapteur(id: number) {
    this.apiService.deleteCapteur(id).subscribe(() => {
      this.capteurs = this.capteurs.filter(c => c.id !== id);
    });
  }

  submitCapteurForm() {
    if (this.currentCapteur) {
      if (this.isAddingCapteur) {
        this.apiService.addCapteur(this.currentCapteur).subscribe(data => {
          this.capteurs.push(data);
          this.isAddingCapteur = false;
          this.currentCapteur = this.capteurDefaut;
        });
      } else if (this.isEditingCapteur) {
        this.apiService.updateCapteur(this.currentCapteur.id, this.currentCapteur).subscribe(() => {
          const index = this.capteurs.findIndex(c => c.id === this.currentCapteur!.id);
          this.capteurs[index] = this.currentCapteur!;
          this.isEditingCapteur = false;
          this.currentCapteur = this.capteurDefaut;
        });
      }
    }
  }

  cancelEditCapteur() {
    this.isAddingCapteur = false;
    this.isEditingCapteur = false;
    this.currentCapteur = this.capteurDefaut;
  }

  addActionneur() {
    this.currentActionneur = {} as Actionneur;
    this.isAddingActionneur = true;
  }

  editActionneur(actionneur: Actionneur) {
    this.currentActionneur = { ...actionneur };
    this.isEditingActionneur = true;
  }

  deleteActionneur(id: number) {
    this.apiService.deleteActionneur(id).subscribe(() => {
      this.actionneurs = this.actionneurs.filter(a => a.id !== id);
    });
  }
  triggerActionneur(actionneur: Actionneur) {
    actionneur.etat = EtatActionneur.ACTIVE;
    this.apiService.triggerActionneur(actionneur.id).subscribe(
        () => {
            actionneur.etat = EtatActionneur.DESACTIVE;
        },
        (error) => {
          console.error('Erreur lors du déclenchement de l\'actionneur:', error);
          // Désactiver l'actionneur en cas d'erreur
          actionneur.etat = EtatActionneur.DESACTIVE;
        }
    );
  }


  submitActionneurForm() {
    if (this.currentActionneur) {
      if (this.isAddingActionneur) {
        this.apiService.addActionneur(this.currentActionneur).subscribe(data => {
          this.actionneurs.push(data);
          this.isAddingActionneur = false;
          this.currentActionneur = this.actionneurDefaut;
        });
      } else if (this.isEditingActionneur) {
        this.apiService.updateActionneur(this.currentActionneur.id, this.currentActionneur).subscribe(() => {
          const index = this.actionneurs.findIndex(a => a.id === this.currentActionneur!.id);
          this.actionneurs[index] = this.currentActionneur!;
          this.isEditingActionneur = false;
          this.currentActionneur = this.actionneurDefaut;
        });
      }
    }
  }

  cancelEditActionneur() {
    this.isAddingActionneur = false;
    this.isEditingActionneur = false;
    this.currentActionneur = this.actionneurDefaut;
  }

  loadHistoriques(actionneurId: number) {
    this.apiService.getHistoriques(actionneurId).subscribe(data => {
      console.log("Here");
      this.historiques = data;
      console.log(this.historiques);
      if(this.historiques.length  === 0){
        console.log()
      }
      this.cdr.detectChanges();

    });
  }

}
