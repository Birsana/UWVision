import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core'
import axios from "axios";
import "./styles.css"

function ThreadForm(props){
    const  [text, setText] = useState("")
    
    const handleClick = async () => {
        
        var data = {
            "thread": {
                "body": text
            }
        }
        console.log(data)
        await axios.post("http://localhost:5000/job/Apple/Friend/thread", data, {
            headers: {
                   Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmVmNzU1YzI2M2NlMmU5ODA3MTczYiIsInVzZXJuYW1lIjoic2Vjb25kIiwiZXhwIjoxNjI0MDU1MTA5LCJpYXQiOjE2MTM2OTA3MDl9.R622UH4VjyF-bR_Has3ajC5fp0S4gIKG9u4OsuKxX5w`,
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                },
            data

        }).then({
            
        });
    }

    return(
        <div classname = "ThreadForm">
            <TextField
                    placeholder = "Create a thread" inputProps = {{maxLength: 100}}
                    value = {text}
                    onChange={(event) => {setText(event.target.value)}}/>
            <Button variant= "contained" size="small" onClick = {handleClick}/>
        </div>
    );

}

export default ThreadForm;