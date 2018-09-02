import React from "react";
import Input from "components/common/Input/Input";
import NextButton from "components/common/NextButton/NextButton";
export default ({ onClick, ...rest }) => {
  return (
    <div>
      <Input {...rest} />
      <NextButton text="Next" onClick={onClick} />
    </div>
  );
};
