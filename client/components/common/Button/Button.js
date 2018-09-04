import React from "react";
import { Button } from "semantic-ui-react";

export default ({ text, ...rest }) => <Button {...rest} content={text} />;
