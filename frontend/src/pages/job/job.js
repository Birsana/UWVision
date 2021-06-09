const JobPage = (props) => {
    const company = props.match.params.id;
    const job = props.match.params.jobId;

    return (
      <div>
          <h2>{company}: {job}</h2>
      </div>
    );
  };
    
export default JobPage;