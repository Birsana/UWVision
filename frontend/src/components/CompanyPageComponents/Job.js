function Job(props){

    return (
        <div className="job">
          <h2> Job
          </h2>
          {props.children}
        </div>
      );

}

export default Job;