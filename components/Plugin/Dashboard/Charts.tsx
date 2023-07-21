import styled from "styled-components"
import { Bar, Chart } from 'react-chartjs-2';
import { registerables, Chart as ChartJS } from "chart.js"
import { IChartData } from "../Interfaces";
import {Title, Title2} from '../styled'
ChartJS.register(
  ...registerables
);

const ChartsContainer = styled.div`
  grid-area: charts;
  border: 2px solid black;
  overflow: scroll;
  padding:8px;
  display:flex;
  flex-direction: column;
  align-items: center;
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

interface IOwnProps {
  chartData: IChartData[][]
}


export default function Charts(props: IOwnProps) {

    const DayData = {
      type: "bar",
      labels:props.chartData[0].map(d => d.id),
      datasets: [
        {
          type: 'line' as const,
          label: 'Daily Scope',
          data: props.chartData[0].map(d => 2),
          backgroundColor: [
            'black',
          ],
          borderColor: [
            'black',
          ],
        },
        {
          type: 'bar' as const,
          label: "Milestones",
          data: props.chartData[0].map(d => d.value),
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
        }
      ]
    }

    const dayOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Milestones reached per Day',
        },
      },
    };

    const weekOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Milestones reached per Week',
        },
      },
    };

    const pieOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Assignments finished per Class',
        },
      },
    };

    const WeekData = {
      type: "bar",
      labels:props.chartData[1].map(d => d.id),
      
      datasets: [
        {
          type: 'bar' as const,
          label: "Milestones",
          data: props.chartData[1].map(d => d.value),
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
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
            <Title2>Milestones per Day</Title2>
            <Chart data={DayData} type={"bar"}></Chart>
            <Title2>Milestones per Week</Title2>
            <Chart data={WeekData} type={"bar"}></Chart>
            <Title2>Assignments per Class</Title2>
            <Chart data={pieData} options={pieOptions} type={"pie"}></Chart>
      </ChartsContainer>
    )
  }