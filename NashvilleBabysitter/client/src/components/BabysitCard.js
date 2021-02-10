import React from "react";
import { Table } from "semantic-ui-react";

const BabysitCard = ({ babysit }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Babysitter Name</Table.HeaderCell>
        <Table.HeaderCell>Child Name</Table.HeaderCell>
        <Table.HeaderCell>Date and Time</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        {/* <Table.Cell>{babysitter.fullName}</Table.Cell> */}
        <Table.Cell>{babysit.userProfile.fullName}</Table.Cell>
        <Table.Cell>{babysit.child.name}</Table.Cell>
        <Table.Cell>{babysit.date}</Table.Cell>
        <Table.Cell>{babysit.babysitStatus.status}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
export default BabysitCard;
