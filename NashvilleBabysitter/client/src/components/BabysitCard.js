import React from "react";
import { Table } from "semantic-ui-react";
import { format } from "date-fns";

const BabysitCard = ({ babysit }) => {
  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Babysitter Name</Table.HeaderCell>
            <Table.HeaderCell>Child Name</Table.HeaderCell>
            <Table.HeaderCell>Date and Time</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            {/* <Table.Cell>{babysitter.fullName}</Table.Cell> */}
            <Table.Cell>{babysit.userProfile.fullName}</Table.Cell>
            <Table.Cell>{babysit.child.name}</Table.Cell>
            <Table.Cell>{babysit.date}</Table.Cell>
            <Table.Cell>{babysit.babysitStatus.status}</Table.Cell>
            <Table.Cell>{babysit.duration}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};
export default BabysitCard;
