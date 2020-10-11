import React from "react";
const Link = (props) => {
  return (
    <>
      <li>
        <a href={props.text} target='_blank' rel="noopener noreferrer"> {props.text} </a>
        <button
          onClick={(event) => props.remover(event, props.number, props.id)}
        >
          X
        </button>
      </li>
    </>
  );
};

export default Link;
