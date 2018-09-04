import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default ({ iconName, text, ...rest }) => (
  <Button animated {...rest}>
    <Button.Content visible>{text}</Button.Content>
    <Button.Content hidden>
      <Icon name={iconName} />
    </Button.Content>
  </Button>
);
