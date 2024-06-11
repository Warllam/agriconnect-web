export interface Capteur {
    id: number;
    longitude: number;
    latitude: number;
    temperature: number;
    humidite: number;
    intervalle: number;
}

export interface Actionneur {
    id: number;
    etat: EtatActionneur;
    longitude: number;
    latitude: number;
}

export enum EtatActionneur {
    ACTIVE = "ACTIVE",
    DESACTIVE = "DESACTIVE"
}

export interface Releve {
    id: number;
    dateReleve: string;
    humidite: number;
    temperature: number;
    idCapteur: number;
}
