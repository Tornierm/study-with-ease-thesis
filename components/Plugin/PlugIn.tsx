import styled from "styled-components"
import Dashboard from "./Dashboard/Dashboard"
import { useEffect, useState } from "react"
import { IAssignment, ICourse, IMilestone, IMilestoneData, Kind, Prio, Status } from "./Interfaces"
import MilestoneManager from "./MilestoneManager/MilestoneManager"
import TimeWizard from "./TimeWizard/TimeWizard"
import _ from "lodash"

const DashboardContainer = styled.div`
  height: 600px;
  width: 600px;
  background-color: aliceblue;
  margin-top:52px;
`

const initialCourses: Map<number, ICourse> = new Map([
  [1, {
    id: 1,
    name: "math",
    assignments: new Map([
      [1,
        {
          start: new Date(2023,9,16),
          deadline: new Date(2023,9,29),
          name: "assignment1",
          id: 1,
          courseName: "math",
          courseId: 1,
          counter: 3,
          milestones: [
            {
              name: "Plan",
              description: "",
              assignment: "assignment1",
              assignmentId: 1,
              courseId: 1,
              course: "math",
              status: Status.ongoing,
              id: 1,
              prio: Prio.p0,
              // deadline: new Date(2023,9,16),
              kind: Kind.plan,
            },
            {
              name: "Submit",
              description: "",
              assignment: "assignment1",
              assignmentId: 1,
              courseId: 1,
              course: "math",
              status: Status.ongoing,
              id: 2,
              prio: Prio.p0,
              deadline: new Date(2023,9,29),
              kind: Kind.submit,
            },
          ],
        }
      ],  
      [2,
        {
          start: new Date(2023,10,1),
          deadline: new Date(2023,10,14),
          name: "Assignment2",
          id: 2,
          courseName: "math",
          courseId: 2,
          counter: 3,
          milestones: [
            {
              name: "Plan",
              description: "",
              assignment: "Assignment2",
              assignmentId: 2,
              courseId: 1,
              course: "math",
              status: Status.ongoing,
              id: 1,
              prio: Prio.p0,
              // deadline: new Date(2023,10,1),
              kind: Kind.plan,
            },
            {
              name: "Submit",
              description: "",
              assignment: "Assignment2",
              assignmentId: 2,
              courseId: 1,
              course: "math",
              status: Status.ongoing,
              id: 2,
              prio: Prio.p0,
              deadline: new Date(2023,10,14),
              kind: Kind.submit,
            },
          ],
        }
      ], 
    ])
  }]
])

const InitialDate = new Date(2023,9,16)

