import React from "react";
import Input from "components/common/Input/Input";
import NextButton from "components/common/NextButton/NextButton";
export default ({ next, show, ...rest }) => {
  return show ? (
    <div>
      <Input {...rest} />
      <NextButton text="Next" onClick={next} />
    </div>
  ) : null;
};
