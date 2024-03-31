import { CarClass } from "./CarClass";

export type RaceEvent = {
    _id?: string;
    name: string;
    date: number[];
    track: string;
    description: string;
    participants: string[];
    carClasses: CarClass[];
    imageURI: string;
}