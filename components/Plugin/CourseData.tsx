import menu from "../../public/menu.png"
import { IAssignmentData, ICourse, ICourseData, IMilestoneData, Kind, Prio, Status } from "./Interfaces"

const createCourseFromData = (data: ICourseData) => {
  
}

const createAssignmentFromData = (data: IAssignmentData) => {
  
}

const createMilestoneFromData = (data: IMilestoneData) => {
  
}

const Math: ICourse = {
  id: 1,
  name: "Math",
  assignments: new Map([
    [1,
      {
        start: new Date(2023,9,16),
        deadline: new Date(2023,9,30),
        name: "Math Assignment 1",
        id: 1,
        courseName: "Math",
        courseId: 1,
        counter: 5,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Solve Section 1",
            description: "",
            assignment: "Math Assignment 1",
            assignmentId: 1,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            tasks:[],
          },
          {
            name: "Solve Section 2",
            description: "",
            assignment: "Math Assignment 1",
            assignmentId: 1,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            tasks:[],
          },
          {
            name: "Solve Section 3",
            description: "",
            assignment: "Math Assignment 1",
            assignmentId: 1,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 3,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Math Assignment 1",
            assignmentId: 1,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 4,
            prio: Prio.p0,
            deadline: new Date(2023,9,30),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ],  
    [2,
      {
        start: new Date(2023,9,30),
        deadline: new Date(2023,10,13),
        name: "Math Assignment 2",
        id: 2,
        courseName: "math",
        courseId: 1,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Math Assignment 2",
            assignmentId: 2,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,10,1),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Math Assignment 2",
            assignmentId: 2,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,10,13),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ], 
    [3,
      {
        start: new Date(2023,10,13),
        deadline: new Date(2023,10,27),
        name: "Math Assignment 3",
        id: 3,
        courseName: "Math",
        courseId: 1,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Math Assignment 3",
            assignmentId: 3,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Math Assignment 3",
            assignmentId: 3,
            courseId: 1,
            course: "Math",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,10,27),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ],  
  ])
}

const Metaphysics: ICourse = {
  id: 2,
  name: "Metaphysics",
  assignments: new Map([
    [1,
      {
        start: new Date(2023,9,19),
        deadline: new Date(2023,10,9),
        name: "Metaphysics Assignment 1",
        id: 1,
        courseName: "Metaphysics",
        courseId: 2,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Metaphysics Assignment 1",
            assignmentId: 1,
            courseId: 2,
            course: "Metaphysics",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Metaphysics Assignment 1",
            assignmentId: 1,
            courseId: 2,
            course: "Metaphysics",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,10,9),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ],  
    [2,
      {
        start: new Date(2023,10,9),
        deadline: new Date(2023,10,30),
        name: "Metaphysics Assignment 2",
        id: 2,
        courseName: "Metaphysics",
        courseId: 2,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Metaphysics Assignment 2",
            assignmentId: 2,
            courseId: 2,
            course: "Metaphysics",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,10,1),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Metaphysics Assignment 2",
            assignmentId: 2,
            courseId: 2,
            course: "Metaphysics",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,10,30),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ], 
    [3,
      {
        start: new Date(2023,10,30),
        deadline: new Date(2023,11,21),
        name: "Metaphysics Assignment 3",
        id: 3,
        courseName: "Metaphysics",
        courseId: 2,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Metaphysics Assignment 3",
            assignmentId: 3,
            courseId: 2,
            course: "Metaphysics",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Metaphysics Assignment 3",
            assignmentId: 3,
            courseId: 2,
            course: "Metaphysics",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,11,21),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ],  
  ])
}

const IntroToPhilosophy: ICourse = {
  id: 3,
  name: "Pilosophy",
  assignments: new Map([
    [1,
      {
        start: new Date(2023,9,18),
        deadline: new Date(2023,10,8),
        name: "Philosophy Assignment 1",
        id: 1,
        courseName: "Philosophy",
        courseId: 3,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Philosophy Assignment 1",
            assignmentId: 1,
            courseId: 3,
            course: "Philosophy",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Philosophy Assignment 1",
            assignmentId: 1,
            courseId: 3,
            course: "Philosophy",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,10,8),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ],  
    [2,
      {
        start: new Date(2023,10,8),
        deadline: new Date(2023,10,29),
        name: "Philosophy Assignment 2",
        id: 2,
        courseName: "Philosophy",
        courseId: 3,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Philosophy Assignment 2",
            assignmentId: 2,
            courseId: 3,
            course: "Philosophy",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,10,1),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Philosophy Assignment 2",
            assignmentId: 2,
            courseId: 3,
            course: "Philosophy",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,10,29),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ], 
    [3,
      {
        start: new Date(2023,10,29),
        deadline: new Date(2023,11,20),
        name: "Philosophy Assignment 3",
        id: 3,
        courseName: "Philosophy",
        courseId: 3,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Philosophy Assignment 3",
            assignmentId: 3,
            courseId: 3,
            course: "Philosophy",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Philosophy Assignment 3",
            assignmentId: 3,
            courseId: 3,
            course: "Philosophy",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,11,20),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ],  
  ])
}

const Marketing: ICourse = {
  id: 4,
  name: "Marketing",
  assignments: new Map([
    [1,
      {
        start: new Date(2023,9,20),
        deadline: new Date(2023,11,1),
        name: "Marketing Assignment 1",
        id: 1,
        courseName: "Marketing",
        courseId: 4,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Marketing Assignment 1",
            assignmentId: 1,
            courseId: 4,
            course: "Marketing",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,9,16),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Marketing Assignment 1",
            assignmentId: 1,
            courseId: 4,
            course: "Marketing",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,11,1),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ],  
    [2,
      {
        start: new Date(2023,11,1),
        deadline: new Date(2023,0,12),
        name: "Marketing Assignment 2",
        id: 2,
        courseName: "Marketing",
        courseId: 4,
        counter: 3,
        instructions: menu,
        material: [menu, menu, menu],
        milestones: [
          {
            name: "Plan",
            description: "",
            assignment: "Marketing Assignment 2",
            assignmentId: 2,
            courseId: 4,
            course: "Marketing",
            status: Status.ongoing,
            id: 1,
            prio: Prio.p0,
            // deadline: new Date(2023,10,1),
            kind: Kind.plan,
            tasks:[],
          },
          {
            name: "Submit",
            description: "",
            assignment: "Marketing Assignment 2",
            assignmentId: 2,
            courseId: 4,
            course: "Marketing",
            status: Status.ongoing,
            id: 2,
            prio: Prio.p0,
            deadline: new Date(2023,0,12),
            kind: Kind.submit,
            tasks:[],
          },
        ],
      }
    ], 
  ])
}

export const initialCourses: Map<number, ICourse> = new Map([
  [1, Math],
  [2, Metaphysics],
  [3, IntroToPhilosophy],
  [4, Marketing]
  ])