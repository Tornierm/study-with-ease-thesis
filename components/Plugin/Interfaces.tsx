import { StaticImageData } from "next/image";

export interface ICourse {
    name: string;
    id:number;
    assignments:Map<number, IAssignment>;
}
    
export interface IAssignment extends IAssignmentData{
    id: number;
    courseName: string;
    courseId: number;
    milestones: IMilestone[];
    counter: number;
    finished?: boolean;
} 

export interface IAssignmentData {
    start: Date;
    deadline: Date;
    name:string;
    instructions: StaticImageData;
    material: StaticImageData[];
    // instructions: string;
    // material: string;
} 

export interface IChartData {
    id: string;
    value: number;
}
    
export interface IMilestone extends IMilestoneData {
    status: Status;
    assignment: string;
    course: string;
    id: number;
    prio: Prio;
    completionDate?: Date;
    kind?: Kind;
    tasks: ITask[];
}

export interface IMilestoneData {
    name: string;
    description: string;
    assignmentId: number;
    courseId: number;
    deadline?: Date;
    estimate?: number;
}

export interface ITask {
    status: Status;
    name: string;
    description?: string;
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
    