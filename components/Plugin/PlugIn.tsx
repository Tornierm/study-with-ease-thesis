"use client"

import styled from "styled-components"
import Dashboard from "./Dashboard/Dashboard"
import { useEffect, useState } from "react"
import { IAssignment, IChartData, ICourse, IMilestone, IMilestoneData, Kind, Prio, Status } from "./Interfaces"
import MilestoneManager from "./MilestoneManager/MilestoneManager"
import _ from "lodash"
import { initialCourses } from "./CourseData"

const DashboardContainer = styled.div`
  height: 600px;
  width: 100%;
  margin: 24px 0;
  grid-area: plugin;
`

interface IOwnProps {
  currentDate: Date,
  reset: boolean;
  setReset: any;
}

export default function PlugIn(props: IOwnProps) {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will only run on the client
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const getCourses = (): Map<number, ICourse> => {
    let stringed;
    if (isClient) {
      stringed = localStorage.getItem("study-with-ease")
    }
    if(stringed) {
      const tmp: Map<number, ICourse>= new Map(JSON.parse(stringed))
      tmp.forEach((c) => {
        c.assignments = new Map(c.assignments)
      })
      tmp.forEach((course) => {
        course.assignments.forEach((a) => {
          a.deadline = new Date(a.deadline)
          a.start = new Date(a.start)
          a.milestones.forEach(m => {
            m.completionDate = m.completionDate ? new Date(m.completionDate) : undefined;
            m.deadline = m.deadline ? new Date(m.deadline) : undefined;
          });
        })
      })
      return tmp;
    } else {
      return _.cloneDeep(initialCourses)
    }
  }

  const putCourses = () => {
    let tmp: any = _.cloneDeep(courses)
    tmp.forEach((c: any) => {
      c.assignments = Array.from(c.assignments.entries())
    })
    let stringed = JSON.stringify(Array.from(tmp.entries()))
    if (isClient) {
      // Perform localStorage action
      localStorage.setItem("study-with-ease", stringed)
    }
  }

    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | undefined>(undefined)
    const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(undefined)

    const [selectedAssignment, setSelectedAssignment] = useState<IAssignment | undefined>(undefined)
    const [assignments, setAssignments] = useState<IAssignment[]>(getAssignmentsFromCourses(initialCourses))
    const [courses, setCourses] = useState<Map<number, ICourse>>(getCourses())
    const [milestones, setMilestones] = useState<IMilestone[]>(getMilestonesFromCourses(initialCourses, props.currentDate))
    const [update, setUpdate] = useState<boolean>(true);
    const [chartData, setChartData] = useState<IChartData[][]>(calculateChartData(courses, props.currentDate));
    const [dailyScope, setDailyScope] = useState<number>(getScope(courses, props.currentDate))
    
    const swapMilestoneUp = (swappedMilestone: IMilestone, swapMilestones: IMilestone[]) => {
      let index = milestones.findIndex((milestone) => {
        return milestone.id === swappedMilestone.id;
      })
      if(index === 0){
        return
      }
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
        milestone.completionDate = new Date(JSON.parse(JSON.stringify(props.currentDate)));
        if(milestone.kind === Kind.submit){
          let a = getAssignmentByIdAndCourseId(milestone.assignmentId, milestone.courseId, getAssignmentsFromCourses(courses))
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
        m.tmpDeadline = tmp.milestones[i].deadline;
      })
    }

    const fillDeadlines = (tmp: IAssignment) => {
      let priorIndexWithDate: number;
      let counter = 0;
      tmp.milestones.forEach((milestone, i) => {
        if(milestone.kind === Kind.plan){
          tmp.milestones[0].deadline = addDays(tmp.start, 5)
        }
        else if(!milestone.deadline){
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
        let timeDif = getTimeDifInDays(props.currentDate, milestone.deadline);
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
        let prio = getTimeDifInDays(milestone.deadline, props.currentDate)
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

    const setAssignmentAndCourseId = (assignmentId: number, courseId: number) => {
      setSelectedAssignmentId(assignmentId)
      setSelectedCourseId(courseId)
    }

    useEffect(() => {
      if(selectedAssignmentId && selectedCourseId){
        setSelectedAssignment(getAssignmentByIdAndCourseId(selectedAssignmentId, selectedCourseId, assignments))
      } else {
        setSelectedAssignment(undefined)
      }
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedAssignmentId, assignments]);

    useEffect(() => {
        if(update){
          setMilestones(getMilestonesFromCourses(courses, props.currentDate))
          setAssignments(getAssignmentsFromCourses(courses))
          calculateUrgencyForCourses()
          setChartData(calculateChartData(courses, props.currentDate))
          setDailyScope(getScope(courses, props.currentDate))
          putCourses()
          setUpdate(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[update, courses])

  useEffect(() => {
      setUpdate(!update)
      setSelectedAssignmentId(undefined)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.currentDate])

  useEffect(() => {
    if(props.reset == true){
      const tmp = _.cloneDeep(initialCourses)
      setCourses(tmp)
      setSelectedAssignmentId(undefined)
      setUpdate(!update)
      props.setReset(false)
    } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reset])

    return (
      <DashboardContainer>
          {
            selectedAssignment
            ?<MilestoneManager 
              currentDate={props.currentDate}
              close={() => setSelectedAssignmentId(undefined)} 
              selectedAssignment={selectedAssignment}
              addMilestone={addMilestoneToAssignment}
              deleteMilestone={deleteMilestoneFromAssignment}
              swapMilestoneUp={swapMilestoneUp}
              swapMilestoneDown={swapMilestoneDown}
              toggleDone={toggleDone}
            /> 
            : <Dashboard dailyScope={dailyScope} chartData={chartData} toggleDone={toggleDone} setAssignmentAndCourseId={setAssignmentAndCourseId} milestones={milestones}/>
          }
      </DashboardContainer>
    )
  }


  const getAssignmentByIdAndCourseId = (assignentId: number, courseId:number, assignments: IAssignment[]): IAssignment | undefined => {
    for(const assignment of assignments){
      if(assignment.id === assignentId && assignment.courseId === courseId){
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
  milestones.sort((m1, m2) => {
    if(!m1.tmpDeadline || !m2.tmpDeadline){
      return 1
    }
    return m1.tmpDeadline < m2.tmpDeadline ? -1 : 1;
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
