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

    @media (max-width: 520px) {
        padding-left: 30px;
        padding-right: 30px;
    }
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
  paragraph2: "The opinions expressed by users of the site do not represent those of UWVision and its creators. UWVision is in no way affliated with the University of Waterloo. If you have additional questions or require more information, please contact us at info.uwvision@gmail.com."
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
            </Content>
        </Container>
        </>
    )
}

export default PrivacyPolicy;