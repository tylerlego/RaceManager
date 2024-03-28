import { CarClass } from "./CarClass";

export type RaceEvent = {
    name: string;
    date: Date;
    track: string;
    description: string;
    maxParticipants: number;
    participants: string[];
    carClasses: CarClass[];
}