const field: IField = {
    id: 'field_id',
    name: 'field_name',
    perimetersHistory: [],
    workOrders: [],
};


const worcOrder:IWorkOrder =
    {
        field:field,
        tasks:[{
            id: 'task_1',
            status:"toDo",
            from: new Date(),
            to: new Date(),
            type: {id:"1",category:"пахота",name:"any name"},
            comments: [{text:"july",author:{}}],
            materialConsumptions:[
                {
                    material: {id:"22",type:"посевмат",name:"material name"},
                    price: 50,
                    plannedAmount: 200,
                    actualAmount:555,
                },
                {
                    material: {id:"20",type:"топливо",name:"material name"},
                    price: 45,
                    plannedAmount: 550,
                    actualAmount:300,
                }
            ]
        },
            {
                id: 'task_2',
                status:"inWork",
                from: new Date(),
                to: new Date(),
                type: {id:"3",category:"посев",name:"any name"},
                comments: [{text:"winter is coming)",author:{}}],
                materialConsumptions:[
                    {
                        material: {id:"22",type:"посевмат",name:"material name"},
                        price: 50,
                        plannedAmount: 200,
                        actualAmount:555,
                    },
                    {
                        material: {id:"20",type:"топливо",name:"material name"},
                        price: 45,
                        plannedAmount: 550,
                        actualAmount:300,
                    }
                ]
            }
        ]
    }

const fieldManager = new FieldManager();



function calculateWorkOrderMaterials(workOrder: IWorkOrder, from: Date, to: Date, taskStatus: TaskStatus): number {
    const doneTasks = workOrder.tasks.filter((x) => x.status == taskStatus);
    let total = 0;
    for (const task of doneTasks) {
        const startTaskDate = task.from;
        const fieldPerimeter = fieldManager.getFieldPerimeter(
            workOrder.field,
            startTaskDate,
        );
        for (const material of task.materialConsumptions) {
            total += material.price * material.actualAmount * fieldPerimeter.square;
        }
    }
    return total;
}

function calculateFieldMaterials(field: IField, from: Date, to: Date, taskStatus: TaskStatus): number {
    let totalPrice = 0;
    for (const workOrder of field.workOrders) {
        totalPrice += calculateWorkOrderMaterials(workOrder, from, to, taskStatus);
    }

    return totalPrice;
}
