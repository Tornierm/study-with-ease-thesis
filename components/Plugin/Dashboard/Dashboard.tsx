"use client"

import styled from "styled-components"
import MilestoneList from "./MilestoneList/MilestoneList"
import Charts from "./Charts"
import { Dispatch, SetStateAction } from "react"
import { IChartData, IMilestone } from "../Interfaces"
import Header from "../Header"

const DashboardContainer = styled.div`
  height: 600px;
  width: 100%;
  max-width: 800px;
  background-color: white;
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
    setAssignmentAndCourseId: (assignmentId : number, courseId: number) => void
    milestones: IMilestone[];
    chartData: IChartData[][];
    toggleDone: (m:IMilestone) => void;
    dailyScope: number;
}


export default function Dashboard(props: IOwnProps) {
  const tmp = (milestone: IMilestone) => {
    console.log(milestone)
    debugger
    props.setAssignmentAndCourseId(milestone.assignmentId, milestone.courseId)
  }
  
    return (
      <DashboardContainer>
        <Header
          title={"Dashboard"}
        />        
        <MilestoneList toggleDone={props.toggleDone} editable={false} onManageMilestone={tmp} milestones={props.milestones}/>
        <Charts dailyScope={props.dailyScope} chartData={props.chartData}/>
      </DashboardContainer>
    )
  }