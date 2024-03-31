import { Box, Button, Group, List, Select, Stepper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react';
import { RaceRegistrationService } from '../Services/RaceRegistrationService';
import { RaceSignupParams } from '../Types/RaceSignup';
import { Car } from '../Types/Car';
import { RaceEvent } from '../Types/RaceEvent';
import { CarClass } from '../Types/CarClass';

export default function RaceSignupComponent(props: {
  carClasses: CarClass[];
  cars: Car[];
  raceEvent: RaceEvent;
}) {
  const [active, setActive] = useState(0);
  const [carOptions, setCarOptions] = useState<{ value: string; label: string }[]>([]);
  const [carClassOptions, setCarClassOptions] = useState<{ value: string; label: string }[]>([]);

  const [raceSignupParams, setRaceSignupParams] = useState<RaceSignupParams>({
    firstName: '',
    lastName: '',
    desiredClass: '',
    desiredCar: '',
    event: '',
  });

  const raceSignupService = new RaceRegistrationService();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      desiredClass: '',
      desiredCar: '',
      event: props.raceEvent._id || '',
    },
    validate: (values) => {
      if (active === 0) {
        return {
          firstName: values.firstName.length > 0 ? null : 'First name is required',
          lastName: values.lastName.length > 0 ? null : 'Last name is required',
          desiredClass: values.desiredClass.length > 0 ? null : 'Desired class is required',
        };
      } else if (active === 1) {
        return {
          desiredCar: values.desiredCar.length > 0 ? null : 'Desired car is required',
        };
      }  

      return {};
    },
  });

  const nextStep = () => {
    setRaceSignupParams(form.values);
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    })
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const submitRegistrationForm = async () => {
    if (props.raceEvent._id) {
      raceSignupParams.event = props.raceEvent._id;
      await raceSignupService.addRaceRegistration(raceSignupParams);
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const classes = props.raceEvent.carClasses;
    setCarClassOptions(classes.map((carClass) => { return { value: carClass._id, label: carClass.name } }));

    const filteredCars = props.cars.filter((car) => {
      return car.class._id === form.values.desiredClass;
    });
    setCarOptions(filteredCars.map((car) => { return { value: car._id, label: car.name } }));
  }, [props.carClasses, props.cars, form.values.desiredClass]);

  return (
    <>
      <form onSubmit={form.onSubmit(submitRegistrationForm)}>
        <Box maw={340} mx="auto">
          <Stepper active={active}>
            <Stepper.Step label="Step 1">
              <TextInput
                withAsterisk
                label="First Name"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                withAsterisk
                label="Last Name"
                {...form.getInputProps('lastName')}
              />
              <Select
                withAsterisk
                withCheckIcon={false}
                label="Desired Class"
                data={carClassOptions}
                {...form.getInputProps('desiredClass')}
              />
            </Stepper.Step>
            <Stepper.Step label="Step 2">
              <Select
                withAsterisk
                withCheckIcon={false}
                label="Desired Car"
                data={carOptions}
                {...form.getInputProps('desiredCar')}
              />
            </Stepper.Step>
            <Stepper.Completed>
              Wow, you did it!
              <List>
                <List.Item>
                  Name: {raceSignupParams.firstName} {raceSignupParams.lastName}
                </List.Item>
                <List.Item>
                  Desired Class: {raceSignupParams.desiredClass}
                </List.Item>
                <List.Item>
                  Desired Car: {raceSignupParams.desiredCar}
                </List.Item>
              </List>
            </Stepper.Completed>
          </Stepper>
          <Group justify="flex-end" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 2 && <Button disabled={!form.isValid} onClick={nextStep}>Next step</Button>}
            {active === 2 && <Button type="submit" disabled={!form.isValid} onSubmit={submitRegistrationForm}>Submit</Button>}
          </Group>
        </Box>
      </form>
    </>

  );
}