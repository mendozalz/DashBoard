import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalOutline,
} from "react-icons/io5";
import { Task } from "../../interfaces/task.interface";
import SingleTask from "./SingleTask";
import classNames from "classnames";
import { useTaskStore } from "../../stores/task/task.store";
import { useState } from "react";

interface Props {
  title: string;
  tasks: Task[];
  value: "abierto" | "en-progreso" | "hecho";
}

export const JiraTasks = ({ title, value, tasks }: Props) => {
  const IsDragging = useTaskStore((state) => !!state.draggingId);
  const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus);
  const draggTaskId = useTaskStore((state) => state.draggingId);
  const [isOver, setIsOver] = useState(false);

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
    changeTaskStatus(draggTaskId!, value);
  };

  return (
    <div
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={drop}
      className={classNames(
        "!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-green-500 border-dashed": IsDragging && isOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button>
          <IoEllipsisHorizontalOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
