import { useState} from "react";
import { createMuiTheme } from '@material-ui/core'
import { postReview } from "backendActions"
import {
  ModalTitle,
  FormTextarea,
  FormSubmitButton,
  ModalText,
  FormErrorMessage
} from "../styles";
import { connect } from "react-redux";
import Slider from '@material-ui/core/Slider';
import { ThemeProvider } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';

const ReviewModal = (props) => {
    //store user responses
    const [text, setText] = useState("")
    const [culture, setCulture] = useState(5)
    const [interesting, setInteresting] = useState(5)
    const [worklife, setWorkLife] = useState(5)
    const [error, setError] = useState("")

    const handleChangeCulture = (event, newValue) => {
      setCulture(newValue);
    };

    const handleChangeInteresting = (event, newValue) => {
      setInteresting(newValue);
    };
    
    const handleChangeWorkLife = (event, newValue) => {
      setWorkLife(newValue);
    };
    
    const handleChangeText = (newValue) => {
      setText(newValue);

      if (error) {
        setError("");
      }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const review = {
            body: text,
            workLifeBalance: worklife,
            culture: culture,
            interestingWork: interesting
        }
        postReview(props.company, props.job, props.token, review)
            .then((res) => {
                if (res.data === 'already posted') {
                  setError('You can only review a job once!')
                } else {
                  res.data.upvoted = false;
                  props.onSubmit(res.data);
                  props.onClose();
                }
            });
    }

      const ReviewSlider = createMuiTheme({
        overrides: {
            MuiSlider: {
                root: {
                    color: '#2196f3',
                    padding: '15px 0',
                  },
                  thumb: {
                      height: 20,
                      width: 20,
                      backgroundColor: '#fff',
                      border: '2px solid currentColor',
                      marginTop: -6,
                      marginLeft: -10,
                      '&:focus, &:hover, &$active': {
                        boxShadow: 'inherit',
                      },
                    },
                    active: {},
                    valueLabel: {
                      fontWeight: "bold",
                      left: '-50%'
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
                    height: 0
                  },
            }
        }
    });

    return (
      <>
        <ModalTitle title={"Add review"} />
        <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit}>
          <ModalText style={{ marginBottom: 16, marginLeft: 4, fontSize: 16 }}>
            How was your experience at {props.company}?
          </ModalText>
          <div style={{ width: "90%" }}>
            <ThemeProvider theme={ReviewSlider}>
              <Typography style={{ fontWeight: "bold", marginBottom: -10 }}>
                Culture/Environment
              </Typography>
              <Slider value={culture} onChange={handleChangeCulture}
                step={1} valueLabelDisplay="auto" marks min={1} max={10}/>
              <Typography style={{ fontWeight: "bold", marginBottom: -10 }}>
                Meaningful/Interesting Work
              </Typography>
              <Slider value={interesting} onChange={handleChangeInteresting}
                step={1} valueLabelDisplay="auto" marks min={1} max={10}/>
              <Typography style={{ fontWeight: "bold", marginBottom: -10 }}>
                Work-Life Balance
              </Typography>
              <Slider value={worklife} onChange={handleChangeWorkLife}
                step={1} valueLabelDisplay="auto" marks min={1} max={10}/>
            </ThemeProvider>
          </div>
          <FormTextarea
            maxLength={1000}
            type="text"
            name="review"
            placeholder="Add a review..."
            onChange={(event) => {handleChangeText(event.target.value)}}
            value={text}
          />
          {error && (
            <FormErrorMessage>
              <p>{error}</p>
            </FormErrorMessage>
          )}
          <FormSubmitButton style={{ marginBottom: 20 }} value="Enter" />
        </form>
      </>
    );
  };
  
  // Injecting redux states into props for modal
  const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn,
    token: state.token,
  });
  
  export default connect(mapStateToProps)(ReviewModal);