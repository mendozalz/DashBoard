import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores/task/task.store";

export const JiraPage = () => {
  const pendienteStatus = useTaskStore((state) =>
    state.getTaskStatus("abierto")
  );
  const progresoStatus = useTaskStore((state) =>
    state.getTaskStatus("en-progreso")
  );
  const hechoStatus = useTaskStore((state) => state.getTaskStatus("hecho"));

  console.log(pendienteStatus, progresoStatus, hechoStatus);

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" value="abierto" tasks={pendienteStatus} />

        <JiraTasks
          title="Avanzando"
          value="en-progreso"
          tasks={progresoStatus}
        />

        <JiraTasks title="Terminadas" value="hecho" tasks={hechoStatus} />
      </div>
    </>
  );
};
