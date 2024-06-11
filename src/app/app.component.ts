import { Component, OnInit } from '@angular/core';
import { Actionneur, Capteur, Releve } from "./models/models";
import { ColDef, GridOptions } from "ag-grid-community";
import { AgApiService } from "./services/ag-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Vérifiez que cette propriété est correctement nommée et référencée
})
export class AppComponent implements OnInit {
  capteurs: Capteur[] = [];
  releves: Releve[] = [];
  actionneurs: Actionneur[] = [];

  capteursColumnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'longitude' },
    { field: 'latitude' },
    { field: 'temperature' },
    { field: 'humidite' },
    { field: 'intervalle' }
  ];

  relevesColumnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'dateReleve' },
    { field: 'humidite' }, // Correction du nom de champ (de 'humitide' à 'humidite')
    { field: 'temperature' },
    { field: 'idCapteur' }
  ];

  actionneursColumnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'etat' },
    { field: 'longitude' },
    { field: 'latitude' }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    filter: true
  };

  capteursGridOptions: GridOptions = {
    columnDefs: this.capteursColumnDefs,
    defaultColDef: this.defaultColDef,
    animateRows: true
  };

  relevesGridOptions: GridOptions = {
    columnDefs: this.relevesColumnDefs,
    defaultColDef: this.defaultColDef,
    animateRows: true
  };

  actionneursGridOptions: GridOptions = {
    columnDefs: this.actionneursColumnDefs,
    defaultColDef: this.defaultColDef,
    animateRows: true
  };

  constructor(private apiService: AgApiService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.getCapteurs().subscribe(data => {
      //console.log(data);
      this.capteurs = data;
    });
    this.apiService.getRelevés().subscribe(data => {
      //.log(data);
      this.releves = data;
    });
    this.apiService.getActionneurs().subscribe(data => {
      //console.log(data);
      this.actionneurs = data;
    });
  }
}
