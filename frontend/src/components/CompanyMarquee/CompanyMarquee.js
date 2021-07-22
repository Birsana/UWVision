import Marquee from "react-fast-marquee";
import { companies } from './companies';
import "./styles.css";
import { NavLink } from "react-router-dom";

const CompanyMarquee = ({ num }) => {
  // Renders num images at a time starting from startIndex
  const renderImages = (startIndex, num) => {
    let images = [];
    for (let i = startIndex; i < (startIndex + num >= companies.length ? companies.length : startIndex + num); i++) {
      images.push(
        <NavLink
          to={`/company/${companies[i].alt}`}
          key={i}
        >
          <img
            src={require(`../../assets/${companies[i].src}`).default}
            alt={companies[i].alt}
            className="image"
          />
        </NavLink>
      )
    }
    return images;
  }

  // Renders num marquees
  const renderMarquees = (num) => {
    let marquees = [];
    const numImages = Math.floor(companies.length / num); // The number of images in each marquee
    for (let i = 0; i < num; i++) {
      marquees.push(
        <Marquee key={i} gradientWidth="10%" speed={18} direction={i % 2 ? 'right' : 'left'} pauseOnHover>
          {renderImages(i * numImages, numImages)}
        </Marquee>
      )
    }
    return marquees;
  }

  return (
    <div>
      {renderMarquees(num)}
    </div>
  )
}

export default CompanyMarquee;