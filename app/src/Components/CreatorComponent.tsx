import { useEffect, useState } from "react";
import { CarService } from "../Services/CarService";
import { Button, FileInput, Group, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RaceEventService } from "../Services/RaceEventService";

export default function CreatorComponent() {
  const [carClasses, setCarClasses] = useState<any[]>([]);
  const carService = new CarService();
  const raceEventService = new RaceEventService();

  useEffect(() => {
    carService.getAllCarClasses().then((data) => {
      setCarClasses(data.result);
    });
  }); 


  
  const form = useForm({
    initialValues: {
      name: '',
      date: [],
      track: '',
      description: '',
      carClasses: [],
      participants: [],
      imageURI: '',
    },
  });

  const submitEventForm = async () => {
    raceEventService.addRaceEvent(form.values).then((data) => {
      console.log("race added", data);
    });
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(submitEventForm)}>
        <TextInput
          withAsterisk
          label="Race Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Track Name"
          {...form.getInputProps('track')}
        />
        <TextInput
          withAsterisk
          label="Event Description"
          {...form.getInputProps('description')}
        />
        <FileInput
          label="Image"
          {...form.getInputProps('imageURI')}
        />
        <MultiSelect
          withAsterisk
          withCheckIcon={false}
          label="Classes"
          data={carClasses.map((carClass) => ({ value: carClass._id, label: carClass.name}))}
          {...form.getInputProps('carClasses')}
        />
        <Group justify="flex-end" mt="xl">
          <Button type="submit" onSubmit={submitEventForm}>Submit</Button>
        </Group>
      </form>
    </div>
  );
}