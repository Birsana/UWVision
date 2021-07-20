import { useState } from "react";
import { createMuiTheme } from '@material-ui/core'
import { postReview } from "backendActions"
import {
  ModalTitle,
  FormTextarea,
  FormSubmitButton,
  ModalText,
  FormErrorMessage,
  FormInput,
  FormSelect,
  FormSelectWrapper
} from "../styles";
import { connect } from "react-redux";
import Slider from '@material-ui/core/Slider';
import { ThemeProvider } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';

const ReviewModal = (props) => {
    const currentYear = new Date().getFullYear();

    //store user responses
    const [text, setText] = useState("")
    const [overall, setOverall] = useState(3)
    const [culture, setCulture] = useState(3)
    const [interesting, setInteresting] = useState(3)
    const [worklife, setWorkLife] = useState(3)
    const [term, setTerm] = useState("Spring")
    const [year, setYear] = useState(currentYear)
    const [error, setError] = useState("")


    const handleChangeOverall = (event, newValue) => {
      setOverall(newValue);
    };

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

    const handleChangeYear = (event) => {
      const newYear = event.target.value;
      setYear(newYear);
      
      if(newYear > 2021 || newYear < 2000){
          setError('Year must be between 2000 and 2021');
          return;
      }

      if (error) {
          setError("");
      }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (error !== "") {
            return;
        }

        const review = {
            body: text,
            overallRating: overall,
            workLifeBalance: worklife,
            culture: culture,
            interestingWork: interesting,
            year: year,
            term: term === "Fall" ? "fall" : term === "Spring" ? "spring" : "winter" // For some reason toLowerCase didn't work
        }
        
        postReview(props.company, props.job, props.token, review)
            .then((res) => {
                if (res.data === 'already posted') {
                  setError('You can only review a job once!')
                } else {
                  res.data.upvoted = false;
                  props.onSubmit(res.data);
                  props.onClose(false);
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
                Overall
              </Typography>
              <Slider value={overall} onChange={handleChangeOverall}
                step={1} valueLabelDisplay="auto" marks min={1} max={5}/>
              <Typography style={{ fontWeight: "bold", marginBottom: -10 }}>
                Culture/Environment
              </Typography>
              <Slider value={culture} onChange={handleChangeCulture}
                step={1} valueLabelDisplay="auto" marks min={1} max={5}/>
              <Typography style={{ fontWeight: "bold", marginBottom: -10 }}>
                Meaningful/Interesting Work
              </Typography>
              <Slider value={interesting} onChange={handleChangeInteresting}
                step={1} valueLabelDisplay="auto" marks min={1} max={5}/>
              <Typography style={{ fontWeight: "bold", marginBottom: -10 }}>
                Work-Life Balance
              </Typography>
              <Slider value={worklife} onChange={handleChangeWorkLife}
                step={1} valueLabelDisplay="auto" marks min={1} max={5}/>
            </ThemeProvider>
          </div>
          <FormTextarea
            maxLength={2000}
            type="text"
            name="review"
            placeholder="Add a review..."
            onChange={(event) => handleChangeText(event.target.value)}
            value={text}
            autoFocus={true}
          />
          <div style={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
            <FormSelectWrapper style={{ marginRight: 5 }}>
              <FormSelect value={term} onChange={(e) => setTerm(e.target.value)}>
                <option value="volvo">Spring</option>
                <option value="saab">Fall</option>
                <option value="opel">Winter</option>
              </FormSelect>
            </FormSelectWrapper>
            <FormInput
                type="number"
                min={2000}
                max={currentYear}
                name="year"
                placeholder="Year"
                onChange={handleChangeYear}
                value={year}
                style={{ marginLeft: 5 }}
            />
          </div>
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