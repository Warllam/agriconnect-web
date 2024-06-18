import { Component } from '@angular/core';
import {Actionneur, Capteur, EtatActionneur} from "../../models/models";
import {AgApiService} from "../../services/ag-api.service";

@Component({
  selector: 'app-dashboard-agriculteur',
  templateUrl: './dashboard-agriculteur.component.html',
  styleUrl: './dashboard-agriculteur.component.css'
})
export class DashboardAgriculteurComponent {
  capteurs: Capteur[] = [];
  actionneurs: Actionneur[] = [];
  editCapteur: Capteur | null = null;
  editActionneur: Actionneur | null = null;

  constructor(private apiService: AgApiService) {}

  ngOnInit() {
    this.loadCapteurs();
    this.loadActionneurs();
  }

  // Méthodes pour les Capteurs
  loadCapteurs() {
    this.apiService.getCapteurs().subscribe(data => this.capteurs = data);
  }

  updateCapteur() {
    if (this.editCapteur) {
      this.apiService.updateCapteur(this.editCapteur.id, this.editCapteur).subscribe({
        next: (updatedCapteur) => {
          const index = this.capteurs.findIndex(c => c.id === updatedCapteur.id);
          this.capteurs[index] = updatedCapteur;
          this.editCapteur = null;  // Clear the edit form
        },
        error: (err) => alert('Error updating capteur: ' + err.message)
      });
    }
  }

  setEditCapteur(capteur: Capteur) {
    this.editCapteur = { ...capteur };
  }

  // Méthodes pour les Actionneurs
  loadActionneurs() {
    this.apiService.getActionneurs().subscribe(data => this.actionneurs = data);
  }

  updateActionneur() {
    if (this.editActionneur) {
      this.apiService.updateActionneur(this.editActionneur.id, this.editActionneur).subscribe({
        next: (updatedActionneur) => {
          const index = this.actionneurs.findIndex(a => a.id === updatedActionneur.id);
          this.actionneurs[index] = updatedActionneur;
          this.editActionneur = null;  // Clear the edit form
        },
        error: (err) => alert('Error updating actionneur: ' + err.message)
      });
    }
  }

  setEditActionneur(actionneur: Actionneur) {
    this.editActionneur = { ...actionneur };
  }

  triggerActionneur(id: number) {
    this.apiService.triggerActionneur(id).subscribe({
      next: () => {
        const actionneur = this.actionneurs.find(a => a.id === id);
        if (actionneur) {
          // Utilisez l'enum pour comparer et assigner la nouvelle valeur
          actionneur.etat = actionneur.etat === EtatActionneur.ACTIVE ? EtatActionneur.DESACTIVE : EtatActionneur.ACTIVE;
        }
      },
      error: (err) => alert('Error triggering actionneur: ' + err.message)
    });
  }
}

