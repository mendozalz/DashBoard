import { createJSONStorage, StateStorage } from "zustand/middleware";

const url =
  "https://zustand-sessionstorage-default-rtdb.firebaseio.com/zustand";
const fireBase: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${url}/${name}.json`).then((result) =>
        result.json()
      );

      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${url}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((result) => result.json());

    return;
  },
  removeItem: function (name: string): void {
    console.log("removeItem", name);
  },
};

export const fireStorage = createJSONStorage(() => fireBase);
