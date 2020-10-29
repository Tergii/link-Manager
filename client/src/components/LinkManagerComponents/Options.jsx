import React from "react";
const Option = (props) => {
  return (
    <>
      <option value={props.lenght}>{props.title[props.lenght]}</option>
    </>
  );
};

export default Option;
