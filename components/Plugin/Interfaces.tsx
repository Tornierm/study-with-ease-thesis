export interface ICourse {
    name: string;
    id:number;
    assignments:Map<number, IAssignment>;
}
    
export interface IAssignment extends IAssignmentData{
    id:number;
    // instructions: string;
    // material: string;
    courseName: string;
    courseId: number;
    milestones:IMilestone[];
    counter: number;
} 

export interface IAssignmentData {
    start: Date;
    deadline: Date;
    name:string;
    // instructions: string;
    // material: string;
} 
    
export interface IMilestone extends IMilestoneData {
    status: Status;
    assignment: string;
    estimate?: number;
    course: string;
    id: number;
    prio: Prio;
    completionDate?: Date;
    kind?: Kind;
}

export interface IMilestoneData {
    name: string;
    description: string;
    assignmentId: number;
    courseId: number;
    deadline?: Date;
}

export interface ITask {
    status: Status;
    name: string ;
    id: number;
    completiondate?: Date;
}

export enum Status {
	"finished",
    "ongoing"
}

export enum Kind {
	"submit",
    "plan"
}
    
export enum Prio {
	"p0","p1","p2","p3","p4","p5","p6","p7","p8","p9","p10"
}
    