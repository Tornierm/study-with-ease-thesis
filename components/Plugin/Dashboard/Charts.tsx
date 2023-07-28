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
  border: 1px solid black;
  overflow: scroll;
  gap:8px;
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0px;
`


const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width:250px;
  height:400px;
`

interface IOwnProps {
  chartData: IChartData[][];
  dailyScope: number;
}


export default function Charts(props: IOwnProps) {

    const DayData = {
      type: "bar",
      labels:props.chartData[0].map(d => d.id),
      datasets: [
        {
          type: 'line' as const,
          label: 'Daily Scope',
          data: props.chartData[0].map(d => props.dailyScope),
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
      scales: {
        y: {
            suggestedMin: 2,
            suggestedMax: 4
        }
      }
    };

    const weekOptions = {
      scales: {
        y: {
            suggestedMin: 5,
            suggestedMax: 10
        }
      }
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
  labels:props.chartData[2].map(d => d.id),
  datasets: [
    {
      label: '# of Votes',
      data: props.chartData[2].map(d => d.value),
      backgroundColor: [
        '#ff6384',
        '#FFC2CF',
        '#5299D3',
        '#BED9EE',
        '#5E5C6C',
        '#BEBDC7',
        '#202C59',
        '#A5B2DF',
        '#16810E',
        '#A9F5A3',
      ],
      borderColor: [
        '#ff6384',
        '#ff6384',
        '#5299D3',
        '#5299D3',
        '#5E5C6C',
        '#5E5C6C',
        '#202C59',
        '#202C59',
        '#16810E',
        '#16810E',
      ],
      borderWidth: 1,
    },
  ],
};

    return (
      <ChartsContainer>
            <Title2>Milestones per Day</Title2>
            <Background>
              <Chart options={dayOptions} data={DayData} type={"bar"}></Chart>
            </Background>
            <Title2>Milestones per Week</Title2>
            <Background>
              <Chart options={weekOptions} data={WeekData} type={"bar"}></Chart>
            </Background>
            <Title2>Assignments per Class</Title2>
            <Background>
              <Chart data={pieData} type={"pie"}></Chart>
            </Background>
      </ChartsContainer>
    )
  }