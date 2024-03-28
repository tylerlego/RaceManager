import { Box, Button, Group, List, Select, Stepper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form'
import { RaceSignup } from '../Types/RaceSignup';
import { useState } from 'react';
import { RaceSignupService } from '../Services/RaceSignupService';


export default function RaceSignupForm() {
  const [active, setActive] = useState(0);
  const [desiredCarOptions, setDesiredCarOptions] = useState<{ value: string; label: string }[]>([]);
  const [raceSignupFormParams, setRaceSignupFormParams] = useState<RaceSignup.RaceSignupFormParams>({
    firstName: '',
    lastName: '',
    desiredClass: '',
    desiredCar: '',
  });

  const raceSignupService = new RaceSignupService();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      desiredClass: '' as RaceSignup.CarClass,
      desiredCar: '' as RaceSignup.GT3Model | RaceSignup.LMP2Model | RaceSignup.GTPModel,
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
    setRaceSignupFormParams(form.values);
    
    if (active === 0) {
      if (form.values.desiredClass === RaceSignup.CarClass.GTP) {
        setDesiredCarOptions(Object.values(RaceSignup.GTPModel).map((value) => ({ value, label: value })));
      } else if (form.values.desiredClass === RaceSignup.CarClass.LMP2) {
        setDesiredCarOptions(Object.values(RaceSignup.LMP2Model).map((value) => ({ value, label: value })));
      } else if (form.values.desiredClass === RaceSignup.CarClass.GT3) {
        setDesiredCarOptions(Object.values(RaceSignup.GT3Model).map((value) => ({ value, label: value })));
      }
    }
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    })
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const submitRegistrationForm = async () => {
    console.log('Submitting form: ', raceSignupFormParams);
    const result = await raceSignupService.addRaceRegistration(raceSignupFormParams); // Call to RaceSignupService to add new registration
    console.log(result);
  };

  return (
    <>
      <header className="App-header">
        <p>
          JJC Racing Special Event Registration Form
        </p>
      </header>
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
                data={Object.values(RaceSignup.CarClass).map((value) => ({ value, label: value }))}
                {...form.getInputProps('desiredClass')}
              />
            </Stepper.Step>
            <Stepper.Step label="Step 2">
              <Select
                withAsterisk
                withCheckIcon={false}
                label="Desired Car"
                data={desiredCarOptions}
                {...form.getInputProps('desiredCar')}

              />
            </Stepper.Step>
            <Stepper.Completed>
              Wow, you did it!
              <List>
                <List.Item>
                  Name: {raceSignupFormParams.firstName} {raceSignupFormParams.lastName}
                </List.Item>
                <List.Item>
                  Desired Class: {raceSignupFormParams.desiredClass}
                </List.Item>
                <List.Item>
                  Desired Car: {raceSignupFormParams.desiredCar}
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