import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Actionneur, Capteur, Historique, Limite, Releve, Statistique, Utilisateur} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class AgApiService {
  private API_URL = "http://localhost:10000";

  constructor(private http: HttpClient) { }

  private get$(url: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${url}`).pipe(catchError(this.handleError));
  }

  private post$(url: string, body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${url}`, body).pipe(catchError(this.handleError));
  }

  private put$(url: string, body: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${url}`, body).pipe(catchError(this.handleError));
  }

  private delete$(url: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${url}`).pipe(catchError(this.handleError));
  }

  // Utilisateurs
  getUtilisateur(id: number): Observable<Utilisateur> {
    return this.get$(`api/utilisateurs/${id}`);
  }

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.get$('api/utilisateurs');
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.post$('api/utilisateurs', utilisateur);
  }

  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.put$(`api/utilisateurs/${id}`, utilisateur);
  }

  // Capteurs
  getCapteurs(): Observable<Capteur[]> {
    return this.get$('api/capteurs');
  }

  getCapteurById(id: number): Observable<Capteur> {
    return this.get$(`api/capteurs/${id}`);
  }

  getCapteursByUtilisateur(id: number): Observable<Capteur[]> {
    return this.get$(`api/utilisateurs/${id}/capteurs`);
  }

  addCapteur(capteur: Capteur): Observable<Capteur> {
    return this.post$('api/capteurs', capteur);
  }

  updateCapteur(id: number, capteur: Capteur): Observable<Capteur> {
    return this.put$(`api/capteurs/${id}`, capteur);
  }

  deleteCapteur(id: number): Observable<void> {
    return this.delete$(`api/capteurs/${id}`);
  }

  // Actionneurs
  getActionneurs(): Observable<Actionneur[]> {
    return this.get$('api/actionneurs');
  }

  getActionneurById(id: number): Observable<Actionneur> {
    return this.get$(`api/actionneurs/${id}`);
  }

  getActionneursByUtilisateur(id: number): Observable<Actionneur[]> {
    return this.get$(`api/utilisateurs/${id}/actionneurs`);
  }

  addActionneur(actionneur: Actionneur): Observable<Actionneur> {
    return this.post$('api/actionneurs', actionneur);
  }

  updateActionneur(id: number, actionneur: Actionneur): Observable<Actionneur> {
    return this.put$(`api/actionneurs/${id}`, actionneur);
  }

  deleteActionneur(id: number): Observable<void> {
    return this.delete$(`api/actionneurs/${id}`);
  }

  triggerActionneur(id: number): Observable<any> {
    //return this.post$(`api/actionneurs/trigger/${id}?duration=2`, {});
    return this.http.post(`http://localhost:10003/api/actionneurs/trigger/${id}?duration=2`, null);
  }

  // Relevés
  getReleves(): Observable<Releve[]> {
    return this.get$('api/releves');
  }

  getRelevesByCapteur(id: number): Observable<Releve[]> {
    return this.get$(`api/releves/capteur/${id}`);
  }

  getRelevesByDate(id: number, date: string): Observable<Releve[]> {
    return this.get$(`api/releves/capteur/${id}/${date}`);
  }

  addReleve(releve: Releve): Observable<Releve> {
    return this.post$('api/releves', releve);
  }

  //Limite
  addLimite(capteurId: number, limite: Limite): Observable<Limite> {
    return this.post$(`api/limites/${capteurId}`, limite);
  }

  updateLimite(capteurId: number, limite: Limite): Observable<Limite> {
    return this.put$(`api/limites/${capteurId}`, limite);
  }


  getLimiteByCapteurId(capteurId: number): Observable<Limite> {
    return this.get$(`api/limites/capteur/${capteurId}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error.message || error);
    return throwError(() => new Error(`Une erreur est survenue : ${error.status} ${error.statusText || ''} - ${error.error ? error.error.message : ''}`));
  }

  getHistoriques(actionneurId: number): Observable<Historique[]> {
    return this.get$(`api/historiques/actionneur/${actionneurId}`);
  }

  // Statistiques
  getStatistiques(utilisateurId: number): Observable<Statistique> {
    return this.get$(`api/statistiques/${utilisateurId}`);
  }

}
