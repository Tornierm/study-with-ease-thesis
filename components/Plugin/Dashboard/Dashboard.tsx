import styled from "styled-components"
import MilestoneList from "./MilestoneList/MilestoneList"
import Charts from "./Charts"
import { Title } from "../styled"
import { DummyMilestones } from "../DummyData"
import { Dispatch, SetStateAction } from "react"
import { IMilestone } from "../Interfaces"

const DashboardContainer = styled.div`
  height: 600px;
  width: 600px;
  background-color: aliceblue;
  display:grid;
  grid-template-areas:
    "header header"
    "list  charts"
    "list  charts";
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 1fr 1fr;
  gap: 8px 8px;
  padding:8px;
`

const Header = styled.div`
  grid-area: header;
`

interface IOwnProps {
    setSelectedAssignmentId: Dispatch<SetStateAction<number | undefined>>
    milestones: IMilestone[];
}


export default function Dashboard(props: IOwnProps) {
    return (
      <DashboardContainer>
        <Header>
        <Title>Dashboard</Title>  
        </Header>
            <MilestoneList setSelectedAssignmentId={props.setSelectedAssignmentId} milestones={props.milestones}/>
            <Charts/>
      </DashboardContainer>
    )
  }