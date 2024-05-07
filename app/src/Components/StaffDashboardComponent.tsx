import { useEffect, useState } from "react";
import { RaceRegistrationService } from "../Services/RaceRegistrationService";
import { Table } from "@mantine/core";

export default function StaffDashboardComponent() {
  const raceSignupService = new RaceRegistrationService();
  const [rows, setRows] = useState<JSX.Element[]>([]);

  useEffect(() => { 
    raceSignupService.getAllRegistrationRecords().then((data) => {
      const rows = data.result.map((element: any) => (
        <Table.Tr key={element._id}>
          <Table.Td>{element.event.name}</Table.Td>
          <Table.Td>{element.firstName + ' ' + element.lastName}</Table.Td>
          <Table.Td>{element.desiredClass.name}</Table.Td>
          <Table.Td>{element.desiredCar.name}</Table.Td>
        </Table.Tr>
      ));

      setRows(rows);
    });
  }, []);

  return (
    <div>
      <p>View and manage all upcoming events</p>
      <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Event</Table.Th>
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