import { useEffect, useState } from "react";
import { CarService } from "../Services/CarService";
import { RaceEventService } from "../Services/RaceEventService";
import { Car } from "../Types/Car";
import { RaceEvent } from "../Types/RaceEvent";
import { Badge, Button, Card, Group, Image, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RaceSignupComponent from "./RaceSignupComponent";
import { CarClass } from "../Types/CarClass";

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

  const getDateString = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const openHandler = (raceEvent: RaceEvent) => {
    setSelectedEvent(raceEvent);
    open();
  };

  return (
    <div>
      {raceEevents.map((event) => (
        <div key={event._id}>
          <Card 
            shadow="sm" 
            padding="lg" 
            radius="md" 
            withBorder
            // style={{ maxWidth: 400 }}
          >
            <Card.Section>
              <Image
                src={event.imageURI ? require('../../public/imgs/' + event.imageURI) : ''}
                height={160}
                alt={event.name}
              />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{event.name}</Text>
              {
                event.date.map((date) => {
                  return <Text key={date} size="sm" c="dimmed">{getDateString(date)}</Text>
                })
              }
              <Badge color="pink">Registration Open</Badge>
            </Group>
      
            <Text size="sm" c="dimmed">
              {event.description}
            </Text>
      
            <Button onClick={() => openHandler(event)} color="blue" fullWidth mt="md" radius="md">
              Register
            </Button>
          </Card>
        </div>
      ))}
      <Modal opened={opened} onClose={close} title={`Register For Event`}>
        <RaceSignupComponent carClasses={carClasses} cars={cars} raceEvent={selectedEvent}/>
      </Modal>
    </div>
  );
}