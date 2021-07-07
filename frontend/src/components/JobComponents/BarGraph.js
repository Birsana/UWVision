import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function BarGraph(props){
    const [graphData, setGraphData] = useState(null);
    const isMobile = useMediaQuery('(max-width: 520px)');

    useEffect(() => {
        var graphLabels = ["$10", "$20", "$30", "$40", "$50", "$60", "$70", "$80", "$90", "$100", ">$100"];
        var graphValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        props.salaries.forEach(salary => {
          if (salary.wage > 100) {
            graphValues[10] += 1;
          } else {
            graphValues[Math.floor(salary.wage / 10)] += 1;
          }
        })

        setGraphData({
          labels: graphLabels,
          datasets: [
            {
              label: '',
              backgroundColor: '#2196f3',
              borderColor: '#2196f3',
              borderRadius: 5,
              data: graphValues
            }
          ]
        });
      }, [props.salaries]);

    return (
        <div>
          <Bar
            data={graphData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  title: {
                    display: !isMobile,
                    text: 'Hourly wage',
                    font: {
                      size: 14,
                      weight: 'bold'
                    },
                  },
                },
                y: {
                  title: {
                    display: !isMobile,
                    text: 'Number of people',
                    font: {
                      size: 14,
                      weight: 'bold'
                    },
                  },
                }
              },
              responsive: true,
              ticks: {
                precision: 0
              },
            }}
          />
        </div>
      );

}

export default BarGraph;