import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../interfaces/task.interface";
import { useTaskStore } from "../../stores/task/task.store";
import classNames from "classnames";

interface Props {
  task: Task;
}

const SingleTask = ({ task }: Props) => {
  const IsDragging = useTaskStore((state) => !!state.draggingId);

  const setDragginTask = useTaskStore((state) => state.setDragginTask);
  const removeDraggingTaskId = useTaskStore(
    (state) => state.removeDraggingTaskId
  );
  return (
    <div
      draggable
      onDragStart={() => setDragginTask(task.id)}
      onDragEnd={() => removeDraggingTaskId()}
      className="mt-5  flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};

export default SingleTask;
