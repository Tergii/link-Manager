import React from "react";
import Option from "./Options.jsx";
const Interface = (props) => {
  const options = [];
  for (let i = 0; i < props.state.createComponent; i++) {
    options.push(<Option key={options.length} lenght={options.length} />);
  }
  return (
    <>
      <div className="flex-col">
        <div className='flex-col'>
          <select className='select-box' onChange={props.handleSelect} name="-" id="interface">
            {props.state.options}
          </select>
          <input
            placeholder='Enter the link'
            className='select-box'
            type="text"
            value={props.state.inputLinkValue}
            onChange={props.handleInputLink}
          />
          <input type="text" className='select-box' placeholder='Enter link name(optional)' onChange
            ={props.handleLinkNameInputChange} value={props.state.inputLinkNameValue} />
          <button
            className='custom-btn'
            onClick={() => {
              props.handleClick(
                props.state.selectedSection,
                props.state.inputLinkValue
              );
            }}
          >
            Add
        </button>
        </div>
        <div className='flex-row-interface'>
          <div>
            <p>Add new section</p>
          </div>
          <div>
            <button className='round-btn custom-btn' onClick={props.handleClickNewSection}>
              <svg className='center' width='10' height='10'>
                <line x1="5" x2="5" y1="0" y2="10" stroke="white" strokeWidth="2" />
                <line x1="0" x2="10" y1="5" y2="5" stroke="white" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>

        <label>
          <button className='custom-btn' onClick={props.handleSendUpdate}>Save All</button>
        </label>
      </div>

    </>
  );
};

export default Interface;
