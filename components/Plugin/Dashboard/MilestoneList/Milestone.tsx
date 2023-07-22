import styled from "styled-components"
import { IMilestone, Prio, Status } from "../../Interfaces";
import { Dispatch, SetStateAction } from "react";
import { SubTitle, Title2 } from "../../styled";
import { Checkbox } from "@/components/ui/checkbox";

const MilestoneContainer = styled.div`
  background-color: ${props => props.color};
  min-height:80px;
  width: 100%;
  padding:4px 4px 4px 8px;
  display:grid;
  border-radius: 4px;
  border:1px solid black;
  grid-template-areas: "nothing breadcrumbs breadcrumbs breadcrumbs breadcrumbs delete"
                        "checkbox title title title title manage"
                        "free deadline deadline deadline deadline none";
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 20px;
  gap:0px 8px;
`

const Name = styled(Title2)`
    grid-area: title;
`

const Breadcrumbs = styled(SubTitle)`
    grid-area: breadcrumbs;
`

const Delete = styled.p`
    grid-area: delete;
`

const Deadline = styled.div`
    font-size: 12px;
    grid-area: deadline;
`

const SpaceBetween = styled.div`
    display: flex;
    width: 100%;
    align-items: space-between;
    justify-content: space-between;
`

const Box = styled(Checkbox)`
    grid-area: checkbox;
`

const Manage = styled.div`
    grid-area: manage;
`

interface IOwnProps {
    milestone: IMilestone;
    setSelectedAssignmentId: Dispatch<SetStateAction<number | undefined>>;
    onDelete: () => void;
    toggleDone: (m: IMilestone) => void;
    editable: boolean;
}

export default function Dashboard(props: IOwnProps) {
    

    return (
      <MilestoneContainer color={getColor(props.milestone)}>
            <Breadcrumbs>
                {props.milestone.course}{">"}
                {props.milestone.assignment}{">"}
            </Breadcrumbs>
            <Name>{props.milestone.name}</Name>
            <Deadline>
                {props.milestone.deadline && <SpaceBetween><div>{"Deadline:"}</div><div>{props.milestone.deadline?.toDateString()}</div></SpaceBetween>}
                {props.milestone.estimate && <SpaceBetween><div>{"Estimate:"}</div><div>{props.milestone.estimate}</div></SpaceBetween>}
            </Deadline>
            <Box onCheckedChange={() => props.toggleDone(props.milestone)} checked={props.milestone.status === Status.finished}/>
            <Manage onClick={() => props.setSelectedAssignmentId(props.milestone.assignmentId)}>{">"}</Manage>
        {
            props.editable && (typeof props.milestone.kind == 'undefined') ? <Delete onClick={props.onDelete}>x</Delete>:<></>
        }
      </MilestoneContainer>
    )
}

const getColor = (milestone: IMilestone): string => {
    if(milestone.status === Status.finished){
        return "white"
    }
    const prio = milestone.prio;
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
    } if(prio == Prio.p10){
        return "white"
    }
    return "white"
}