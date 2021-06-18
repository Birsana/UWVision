import './styles.css';

const JobPage = (props) => {
    const company = props.match.params.id;
    const job = props.match.params.jobId;

    return (
      <div className="container">
        <div className="header">
          <div>
            <p className="company">{company}</p>
            <p className="job">{job}</p>
          </div>
        </div>
        <div className="body">
          <div className="graph">
            Graph
          </div>
          <div className="info">

          </div>
        </div>
      </div>
    );
  };
    
export default JobPage;