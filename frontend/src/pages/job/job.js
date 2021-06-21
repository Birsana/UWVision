import './styles.css';
import BarGraph from '../../components/JobComponents/BarGraph'
import InterviewQuestion from '../../components/JobComponents/InterviewQuestionComponents/InterviewQuestion'

const JobPage = (props) => {
    const data = {
      jobName: "Software Developer Intern",
      company: "Apple",
      // threads: [{ 
      //   id: '',
      //   title: 'I loved working here',
      //   body: 'Awesome place to work lololol so awesome lol',
      //   slug: '',
      //   createdAt: '09/01/31',
      //   author: 'Justin Chu'
      //  }],
      questions: [{ 
        body: 'What is the work environment like here?',
        author: 'Justin Chu',
        upvoters: [],
        job: {}
      }],
      reviews: [{ 
        body: 'Great place to work; it\'s the stuff of dreams, frfr',
        author: 'Justin Chu',
        workLifeBalance: 6,
        culture: 10,
        interestingWork: 7,
        overallRating: 9,
        upvoters: []
       }],
      salaries: [{
        wage: 90000,
        added_by: 'Justin Chu'
      }],
      averageSalary: 120000,
      averageRating: 9.3
    }

    return (
      <div className="container">
        <div className="header">
          <div>
            <p className="company">{data.company}</p>
            <p className="job">{data.jobName}</p>
          </div>
        </div>
        <div className="body">
          <div className="graph">
            <BarGraph />
          </div>
          <div className="info">
            <div className="rating">
              <h1>Overall</h1>
              <p>{data.averageRating}</p>
            </div>
          </div>
          <div>
            {
              data.questions.map((question) => {
                return <InterviewQuestion upvoters={question.upvoters} body={question.body} author={question.author} />
              })
            }
          </div>
        </div>
      </div>
    );
  };
    
export default JobPage;