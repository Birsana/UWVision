import styled from "styled-components";
import privacyPolicyImage from 'assets/privacyPolicyBackdrop.png';
import './styles.css';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 850px;
    max-width: 850px;

    h1 {
        font-size: 32px;
        padding-bottom: 85px;
        color: white;
    }

    p {
        font-size: 18px;
        margin-bottom: 0;
    }
`

const pageCopy = {
  h1Text: "Privacy Policy",
  paragraph1:
    "UWVision takes user privacy very seriously. The only personal data we store on our server is an individual’s email and username, which we require to allow protected actions such as adding companies, jobs, reviews, and interview questions. This is to ensure that the integrity of the website is preserved and information can only be added by verified UWaterloo students.",
  paragraph2:
    "Moreover, we store a small amount of data on your local machine (your email, username and authentication token) which is to help your computer remember your logged in state when you visit the site. If you would like to remove this from local storage, simply hit the “Logout” button and it will automatically do that for you.",
  paragraph3: "You can verify this afterwards by pressing F12 -> Navigate to Application Tab -> Click on Local Storage on the bottom-left hand side, and you'll see that it is empty.",
  paragraph4: "If you have additional questions or require more information, please contact us at temp@gmail.com."
};

const PrivacyPolicy = () => {
    return (
        <>
        <img src={privacyPolicyImage} className="privacyPolicyImage" alt=""/>
        <Container>
            <Content>
                <h1>{pageCopy.h1Text}</h1>
                <p>{pageCopy.paragraph1}</p>
                <p>{pageCopy.paragraph2}</p>
                <p>{pageCopy.paragraph3}</p>
                <p>{pageCopy.paragraph4}</p>
            </Content>
        </Container>
        </>
    )
}

export default PrivacyPolicy;