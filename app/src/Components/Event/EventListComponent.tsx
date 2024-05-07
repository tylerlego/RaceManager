import { useEffect, useState } from "react";
import { CarService } from "../../Services/CarService";
import { RaceEventService } from "../../Services/RaceEventService";
import { Car } from "../../Types/Car";
import { RaceEvent } from "../../Types/RaceEvent";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RaceSignupComponent from "../RaceSignupComponent";
import { CarClass } from "../../Types/CarClass";
import EventCard from "./EventCard";

interface EventCardProps {
  event: RaceEvent,
  open: Function
};

export default function EventListComponent() {
  const [carClasses, setCarClasses] = useState<CarClass[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [raceEevents, setRaceEvents] = useState<RaceEvent[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEvent, setSelectedEvent] = useState<RaceEvent>({} as RaceEvent);

  const carService = new CarService();
  const eventService = new RaceEventService();

  useEffect(() => {
    Promise.all([
      carService.getAllCarClasses(),
      carService.getAllCars(),
      eventService.getAllEvents()
    ]).then(([carClasses, cars, raceEvents]) => {
      setCarClasses(carClasses.result);
      setCars(cars.result);
      setRaceEvents(raceEvents.result);
    });
  }, []);

  const openHandler = (raceEvent: RaceEvent) => {
    setSelectedEvent(raceEvent);
    open();
  };

  const eventCards = raceEevents.map((event) => {
    const props: EventCardProps = {event, open: openHandler};

    return (
      <div key={event._id}>
        <EventCard props={props} />
      </div>
    );
  });

  return (
    <div>
      {eventCards}
      <Modal opened={opened} onClose={close} title={`Register For Event`}>
        <RaceSignupComponent carClasses={carClasses} cars={cars} raceEvent={selectedEvent}/>
      </Modal>
    </div>
  );
}