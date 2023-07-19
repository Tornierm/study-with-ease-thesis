import {IAssignment, ICourse, IMilestone, Prio, Status} from "./Interfaces"

export const DummyMilestones: IMilestone[] = [
    {
        name: "dummy",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 1,
        prio: Prio.p0,
        deadline: new Date()
    },
    {
        name: "dummy2",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 2,
        prio: Prio.p1,
    },
    {
        name: "dummy3",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 3,
        prio: Prio.p2,
    },
    {
        name: "dummy4",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 4,
        prio: Prio.p3,
    },
    {
        name: "dummy5",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 5,
        prio: Prio.p4,
    },
    {
        name: "dummy6",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 6,
        prio: Prio.p5,
    },
    {
        name: "dummy7",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 7,
        prio: Prio.p6,
    },
    {
        name: "dummy8",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 8,
        prio: Prio.p7,
    },
    {
        name: "dummy9",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 9,
        prio: Prio.p8,
    },
    {
        name: "dummy10",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 10,
        prio: Prio.p9,
    },
]

export const DummyMilestones2: IMilestone[] = [
    {
        name: "dummy",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 1,
        prio: Prio.p0,
        deadline: new Date()
    },
    {
        name: "dummy2",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 2,
        prio: Prio.p1,
    },
    {
        name: "dummy3",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 3,
        prio: Prio.p2,
    },
    {
        name: "dummy4",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 4,
        prio: Prio.p3,
    },
    {
        name: "dummy5",
        assignment: "dummyAssignment",
        assignmentId: 1,
        classId: 1,
        class: "dummyClass",
        status: Status.ongoing,
        id: 5,
        prio: Prio.p4,
    }
]

export const DummyMilestones3: IMilestone[] = [
    
]

export const dummyAssignments: IAssignment[] = [
    {
        start: new Date(),
        deadline: new Date(),
        name: "dummy",
        id: 1,
        className: "dummyClass",
        classId: 1,
        milestones: DummyMilestones,
    },
    {
        start: new Date(),
        deadline: new Date(),
        name: "dummy2",
        id: 2,
        className: "dummyClass",
        classId: 1,
        milestones: DummyMilestones,
    }
]

export const dummyAssignments2: IAssignment[] = [
    {
        start: new Date(),
        deadline: new Date(),
        name: "dummy",
        id: 1,
        className: "dummyClass",
        classId: 1,
        milestones: DummyMilestones2,
    }
]

export const dummyAssignments3: IAssignment[] = [
    {
        start: new Date(),
        deadline: new Date(),
        name: "dummy",
        id: 1,
        className: "dummyClass",
        classId: 1,
        milestones: DummyMilestones3,
    }
]

export const dummycourses: ICourse[] = [
    {
        name: "DummyCourse",
        id:1,
        assignments: dummyAssignments
    }
]

export const dummycourses2: ICourse[] = [
    {
        name: "DummyCourse",
        id:1,
        assignments: dummyAssignments2
    }
]

export const dummycourses3: ICourse[] = [
    {
        name: "DummyCourse",
        id:1,
        assignments: dummyAssignments2
    }
]