import React from "react";
import { Table, Header, Icon } from "semantic-ui-react";
import css from "./TopTable.scss";

export default ({ players }) => {
  return (
    <div className={css.table}>
      <Table basic="very" singleLine celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Wins</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {players &&
            players.map((player, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Header as="h4" image>
                    <Icon
                      name="user outline"
                      color={
                        i < 1
                          ? "yellow"
                          : i < 2
                            ? "grey"
                            : i < 3
                              ? "brown"
                              : "black"
                      }
                    />
                    <Header.Content>{player.name}</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{player.wins}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};
