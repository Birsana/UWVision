import React, { useState} from "react";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import { postReview } from "backendActions"
import { ModalTitle } from "../styles";
import { connect } from "react-redux";

const ReviewModal = (props) => {
    //store user responses
    const [text, setText] = useState("")
    const [culture, setCulture] = useState(5)
    const [interesting, setInteresting] = useState(5)
    const [worklife, setWorkLife] = useState(5)

    const handleClick = async () => {
      const review = {
          body: text,
          workLifeBalance: worklife,
          culture: culture,
          interestingWork: interesting
      }
      postReview(props.company, props.job, props.token, review)
          .then((res) => {
              if (res.data === 'already posted') {
                alert('You can only review a job once!')
              } else {
                res.data.upvoted = false;
                props.onSubmit(res.data);
                props.onClose();
              }
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
            <ModalTitle title={"Leave a review"} />
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
            <Button variant= "contained" size="small" onClick = {handleClick}>Submit</Button>
      </div>
    );
  };
  
  // Injecting redux states into props for modal
  const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    token: state.token,
  });
  
  export default connect(mapStateToProps)(ReviewModal);