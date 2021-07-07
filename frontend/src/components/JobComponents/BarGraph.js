import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function BarGraph(props){
    const [graphData, setGraphData] = useState(null);
    const isMobile = useMediaQuery('(max-width: 520px)');

    useEffect(() => {
        var graphLabels = ["$5", "$10", "$15", "$20", "$25", "$30", "$35", "$40", "$45", "$50", "$55",
                            "$60", "$65", "$70", "$75", "$80", "$85", "$90", "$95", "$100", ">$100", ];
        var graphValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

        props.salaries.forEach(salary => {
          if (salary.wage > 100) {
            graphValues[20] += 1;
          } else {
            graphValues[Math.floor((salary.wage - 1) / 5)] += 1;
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