import { useState } from "react";
import { createMuiTheme } from "@material-ui/core";
import { addReview } from "backendActions";
import {
  ModalTitle,
  FormTextarea,
  FormSubmitButton,
  ModalText,
  FormErrorMessage,
  FormInput,
  FormSelect,
  FormSelectWrapper,
} from "../styles";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Formik, Form, Field } from "formik";

function isNumeric(value) {
  return /^\d+$/.test(value);
}

const ReviewModal = (props) => {
  const { company, job, jobId, token, onSubmit, onClose } = props;
  const currentYear = new Date().getFullYear();

  const [overall, setOverall] = useState(3);
  const [culture, setCulture] = useState(3);
  const [interesting, setInteresting] = useState(3);
  const [worklife, setWorkLife] = useState(3);
  const [term, setTerm] = useState("Spring");

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

  const validateYear = (year) => {
    let error = "";
    if (!year || year.length === 0) {
      error = "Year cannot be blank";
    }
    if (!isNumeric(year)) {
      error = "Year must be a positive integer";
    }
    const yearAsInt = parseInt(year);
    if (yearAsInt > 2023 || yearAsInt < 2000) {
      error = "Year must be between 2000 and 2023";
    }
    return error;
  };

  const ReviewSlider = createMuiTheme({
    overrides: {
      MuiSlider: {
        root: {
          color: "#2196f3",
          padding: "15px 0",
        },
        thumb: {
          height: 20,
          width: 20,
          backgroundColor: "#fff",
          border: "2px solid currentColor",
          marginTop: -6,
          marginLeft: -10,
          "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
          },
        },
        active: {},
        valueLabel: {
          fontWeight: "bold",
          left: "-50%",
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
          height: 0,
        },
      },
    },
  });

  return (
    <>
      <ModalTitle title={"Add review"} />
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          text: "",
          year: currentYear,
        }}
        onSubmit={(values, actions) => {
          const review = {
            body: values.text,
            overallRating: overall,
            workLifeBalance: worklife,
            culture: culture,
            interestingWork: interesting,
            year: values.year,
            term: term
              // term === "Fall"
              //   ? "fall"
              //   : term === "Spring"
              //   ? "spring"
              //   : "winter", // For some reason toLowerCase didn't work
          };
          addReview(jobId, review, token)
            .then((res) => {
              // TODO: Add logic for this in the backend
              if (res.data === "already posted") {
                actions.setErrors({
                  review: "Cannot review job more than once",
                });
                actions.setSubmitting(false);
              } else {
                res.data.upvoted = false;
                onSubmit(res.data);
                onClose(false);
              }
            })
            .catch((err) => {
              console.log(err.response.data)
              actions.setErrors({ review: "An error occured" });
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.handleSubmit();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ModalText
              style={{ marginBottom: 16, marginLeft: 4, fontSize: 16 }}
            >
              How was your experience at {company}?
            </ModalText>
            <div style={{ width: "90%" }}>
              <ThemeProvider theme={ReviewSlider}>
                <Typography
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: "bold",
                    marginBottom: -10,
                  }}
                >
                  Overall
                </Typography>
                <Slider
                  value={overall}
                  onChange={handleChangeOverall}
                  step={1}
                  valueLabelDisplay="auto"
                  marks
                  min={1}
                  max={5}
                />
                <Typography
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: "bold",
                    marginBottom: -10,
                  }}
                >
                  Culture/Environment
                </Typography>
                <Slider
                  value={culture}
                  onChange={handleChangeCulture}
                  step={1}
                  valueLabelDisplay="auto"
                  marks
                  min={1}
                  max={5}
                />
                <Typography
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: "bold",
                    marginBottom: -10,
                  }}
                >
                  Meaningful/Interesting Work
                </Typography>
                <Slider
                  value={interesting}
                  onChange={handleChangeInteresting}
                  step={1}
                  valueLabelDisplay="auto"
                  marks
                  min={1}
                  max={5}
                />
                <Typography
                  style={{
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontWeight: "bold",
                    marginBottom: -10,
                  }}
                >
                  Work-Life Balance
                </Typography>
                <Slider
                  value={worklife}
                  onChange={handleChangeWorkLife}
                  step={1}
                  valueLabelDisplay="auto"
                  marks
                  min={1}
                  max={5}
                />
              </ThemeProvider>
            </div>
            <Field
              type="text"
              name="text"
              maxLength={2000}
              placeholder="Add a review..."
              autoFocus={true}
              as={FormTextarea}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <FormSelectWrapper style={{ marginRight: 5 }}>
                <FormSelect
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </FormSelect>
              </FormSelectWrapper>
              <Field
                type="number"
                name="year"
                min={2000}
                max={currentYear}
                placeholder="Year"
                as={FormInput}
                validate={validateYear}
                style={{ marginLeft: 5 }}
              />
            </div>
            {props.errors.review ? (
              <FormErrorMessage>
                <p>{props.errors.review}</p>
              </FormErrorMessage>
            ) : props.errors.year ? (
              <FormErrorMessage>
                <p>{props.errors.year}</p>
              </FormErrorMessage>
            ) : (
              <></>
            )}
            <FormSubmitButton
              disabled={props.isSubmitting}
              type="submit"
              style={{ marginBottom: 20 }}
              value="Enter"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

// Injecting redux states into props for modal
const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  token: state.token,
});

export default connect(mapStateToProps)(ReviewModal);
