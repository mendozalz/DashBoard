import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces/task.interface";
import { devtools } from "zustand/middleware";


interface TaskState{
    task: Record<string, Task>
    draggingId?: string;

    getTaskStatus:(status: TaskStatus) => Task[]
    setDragginTask:(taskId: string) => void;
    removeDraggingTaskId:()=> void
    changeTaskStatus:(taskId:string, status: TaskStatus)=>void

}

const storeAPI: StateCreator<TaskState> = (set, get) => ({
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
        const task = get().task[taskId];
        task.status = status;
        set((state)=>(
            {
                task:{
                    ...state.task,
                    [taskId]: task
                }
            }
        ))
    }
})

export const useTaskStore = create<TaskState>()(
    devtools(storeAPI)
)