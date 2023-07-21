import styled from "styled-components"
import { Bar, Chart } from 'react-chartjs-2';
import { registerables, Chart as ChartJS, BubbleDataPoint, ChartData, Point } from "chart.js"
ChartJS.register(
  ...registerables
);

const ChartsContainer = styled.div`
  grid-area: charts;
  background-color: yellow;
  display:flex;
  flex-direction: column;
  overflow: scroll;
  padding:8px;
`

const chartData = [
  {
    id: 1,
    value: 2,
  },
  {
    id: 2,
    value: 3,
  },
  {
    id: 3,
    value: 4,
  },
]


export default function Charts() {

    const Data = {
      type: "bar",
      labels:chartData.map(d => d.id),
      datasets: [
        {
          type: 'line' as const,
          label: 'Baseline',
          data: [2, 2, 2 ]
          
        },
        {
          type: 'bar' as const,
          label: "hello world",
          data: chartData.map(d => d.value)
        }
      ]
    }



const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

    return (
      <ChartsContainer>
            Charts
            <Chart data={Data} type={"bar"}></Chart>
            <Chart data={Data} type={"bar"}></Chart>
            <Chart data={pieData} type={"pie"}></Chart>
      </ChartsContainer>
    )
  }