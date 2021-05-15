import React, { useState, useEffect } from 'react';
import axios from "axios";
import ThreadForm from "components/JobComponents/ThreadsComponents/ThreadForm";
import ThreadList from "components/JobComponents/ThreadsComponents/ThreadList";

function ThreadBox(props){

    const [threads, setThreads] = useState(null);

    var threadsData = []
    
    const fetchThreads= async () => {
        await axios.get("http://localhost:5000/job/Apple/Friend/threads", {
            headers: {
                //   Authorization: `Token ${token}`,
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                }
        }).then(response => {
            let data = response.data;
            data.forEach(thread => {
                threadsData.push(thread);
              });
        });
    };

    useEffect( async () => {
        await fetchThreads();
        setThreads(
           threadsData
        );
      }, []);

    return(
        <div classname = "threadsBox">
            <h1> Threads </h1>
            <ThreadList data = {threads} style={
    {
     border: '2px solid red'
    }
  }/>
            <ThreadForm/>
        </div>
    );

}

export default ThreadBox;