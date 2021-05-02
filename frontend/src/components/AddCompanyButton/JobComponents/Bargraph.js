import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';

function BarGraph(props){
    const graphData = {
        labels: [1, 2, 3,
                 4, 5],
        datasets: [
          {
            label: '# of people',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }
        ]
    }

    return (
        <div>
          <Bar
            data={graphData}
            options={{
              title:{
                display:true,
                text:'Hourly Salaries for (insert company name)',
                fontSize:20
              },
              legend:{
                display:false,
                position:'right'
              }
            }}
          />
        </div>
      );

}