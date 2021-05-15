import React, { useState, useEffect } from 'react';
import Thread from "components/JobComponents/ThreadsComponents/Thread";

function ThreadList(props){

    var threads = (props.data) ?
        props.data.map(function (thread) {
            console.log(thread)
        return (
          <Thread author={thread.author} date = {thread.date}>
            {thread.title}
          </Thread>
        );
      }) : null;


    return(
        <div classname = "threadList">
            {threads}
        </div>
    );

}

export default ThreadList;