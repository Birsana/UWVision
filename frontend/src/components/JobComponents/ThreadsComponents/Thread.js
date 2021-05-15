import React, { useState, useEffect } from 'react';
import {Button, Tooltip } from '@material-ui/core'

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