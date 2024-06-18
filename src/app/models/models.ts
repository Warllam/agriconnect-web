export interface Capteur {
    id: number;
    longitude: number;
    latitude: number;
    temperature: number;
    humidite: number;
    intervalle: number;
    idUtilisateur: number;
}

export enum EtatActionneur {
    ACTIVE = "ACTIVE",
    DESACTIVE = "DESACTIVE"
}

export interface Actionneur {
    id: number;
    etat: EtatActionneur;
    longitude: number;
    latitude: number;
}

export interface Releve {
    id: number;
    dateReleve: string;
    humidite: number;
    temperature: number;
    idCapteur: number;
}

export interface Utilisateur {
    id: number;
    nom: string;
    prenom: string;
    capteurs: Capteur[];
    actionneurs: Actionneur[];
}

export interface Limite {
    id: number;
    idCapteur: number;
    idActionneurTemp: number;
    idActionneurHum: number;
    limitTemp: number;
    limitHum: number;
    dureeActionneurTemp: number;
    dureeActionneurHum: number;
}

export interface Historique {
    id: number;
    idActionneur: number;
    date: string;
    duree: number;
}

export interface ActionneurStat {
    dureeMoy?: number;
    nombreActivation?: number;
}

export interface CapteurStat {
    tempAct?: number;
    hygroAct?: number;
}

export interface Statistique {
    [key: string]: ActionneurStat | CapteurStat;
}

