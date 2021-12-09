import { Gasolinera } from "./gasolinera";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    favGasolineras : Gasolinera[]
 }