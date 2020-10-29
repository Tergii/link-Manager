import React, { useState } from "react";
const Link = (props) => {
  const [hover, handleHover] = useState(false)
  return (
    <>
      <li className='flex-row'>
        <a className={`last link-text  ${hover ? 'hover-cls' : null}`} target='_blank' rel="noopener noreferrer" href={props.href}> {`${props.text}`}</a>
        <div className='last'>
          <div>
            <button
              className='custom-btn-links small-font'
              title='remove'
              onMouseLeave={() => { handleHover(false) }}
              onMouseEnter={(e) => { handleHover(true) }}
              onClick={(event) => props.remover(event, props.number, props.id)}
            >
              X
        </button>
            <button className='custom-btn-links small-font' onMouseLeave={() => { handleHover(false) }} onMouseEnter={(e) => { handleHover(true) }} onClick={(e) => props.renamer(e, props.number, props.id)}>
              rename
        </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default Link;
