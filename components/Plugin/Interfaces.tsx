export interface ICourse {
    name: String;
    id:number;
    assignments:IAssignment[];
}
    
export interface IAssignment{
    start: Date;
    deadline: Date;
    name:string;
    id:number;
    // instructions: string;
    // material: string;
    className: string;
    classId: number;
    milestones:IMilestone[];
    //Calculateprios(): (assignment) => assignmentWithPrio;
} 
    
export interface IMilestone {
    status: Status;
    name: string;
    assignment: string;
    assignmentId: number;
    class: string;
    classId: number;
    id: number;
    prio: Prio;
    completionDate?: Date;
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
    
export enum Prio {
	"p0","p1","p2","p3","p4","p5","p6","p7","p8","p9"
}
    