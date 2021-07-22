import Marquee from "react-fast-marquee";
import "./styles.css";
import { NavLink } from "react-router-dom";

const companies = [
  {
    src: "recursion.png",
    alt: "Recursion",
  },
  {
    src: "perkin_elmer.png",
    alt: "Perkin Elmer",
  },
  {
    src: "rivian.svg",
    alt: "Rivian",
  },
  {
    src: "linamar.png",
    alt: "Linamar",
  },
  {
    src: "toyota.png",
    alt: "Toyota",
  },
  {
    src: "nvidia.svg",
    alt: "Nvidia",
  },
  {
    src: "palantir.png",
    alt: "Palantir",
  },
  {
    src: "splunk.png",
    alt: "Splunk",
  },
  {
    src: "datadog.svg",
    alt: "Datadog",
  },
  {
    src: "wish.png",
    alt: "Wish",
  },
  {
    src: "amazon.png",
    alt: "Amazon",
  },
  {
    src: "citadel.png",
    alt: "Citadel",
  },
  {
    src: "deloitte.png",
    alt: "Deloitte",
  },
  {
    src: "pwc.png",
    alt: "PwC",
  },
  {
    src: "kpmg.png",
    alt: "KPMG",
  },
  {
    src: "shopify.png",
    alt: "Shopify",
  },
  {
    src: "lockheed_martin.png",
    alt: "Lockheed Martin",
  },
  {
    src: "manulife.png",
    alt: "Manulife",
  },
  {
    src: "cisco.png",
    alt: "Cisco",
  },
  {
    src: "td.png",
    alt: "TD",
  },
  {
    src: "scotiabank.png",
    alt: "Scotiabank",
  },
  {
    src: "apple.png",
    alt: "Apple",
  },
  {
    src: "tesla.png",
    alt: "Tesla",
  },
  {
    src: "microsoft.png",
    alt: "Microsoft",
  },
  {
    src: "jane_street.png",
    alt: "Jane Street",
  },
  {
    src: "facebook.png",
    alt: "Facebook",
  },
  {
    src: "arup.png",
    alt: "Arup",
  },
  {
    src: "ceridian.png",
    alt: "Ceridian",
  },
  {
    src: "google.png",
    alt: "Google",
  },
  {
    src: "1password.png",
    alt: "1Password",
  },
  {
    src: "pcl.png",
    alt: "PCL Construction",
  },
  {
    src: "ellisdon.png",
    alt: "EllisDon",
  },
  {
    src: "gfl.png",
    alt: "GFL Environmental",
  },
  {
    src: "flipp.png",
    alt: "Flipp",
  },
  {
    src: "sap.png",
    alt: "SAP",
  },
  {
    src: "salesforce.png",
    alt: "Salesforce",
  },
  {
    src: "bloomberg.png",
    alt: "Bloomberg",
  },
  {
    src: "capital_one.png",
    alt: "Capital One",
  },
  {
    src: "snowflake.png",
    alt: "Snowflake",
  },
  {
    src: "uber.png",
    alt: "Uber",
  },
  {
    src: "aecon.png",
    alt: "Aecon",
  },
  {
    src: "ibi.png",
    alt: "IBI Group",
  },
  {
    src: "englobe.png",
    alt: "Englobe",
  }
];

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
        <Marquee key={i} gradientWidth="10%" speed={10} direction={i % 2 ? 'right' : 'left'} pauseOnHover>
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