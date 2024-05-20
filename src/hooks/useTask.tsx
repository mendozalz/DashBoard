import { useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores/task/task.store";
import { TaskStatus } from "../interfaces/task.interface";

interface Options {
  valueStatus: TaskStatus;
}

const useTask = ({ valueStatus }: Options) => {
  const IsDragging = useTaskStore((state) => !!state.draggingId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [isOver, setIsOver] = useState(false);

  const handleNewTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingresa el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un titulo a tu tarea";
        }
      },
    });
    if (!isConfirmed) return;
    addTask(value, valueStatus);
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    onTaskDrop(valueStatus);
  };
  return {
    IsDragging,
    isOver,
    handleNewTask,
    dragOver,
    dragLeave,
    drop,
  };
};

export default useTask;
