import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces/task.interface";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid"
import { immer } from "zustand/middleware/immer";


interface TaskState{
    task: Record<string, Task>
    draggingId?: string;

    getTaskStatus:(status: TaskStatus) => Task[]
    addTask:(title:string, status: TaskStatus)=> void
    setDragginTask:(taskId: string) => void;
    removeDraggingTaskId:()=> void
    changeTaskStatus:(taskId:string, status: TaskStatus)=>void
    onTaskDrop:(status:TaskStatus)=> void

}

const storeAPI: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
    task:{
        "ABC-1": {id: "ABC-1", title: "Tarea 1", status:"abierto"},
        "ABC-2": {id: "ABC-2", title: "Tarea 2", status:"en-progreso"},
        "ABC-3": {id: "ABC-3", title: "Tarea 3", status:"abierto"},
        "ABC-4": {id: "ABC-4", title: "Tarea 4", status:"abierto"}
    },

    getTaskStatus:(status: TaskStatus) => {
        const task = get().task;
        return Object.values(get().task).filter(task=>task.status===status)
    },

    setDragginTask:(taskId:string)=>{
        set({draggingId:taskId})
    },
    removeDraggingTaskId:()=>{
        set({draggingId: undefined})
    },

    changeTaskStatus:(taskId:string, status: TaskStatus)=>{
    
        set(state=>{
            state.task[taskId] = {
                ...state.task[taskId],
                status
            }
        })
    },

    onTaskDrop:(status:TaskStatus)=> {
        const taskId = get().draggingId;
        if(!taskId) return;

        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    },

    addTask:(title:string, status: TaskStatus)=> {
        const newTask = {id: uuidv4(), title, status};

         set(state=>{
            state.task[newTask.id] = newTask
         })
    }
})

export const useTaskStore = create<TaskState>()(
    devtools(immer(persist(storeAPI,{
        name:"task-store"
    })))
)