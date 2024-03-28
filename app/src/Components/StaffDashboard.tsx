import { useEffect, useState } from "react";
import { RaceSignupService } from "../Services/RaceSignupService";
import { RaceSignup } from "../Types/RaceSignup";
import { Table } from "@mantine/core";

export default function StaffDashboard() {
  const raceSignupService = new RaceSignupService();
  const [registrationData, setRegistrationData] = useState<[]>([]);
  const [rows, setRows] = useState<JSX.Element[]>([]);

  useEffect(() => { 
    raceSignupService.getAllRegistrationRecords().then((data) => {
      setRegistrationData(data.result);
      const rows = data.result.map((element: RaceSignup.RaceSignupFormParams) => (
        <Table.Tr key={element.firstName + element.lastName}>
          <Table.Td>{element.firstName + ' ' + element.lastName}</Table.Td>
          <Table.Td>{element.desiredClass}</Table.Td>
          <Table.Td>{element.desiredCar}</Table.Td>
        </Table.Tr>
      ));

      setRows(rows);
    });
  }, []);


  return (
    <div>
      <h1>Staff Dashboard</h1>
      <p>View and manage all  upcoming events</p>
      <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Desired Class</Table.Th>
          <Table.Th>Desired Car</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </div>
  );
}