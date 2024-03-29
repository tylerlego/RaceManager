export type RaceEvent = {
    _id: string;
    name: string;
    date: number[];
    track: string;
    description: string;
    maxParticipants: number;
    participants: string[];
    carClasses: string[];
    imageURI: string;
}