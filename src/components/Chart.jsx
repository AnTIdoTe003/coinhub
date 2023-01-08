import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, 
    Legend,

)

const Chart = ({arr=[],currency,days}) => {
    console.log(days);
    console.log(arr);
    const price = []
    const date =[ ]
    for (let i = 0; i < arr.length; i++) {
        days==='24h'?date.push(new Date(arr[i][0]).toLocaleTimeString()):date.push(new Date(arr[i][0]).toLocaleDateString())
        price.push(arr[i][1])
    }
    
  return (
    <Line
    options={{
        responsive: true,
    }}
    data={{
        labels: date, //x-axis
        datasets:[{
            label:`Price in ${currency}`,
            data: price, //y-axis
            borderColor:"rgb(255,99,132)",
            backgroundColor:"rgba(255,99,132,0.5)",
        }]
    }}
    
    >

    </Line>

  )
}

export default Chart