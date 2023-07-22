import styled from "styled-components"
import MilestoneList from "./MilestoneList/MilestoneList"
import Charts from "./Charts"
import { Dispatch, SetStateAction } from "react"
import { IChartData, IMilestone } from "../Interfaces"
import Header from "../Header"

const DashboardContainer = styled.div`
  height: 600px;
  width: 600px;
  background-color: aliceblue;
  display:grid;
  grid-template-areas:
    "header header"
    "list  charts"
    "list  charts";
  grid-template-rows: auto 1fr 30px;
  grid-template-columns: 1fr 1fr;
  gap: 8px 8px;
  padding:8px;
`

interface IOwnProps {
    setSelectedAssignmentId: Dispatch<SetStateAction<number | undefined>>
    milestones: IMilestone[];
    chartData: IChartData[][];
    toggleDone: (m:IMilestone) => void;
    dailyScope: number;
}


export default function Dashboard(props: IOwnProps) {
    return (
      <DashboardContainer>
        <Header
          title={"Dashboard"}
        />
        {/* <StyledHeader></StyledHeader> */}
        
        <MilestoneList toggleDone={props.toggleDone} editable={false} setSelectedAssignmentId={props.setSelectedAssignmentId} milestones={props.milestones}/>
        <Charts dailyScope={props.dailyScope} chartData={props.chartData}/>
      </DashboardContainer>
    )
  }