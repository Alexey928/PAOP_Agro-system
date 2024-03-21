interface IPositionPoint {
    x: number;
    y: number;
}
interface IFiledPerimeter {
    validFrom: Date;
    positions: IPositionPoint[];
    square: number;
}
interface IField {
    id: string;
    name: string;
    perimetersHistory: IFiledPerimeter[];
    workOrders: IWorkOrder[];
}
class FieldManager {
    getFieldPerimeter(field: IField, date: Date): IFiledPerimeter {
        throw new Error('Not implemented');
    }
}

// переименовать
interface IWorkOrder {
    field: IField;
    tasks: ITask[];
}

interface ITask {
    id: string;
    from: Date;
    to: Date;
    type: ITaskType;
    status: TaskStatus; // (make as foreignId to TaskStatuses table)
    // workOrder: IWorkOrder;
    materialConsumptions: IMaterialComsumption[];
    comments: IComment[];
}

interface ITaskType {
    id: string;
    category: TaskCategory;
    name: string; // 'кукуруза', 'овес'
}

interface IMaterialComsumption {
    material: IMaterial; // (make as foreignId to MaterialTypes table)
    plannedAmount: number;
    actualAmount?: number;
    price: number;
}

interface IMaterial {
    id: string;
    type: MaterialCategory; // 'посевмат'
    name: string; // 'кукуруза', 'овес'
}

interface IComment {
    text: string;
    author: IUser;
}

interface IUser {}

type TaskStatus = 'toDo' | 'inWork' | 'done' | 'rejected';

type TaskCategory = 'пахота' | 'посев';

type MaterialCategory = 'топливо' | 'посевмат' | 'химия';
