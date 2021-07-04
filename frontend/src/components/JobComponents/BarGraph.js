import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from "axios";

function BarGraph(props){
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        var graphLabels = [];
        var graphValues = [];

        const data = props.salaries;
        data.forEach(salary => {
            graphLabels.push(salary.wage);
          });
          graphLabels.sort();

          //converting wages to form "x$/hr"
          for(var i = 0; i < graphLabels.length; ++i){
              graphLabels[i] = graphLabels[i].toString() + "$/hr";
          }

          //populate the graph values array
          var currCounter = 1;
          for(var j = 1; j < graphLabels.length; ++j){
            if(graphLabels[j] !== graphLabels[j-1]){
                graphValues.push(currCounter);
                currCounter = 1;
            } else {
                currCounter += 1;
            }
          }
          graphValues.push(currCounter);

          //removing duplicates for labels
          graphLabels = [...new Set(graphLabels)];
          setGraphData(
            {
                labels: graphLabels,
                datasets: [
                  {
                    label: '# of people',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                    data: graphValues
                  }
                ]
        }
        );
      }, []);

    return (
        <div>
          <Bar
            data={graphData}
            options={{
              title:{ //title not working as of now
                display:true,
                text:'Hourly Salary',
                fontSize: 20
              },
              legend:{
                display:false,
                position:'right'
              },
              ticks: {
                precision:0
              }
            }}
          />
        </div>
      );

}

export default BarGraph;