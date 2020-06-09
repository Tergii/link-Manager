import React from "react";

const Section = (props) => {
  return (
    <>
      <div className="section">
        <button
          className={"SectionBtnR"}
          onClick={(e) => {
            props.handleClickRemoveSection(e, props.number);
          }}
        >
          X
        </button>
        <button className={"SectionBtnR"}>Rename</button>

        <h1>Links {props.number}</h1>
        <br />
        <button onClick={() => props.opener(props.number)}>Open All</button>
        <br />
        <br />
        <ul>{props.arr[props.number]}</ul>
      </div>
    </>
  );
};

export default Section;
