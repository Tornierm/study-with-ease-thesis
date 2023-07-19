import styled from "styled-components"
import { IMilestone, Prio } from "../../Interfaces";
import { Dispatch, SetStateAction } from "react";

const MilestoneContainer = styled.div`
  background-color: ${props => props.color};
  height:100px;
  width: 100%;
`

const Name = styled.p`
    font-size: 12px;
`

const MilestoneHeader = styled.div`
    display: flex;
    font-size: 12px;
    gap:8px;
`

interface IOwnProps {
    milestone: IMilestone;
    setSelectedAssignmentId: Dispatch<SetStateAction<number | undefined>>;
}

export default function Dashboard(props: IOwnProps) {
    return (
      <MilestoneContainer onClick={() => props.setSelectedAssignmentId(props.milestone.assignmentId)} color={getColor(props.milestone.prio)}>
        <MilestoneHeader>
            {props.milestone.class}{">"}
            {props.milestone.assignment}{">"}
            {props.milestone.name}
        </MilestoneHeader>
        
        <Name>{props.milestone.deadline?.toDateString()}</Name>
      </MilestoneContainer>
    )
}

const getColor = (prio: Prio): string => {
    if(prio == Prio.p0){
        return "white"
    } if(prio == Prio.p1){
        return "#2cba00"
    } if(prio == Prio.p2){
        return "#61C900"
    } if(prio == Prio.p3){
        return "#96D700"
    } if(prio == Prio.p4){
        return "#CAE600"
    } if(prio == Prio.p5){
        return "#fff400"
    } if(prio == Prio.p6){
        return "#FFB700"
    } if(prio == Prio.p7){
        return "#FF7A00"
    } if(prio == Prio.p8){
        return "#FF3D00"
    } if(prio == Prio.p9){
        return "#ff0000"
    }
    return "white"
}