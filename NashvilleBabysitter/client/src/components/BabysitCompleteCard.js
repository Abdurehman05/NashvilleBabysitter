import React from "react";
import { Table, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import formatDate from "../utils/dateFormatter";

const BabysitCompleteCard = ({ babysit, babysitTime }) => {
  const history = useHistory();

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Parent Name</Table.HeaderCell>
          <Table.HeaderCell>Child Name</Table.HeaderCell>
          <Table.HeaderCell>Date and Time</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
          <Table.HeaderCell>Is Completed?</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{babysit.child.userProfile.fullName}</Table.Cell>
          <Table.Cell>{babysit.child.name}</Table.Cell>
          <Table.Cell>{formatDate(babysit.date)}</Table.Cell>
          {babysit.babysitStatusId === 2 ? (
            <Table.Cell>TBD</Table.Cell>
          ) : (
            <Table.Cell>
              {babysit.duration / 60} Minutes
              {babysitTime}
            </Table.Cell>
          )}
          {babysit.babysitStatusId === 3 ? (
            <Table.Cell>Yes</Table.Cell>
          ) : (
            <Table.Cell>
              <Button
                color="black"
                onClick={() => {
                  history.push(`/babysit/complete/${babysit.id}`);
                }}
              >
                Complete
              </Button>
            </Table.Cell>
          )}
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
export default BabysitCompleteCard;
