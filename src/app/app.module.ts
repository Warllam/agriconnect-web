import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { TooltipPosition, MatTooltipModule } from "@angular/material/tooltip";
import {AppComponent} from "./app.component";
import {AgGridAngular} from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";


const appRoutes: Routes = [
    { path: "**", component: AppComponent },
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatTooltipModule,
        AgGridAngular,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