export default function PlugIn() {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | undefined>(undefined)
    const [selectedAssignment, setSelectedAssignment] = useState<IAssignment | undefined>(undefined)
    const [assignments, setAssignments] = useState<IAssignment[]>(getAssignmentsFromCourses(initialCourses))
    const [courses] = useState<Map<number, ICourse>>(initialCourses)
    const [milestones, setMilestones] = useState<IMilestone[]>(getMilestonesFromCourses(initialCourses))
    const [update, setUpdate] = useState<boolean>(true);
    const [currentDate, setCurrentDate] = useState<Date>(InitialDate);

    const swapMilestoneUp = (swappedMilestone: IMilestone, swapMilestones: IMilestone[]) => {
      let index = milestones.findIndex((milestone) => {
        return milestone.id === swappedMilestone.id;
      })
      let swapindex = index - 1;
      if(!(typeof swapMilestones[swapindex].kind !== 'undefined')){
        if(swapMilestones[swapindex].kind !== (Kind.plan || Kind.submit)){
          swapElements(swapMilestones, index, swapindex);
        }
      }
    }

    const swapMilestoneDown = (swappedMilestone: IMilestone, swapMilestones: IMilestone[]) => {
      let index = milestones.findIndex((milestone) => {
        return milestone.id === swappedMilestone.id;
      })
      let swapindex = index + 1;
      if(!(typeof swapMilestones[swapindex].kind !== 'undefined')){
        if(swapMilestones[swapindex].kind !== (Kind.plan || Kind.submit)){
          swapElements(swapMilestones, index, swapindex);
        }
      }
    }

    const swapElements = (milestones: IMilestone[], i1: number, i2: number) => {
      // Step 1
      let temp = milestones[i1];
      // Step 2
      milestones[i1] = milestones[i2];
      // Step 3
      milestones[i2] = temp;
      setUpdate(true);
    }

    const addMilestoneToAssignment = (milestoneData: IMilestoneData) => {
      const course = courses.get(milestoneData.courseId)
      if(!course){
        console.log("no course with this id")
        return
      }
      const assignment = course.assignments.get(milestoneData.assignmentId)
      if(!assignment){
        console.log("no assignment with this id")
        return
      }
      const id = assignment.counter++;
      const newMilestone: IMilestone = {
        ...milestoneData,
        status: Status.ongoing,
        assignment: assignment.name,
        course: course.name,
        id: id,
        prio: Prio.p0
      }
      if(!newMilestone.deadline){
        //put before submission
        let index = assignment.milestones.findIndex((milestone) => {
          return milestone.kind === Kind.submit
        })
        assignment?.milestones.splice(index, 0, newMilestone)
      } else if(newMilestone.deadline) {
        //put right before element with higher deadline
        let index = assignment.milestones.findIndex((milestone) => {
          if(!milestone.deadline || !newMilestone.deadline){
            return
          }
          return milestone.deadline > newMilestone.deadline
        })
        assignment?.milestones.splice(index, 0, newMilestone)
      }
      setUpdate(true)
    }

    const deleteMilestoneFromAssignment = (milestoneToDelete: IMilestone) => {
      const course = courses.get(milestoneToDelete.courseId)
      if(!course){
        console.log("no course with this id")
        return
      }
      const assignment = course.assignments.get(milestoneToDelete.assignmentId)
      if(!assignment){
        console.log("no assignment with this id")
        return
      }
      
      let milestoneIndex: number = assignment?.milestones.findIndex((milestone) => {
        return milestone.id === milestoneToDelete.id;
      })
      assignment?.milestones.splice(milestoneIndex, 1)
      setUpdate(true)
    }

    const calculateUrgencyForCourses = () => {
      courses.forEach((c) => {
        c.assignments.forEach((a) => {
          calculateUrgencyForAssignment(a)
        })
      })
    }

    const calculateUrgencyForAssignment = (a: IAssignment) => {
      let tmp: IAssignment = _.cloneDeep(a)
      fillDeadlines(tmp)
      fillPrio2(tmp)
      a.milestones.forEach((m, i) => {
        m.prio = tmp.milestones[i].prio;
      })
    }

    const fillDeadlines = (tmp: IAssignment) => {
      let priorIndexWithDate: number;
      let counter = 0;
      tmp.milestones.forEach((milestone, i) => {
        if(!milestone.deadline){
          counter++
        } else {
          let deadline1;
          if(!priorIndexWithDate){
            deadline1 = tmp.start;
          } else {
            deadline1 = tmp.milestones[priorIndexWithDate].deadline;
          }
          const deadline2 = tmp.milestones[i].deadline;

          if(typeof deadline2 == 'undefined' || typeof deadline1 == 'undefined'){
            return
          }
          //calc the diff between the prior date and the next date
          let dif= getTimeDifInDays(deadline2, deadline1);
          let steps = (dif/(counter + 1));
          for(let ii=1;ii <= counter;ii++){
            tmp.milestones[i - (counter - (ii - 1))].deadline = addDays(addDays(deadline1, dif/2), Math.round(steps * ii)/2)
          }
          priorIndexWithDate = i;
          counter = 0;
        }
      })
    }

    const fillPrio = (tmp: IAssignment) => {
      //for each milestone
      tmp.milestones.forEach((milestone) => {
        if(!milestone.deadline){
          return;
        }
        let timeBefore = getTimeDifInDays(tmp.start, milestone.deadline);
        let timeAfter = getTimeDifInDays(milestone.deadline, tmp.deadline);
        let timeDif = getTimeDifInDays(currentDate, milestone.deadline);
        //if positive put low prio
        let prio = 5;
        let frac = 0;
        //if 0 its p5
        if(timeDif == 0){
          //nothing
        } else if (timeDif < 0) {
          frac = Math.abs(timeDif/timeBefore);
          prio = 5 - Math.round(4*frac)
        } else if (timeDif > 0) {
          frac = Math.abs(timeDif/timeAfter);
          prio = 5 + Math.round(4*frac)
        }
        milestone.prio = getPrio(prio);
      })
    }

    const fillPrio2 = (tmp: IAssignment) => {
      //for each milestone
      tmp.milestones.forEach((milestone) => {
        if(!milestone.deadline){
          return;
        }
        let prio = getTimeDifInDays(milestone.deadline, currentDate)
        milestone.prio = getPrioReverse(prio);
      })
    }

    const getPrio = (prio: number) => {
      if(prio>9){
        prio = 9;
      }
      if(prio<1){
        prio = 1;
      }
      switch (prio) {
        case 1:
          return Prio.p1
        case 2:
          return Prio.p2
        case 3:
          return Prio.p3
        case 4:
          return Prio.p4
        case 5:
          return Prio.p5
        case 6:
          return Prio.p6
        case 7:
          return Prio.p7
        case 8:
          return Prio.p8
        case 9:
          return Prio.p9
        default:
          return Prio.p10;
      }
    }

    const getPrioReverse = (prio: number) => {
      if(prio>9){
        prio = 9;
      }
      if(prio<1){
        prio = 1;
      }
      switch (prio) {
        case 1:
          return Prio.p9
        case 2:
          return Prio.p8
        case 3:
          return Prio.p7
        case 4:
          return Prio.p6
        case 5:
          return Prio.p5
        case 6:
          return Prio.p4
        case 7:
          return Prio.p3
        case 8:
          return Prio.p2
        case 9:
          return Prio.p1
        default:
          return Prio.p0;
      }
    }

    const milliSecToDays = (mil: number) => {
      return mil/(1000 * 3600 * 24)
    }

    const addDays = (date: Date, days: number) => {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    const getTimeDifInDays = (date1: Date, date2: Date): number => {
      let dif= date1.getTime() - date2.getTime();
      return Math.round(milliSecToDays(dif))
    }

    useEffect(() => {
      if(selectedAssignmentId){
        setSelectedAssignment(getAssignmentById(selectedAssignmentId, assignments))
      } else {
        setSelectedAssignment(undefined)
      }
    },[selectedAssignmentId, assignments]);

    useEffect(() => {
        if(update){
          setMilestones(getMilestonesFromCourses(courses))
          setAssignments(getAssignmentsFromCourses(courses))
          calculateUrgencyForCourses()
          setUpdate(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update])

  useEffect(() => {
      setUpdate(true)
  },[currentDate])

    return (
      <DashboardContainer>
          {
            selectedAssignment
            ?<MilestoneManager 
              currentDate={currentDate}
              close={() => setSelectedAssignmentId(undefined)} 
              selectedAssignment={selectedAssignment}
              addMilestone={addMilestoneToAssignment}
              deleteMilestone={deleteMilestoneFromAssignment}
              swapMilestoneUp={swapMilestoneUp}
              swapMilestoneDown={swapMilestoneDown}
            /> 
            : <Dashboard setSelectedAssignmentId={setSelectedAssignmentId} milestones={milestones}/>
          }
          <TimeWizard setDate={setCurrentDate} date={currentDate}/>
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

function getAssignmentsFromCourses(courses: Map<number, ICourse>): IAssignment[] {
  let assignments: IAssignment[] = [];
  courses.forEach((course) => {
    course.assignments.forEach(assignment => {
      assignments.push(assignment);
    })
  })
  return assignments;
}

function getMilestonesFromCourses(courses: Map<number, ICourse>): IMilestone[] {
  let assignments = getAssignmentsFromCourses(courses);
  let milestones: IMilestone[] = [];
  assignments.forEach((assignment) => {
    assignment.milestones.forEach(milestone => {
      milestones.push(milestone);
    })
  })
  return milestones;
}
