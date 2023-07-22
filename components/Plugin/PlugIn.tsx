import styled from "styled-components"
import Dashboard from "./Dashboard/Dashboard"
import { useEffect, useState } from "react"
import { IAssignment, IChartData, ICourse, IMilestone, IMilestoneData, Kind, Prio, Status } from "./Interfaces"
import MilestoneManager from "./MilestoneManager/MilestoneManager"
import TimeWizard from "./TimeWizard/TimeWizard"
import _ from "lodash"

const DashboardContainer = styled.div`
  height: 800px;
  width: 600px;
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
    const [currentDate, setCurrentDate] = useState<Date>(InitialDate);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | undefined>(undefined)
    const [selectedAssignment, setSelectedAssignment] = useState<IAssignment | undefined>(undefined)
    const [assignments, setAssignments] = useState<IAssignment[]>(getAssignmentsFromCourses(initialCourses))
    const [courses] = useState<Map<number, ICourse>>(initialCourses)
    const [milestones, setMilestones] = useState<IMilestone[]>(getMilestonesFromCourses(initialCourses, currentDate))
    const [update, setUpdate] = useState<boolean>(true);
    const [chartData, setChartData] = useState<IChartData[][]>(calculateChartData(courses, currentDate));
    const [dailyScope, setDailyScope] = useState<number>(getScope(courses, currentDate))

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

    const toggleDone = (milestone: IMilestone) => {
      if(milestone.status === Status.finished){
        milestone.status = Status.ongoing
        milestone.completionDate = undefined;
      } else {
        milestone.status= Status.finished
        milestone.completionDate = new Date(JSON.parse(JSON.stringify(currentDate)));
        if(milestone.kind === Kind.submit){
          let a = getAssignmentById(milestone.assignmentId, getAssignmentsFromCourses(courses))
          if(!a){
            return
          }
          a.finished = true;
        }
      }
      setUpdate(true);
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
        prio: Prio.p0,
        tasks: []
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

    useEffect(() => {
      if(selectedAssignmentId){
        setSelectedAssignment(getAssignmentById(selectedAssignmentId, assignments))
      } else {
        setSelectedAssignment(undefined)
      }
    },[selectedAssignmentId, assignments]);

    useEffect(() => {
        if(update){
          setMilestones(getMilestonesFromCourses(courses, currentDate))
          setAssignments(getAssignmentsFromCourses(courses))
          calculateUrgencyForCourses()
          setChartData(calculateChartData(courses, currentDate))
          setDailyScope(getScope(courses, currentDate))
          setUpdate(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update])

  useEffect(() => {
      setUpdate(!update)
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
              toggleDone={toggleDone}
            /> 
            : <Dashboard dailyScope={dailyScope} chartData={chartData} toggleDone={toggleDone} setSelectedAssignmentId={setSelectedAssignmentId} milestones={milestones}/>
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

const getMilestonesFromCourses = (courses: Map<number, ICourse>, currentDate: Date): IMilestone[] => {
  let assignments = getAssignmentsFromCourses(courses);
  let milestones: IMilestone[] = [];
  assignments.forEach((assignment) => {
    assignment.milestones.forEach(milestone => {
      if((milestone.status === Status.ongoing) && (getTimeDifInDays(assignment.start, currentDate) <= 0)){
        milestones.push(milestone);
      }
    })
  })
  return milestones;
}
const calculateChartData = (courses: Map<number, ICourse>, currentDate: Date): IChartData[][] => {
  let days = {
    1: addDays(currentDate, -4),
    2: addDays(currentDate, -3),
    3: addDays(currentDate, -2),
    4: addDays(currentDate, -1),
    5: addDays(currentDate, -0),
  }

  let weeks = {
    1: getWeek(addDays(currentDate, -28)),
    2: getWeek(addDays(currentDate, -21)),
    3: getWeek(addDays(currentDate, -14)),
    4: getWeek(addDays(currentDate, -7)),
    5: getWeek(addDays(currentDate, -0)),
  }

  const getCourseData = (): IChartData[] => {
    let courseData:IChartData[] = []
    courses.forEach((c) => {
      let numberOnGoing = 0;
      let numberFinished = 0;
      c.assignments.forEach((a) => {
        if(a.finished){
          numberFinished++;
        } else {
          numberOnGoing++;
        }
      })
      const finished: IChartData = {
        id: c.name + " finished",
        value: numberFinished,
      }
      const onGoing: IChartData = {
        id: c.name + " ongoing",
        value: numberOnGoing,
      }
      courseData.push(finished)
      courseData.push(onGoing)
    })
    return courseData
  }
  

  let chartData:IChartData[][] =[
    [
      {
        id: getDateString(days[1]),
        value: getValueForDay(days[1], courses),
      },
      {
        id: getDateString(days[2]),
        value: getValueForDay(days[2], courses),
      },
      {
        id: getDateString(days[3]),
        value: getValueForDay(days[3], courses),
      },
      {
        id: getDateString(days[4]),
        value: getValueForDay(days[4], courses),
      },
      {
        id: getDateString(days[5]),
        value: getValueForDay(days[5], courses),
      },
    ],
    [
      {
        id: weeks[1].toString(),
        value: getValueForWeek(weeks[1], courses),
      },
      {
        id: weeks[2].toString(),
        value: getValueForWeek(weeks[2], courses),
      },
      {
        id: weeks[3].toString(),
        value: getValueForWeek(weeks[3], courses),
      },
      {
        id: weeks[4].toString(),
        value: getValueForWeek(weeks[4], courses),
      },
      {
        id: weeks[5].toString(),
        value: getValueForWeek(weeks[5], courses),
      },
    ],
    getCourseData()
  ];
  return chartData;
}

const getDateString = (date: Date) => {
  return date.getDate().toString() + "." + date.getMonth().toString()
}

const getValueForDay = (day: Date, courses: Map<number, ICourse>): number => {
  let value = 0;
  courses.forEach((c) => {
    c.assignments.forEach((a) => {
      a.milestones.forEach((m) => {
        if(day.getTime() == m.completionDate?.getTime()){
          value = value + 1
        }
      })
    })
  })
  return value
}

const getValueForWeek = (week: number, courses: Map<number, ICourse>): number => {
  let value = 0;
  courses.forEach((c) => {
    c.assignments.forEach((a) => {
      a.milestones.forEach((m) => {
        if(m.completionDate){
          if(week == getWeek(m.completionDate)){
            value = value + 1
          }
        }
      })
    })
  })
  return value
}

const getWeek = (d: Date) => {
  let date = new Date(JSON.parse(JSON.stringify(d)))
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

const getScope = (courses: Map<number, ICourse>, currentDate: Date): number => {
  let scope = 0;
  courses.forEach((c) => {
    c.assignments.forEach((a) => {
      if(a.start < currentDate && currentDate < a.deadline){
        let milestoneNumber = a.milestones.length;
        let days = Math.abs(getTimeDifInDays(a.start, a.deadline))
        let ratio = milestoneNumber/days;
        scope = scope + ratio;
      }
    })
  })
  scope = Math.round(scope);
  if(scope < 1){
    scope = 1;
  }
  return scope
}
