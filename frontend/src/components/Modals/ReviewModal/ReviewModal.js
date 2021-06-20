import React, { useState} from "react";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, Button, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";



const ReviewModal = () => {
 
    //store user responses
    const [text, setText] = useState("")
    const [culture, setCulture] = useState(5)
    const [interesting, setInteresting] = useState(5)
    const [worklife, setWorkLife] = useState(5)


    const handleClick = async () => {
        
        var data = {
            "review": {
                "body": text,
                "workLifeBalance": worklife,
                "culture": culture,
                "interestingWork": interesting
            }
        }
        await axios.post("http://localhost:5000/job/Discord/CTO/review", data, {
            headers: {
                   Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjk3NzdjYjJlYjcxZThiNmZiZTc2NCIsInVzZXJuYW1lIjoiYW5kcmUiLCJleHAiOjE2MzMyODM2MDQsImlhdCI6MTYyMjkxNTYwNH0.VfwMV9vwp54S_g-H_HsnVDzZ-i8gEtuCzfVJijidgmM`,
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                },
            data

        }).then({
            //CLOSE MODAL HERE
        });
    }

    const handleChangeCulture = (event, newValue) => {
        setCulture(newValue);
      };

    const handleChangeInteresting = (event, newValue) => {
        setInteresting(newValue);
    };
    
    const handleChangeWorkLife = (event, newValue) => {
        setWorkLife(newValue);
    };
    
      const ReviewSlider = createMuiTheme({
        overrides: {
            MuiSlider: {
                root: {
                    color: '#000000',
                    height: 2,
                    padding: '15px 0',
                  },
                  thumb: {
                      height: 24,
                      width: 24,
                      backgroundColor: '#fff',
                      border: '2px solid currentColor',
                      marginTop: -8,
                      marginLeft: -12,
                      '&:focus, &:hover, &$active': {
                        boxShadow: 'inherit',
                      },
                    },
                    active: {},
                    valueLabel: {
                      left: 'calc(-50% + 4px)',
                  },
                  track: {
                      height: 8,
                      borderRadius: 4,
                  },
                  rail: {
                      height: 8,
                      borderRadius: 4,
                  },
                  mark: {
                    backgroundColor: '#000000',
                    height: 15,
                    width: 2,
                    marginTop: -3,
                  },
                  markActive: {
                    opacity: 1,
                    backgroundColor: 'currentColor',
                  }
            }
        }
    });

    return (
      <div>
          <Typography>
              Culture/Environment
          </Typography>
          <ThemeProvider theme = {ReviewSlider}>
          <Slider value = {culture} onChange={handleChangeCulture}
           step={1} valueLabelDisplay="auto" marks min = {1} max = {10}/>
          <Typography>
              Meaningful/Interesting Work
          </Typography>
          <Slider value = {interesting} onChange={handleChangeInteresting}
           step={1} valueLabelDisplay="auto" marks min = {1} max = {10}/>
          <Typography>
              Work-Life Balance
          </Typography>
          <Slider value = {worklife} onChange={handleChangeWorkLife}
           step={1} valueLabelDisplay="auto" marks min = {1} max = {10}/>
           </ThemeProvider>
          <TextField
                    placeholder = "Add additional comments" inputProps = {{maxLength: 100}}
                    value = {text}
                    onChange={(event) => {setText(event.target.value)}}/>
            <Button variant= "contained" size="small" onClick = {handleClick}/>
      </div>
    );
  };
  
  export default ReviewModal;