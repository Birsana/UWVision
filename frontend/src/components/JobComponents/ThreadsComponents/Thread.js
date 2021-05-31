import React from 'react';


function Thread(props){

    return (
        <div className="thread">
          <h2 className="threadAuthor">
          </h2>
          {props.children}
        </div>
      );

}

export default Thread