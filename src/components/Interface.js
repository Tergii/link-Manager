import React from "react";
import Option from "./Options";
const Interface = (props) => {
  const options = [];
  for (let i = 0; i < props.state.createComponent; i++) {
    options.push(<Option key={options.length} lenght={options.length} />);
  }
  return (
    <>
      <label htmlFor="interface">
        <select onChange={props.handleSelect} name="-" id="interface">
          {props.state.options}
        </select>
        <input
          type="text"
          value={props.state.inputValue}
          onChange={props.handleInput}
        />
        <button
          onClick={() => {
            props.handleClick(
              props.state.selectedSection,
              props.state.inputValue
            );
          }}
        >
          Add
        </button>
      </label>
      <label>
        Add new section
        <button onClick={props.handleClickNewSection}> + </button>
      </label>
    </>
  );
};

export default Interface;
