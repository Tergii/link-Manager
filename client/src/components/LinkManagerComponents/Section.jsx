import React from "react";
const Section = (props) => {
   return (
      <>
         <div className="section">
            <div className='flex-row'>
               <p className='title-text last center-title adjust'>{props.title}</p>
               <div className="last adjust">
                  <div>
                     <button className='custom-btn-links responsive-btn' onClick={(e) => props.renamer(e, props.number)}>rename</button>
                  </div>
                  <div>
                     <button
                        className='custom-btn-links responsive-btn'
                        title='remove'
                        onClick={(e) => {
                           props.handleClickRemoveSection(e, props.number);
                        }}
                     >
                        X
                  </button>
                  </div>
               </div>
            </div>
            <div className='special-margin'>
               <button className='custom-btn-links' onClick={() => props.opener(props.number)}><span>Open All</span></button>
            </div>
            <ul className='flex-col'>{props.arr[props.number]}</ul>
         </div>
      </>
   );
};

export default Section;
