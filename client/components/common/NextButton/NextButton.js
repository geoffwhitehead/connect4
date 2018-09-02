import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default ({ text, ...rest }) => (
  <Button {...rest} icon labelPosition="right">
    {text}
    <Icon name="right arrow" />
  </Button>
);
