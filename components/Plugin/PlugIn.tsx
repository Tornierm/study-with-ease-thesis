import styled from "styled-components"
import Dashboard from "./Dashboard/Dashboard"
import { useEffect, useState } from "react"
import { IAssignment, ICourse, IMilestone } from "./Interfaces"
import { dummycourses3 } from "./DummyData"
import MilestoneManager from "./MilestoneManager/MilestoneManager"
import { Milestone } from "lucide-react"

const DashboardContainer = styled.div`
  height: 600px;
  width: 600px;
  background-color: aliceblue;
  margin-top:52px;
`

export default function PlugIn() {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | undefined>(undefined)
    const [selectedAssignment, setSelectedAssignment] = useState<IAssignment | undefined>(undefined)
    const [assignments, setAssignments] = useState<IAssignment[]>([])
    const [courses, setCourses] = useState<ICourse[]>(dummycourses3)

    const [milestones, setMilestones] = useState<IMilestone[]>([])

    useEffect(() => {
      if(selectedAssignmentId){
        setSelectedAssignment(getAssignmentById(selectedAssignmentId, assignments))
      } else {
        setSelectedAssignment(undefined)
      }
    },[selectedAssignmentId]);

    useEffect(() => {
      const assignments = getAssignmentsFromCourses(courses)
      const milestones = getMilestonesFromAssignments(assignments)
      setAssignments(assignments)
      setMilestones(milestones)
    },[JSON.stringify(courses)])



    return (
      <DashboardContainer>
          {
            selectedAssignment
            ?<MilestoneManager close={() => setSelectedAssignmentId(undefined)} selectedAssignment={selectedAssignment}/> 
            : <Dashboard setSelectedAssignmentId={setSelectedAssignmentId} milestones={milestones}/>
          }
      </DashboardContainer>
    )
  }


  const getAssignmentById = (assignentId: number, assignments: IAssignment[]): IAssignment | undefined => {
    for(const assignment of assignments){
      if(assignment.id === assignentId){
        return assignment
      }
    }
  }

function getAssignmentsFromCourses(courses: ICourse[]): IAssignment[] {
  let assignments: IAssignment[] = [];
  for(let course of courses){
    course.assignments.forEach(assignment => {
      assignments.push(assignment);
    })
  }
  return assignments;
}

function getMilestonesFromAssignments(assignments: IAssignment[]): IMilestone[] {
  let milestones: IMilestone[] = [];
  for(let assignment of assignments){
    assignment.milestones.forEach(milestone => {
      milestones.push(milestone);
    })
  }
  return milestones;
}
