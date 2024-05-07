import { Badge, Button, Card, Group, Image, Text } from "@mantine/core"
import { RaceEvent } from "../../Types/RaceEvent";

interface EventCardProps {
  event: RaceEvent,
  open: Function
};

export default function EventCard({props}: {props: EventCardProps}) {
    const getDateString = (timestamp: number) => {
      return new Date(timestamp * 1000).toLocaleDateString();
    };

    return (
      <div key={props.event._id}>
        <Card 
          shadow="sm" 
          padding="lg" 
          radius="md" 
          withBorder
          // style={{ maxWidth: 400 }}
        >
          <Card.Section>
            <Image
              src={props.event.imageURI ? require('../../imgs/' + props.event.imageURI) : ''}
              height={160}
              alt={props.event.name}
            />
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{props.event.name}</Text>
            {
              props.event.date.map((date: any) => {
                return <Text key={date} size="sm" c="dimmed">{getDateString(date)}</Text>
              })
            }
            <Badge color="pink">Registration Open</Badge>
          </Group>
          <Text size="sm" c="dimmed">
            {props.event.description}
          </Text>
          <Button onClick={() => props.open(props.event)} color="blue" fullWidth mt="md" radius="md">
            Register
          </Button>
        </Card>
      </div>
    )
}