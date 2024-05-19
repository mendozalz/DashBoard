import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { fireStorage } from "../../storages/firebase.store";

interface Person {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstname: (value: string) => void;
  setLastname: (value: string) => void;
}

const storeAPI: StateCreator<Person & Actions, [["zustand/devtools", never]]> = (
    (set) => ({
        firstName: "",
        lastName: "",
    
        setFirstname: (value: string) => set(({ firstName: value }), false, "Nombre"),
        setLastname: (value: string) => set(({ lastName: value }), false, "Apellido"),
      })
)



export const usePersonStore = create<Person & Actions>()(
  devtools(
    persist(storeAPI, {
      name:"personStore",
      /* storage: fireStorage  */
  })
  )
);
