import React from "react";
import Input from "components/common/Input/Input";
export default ({ next, show, ...rest }) => {
  return show ? (
    <Input
      {...rest}
      action={{
        color: "teal",
        labelPosition: "right",
        icon: "right arrow",
        content: "Next",
        onClick: next
      }}
    />
  ) : null;
};
