import { create } from 'zustand'

interface Bear{
  id: number,
  name: string
}

interface BearState{
    blackBears: number;
    polarBears: number;
    pandaBears: number;

    increaseBlackBears:(by:number) => void;
    increasePolarBears:(by:number) => void;
    increasePandaBeras:(by:number) => void;

    bears:Bear[];

    computed:{
      totalBears:number
    }

    doNothing:()=> void;
    agregarOso:()=>void;
    borrarOsos:()=>void
}

export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears:1,

  bears:[{id:1, name:'Oso #1'}],

  computed:{
    get totalBears(){
      return get().blackBears + get().pandaBears + get().polarBears + get().bears.length
    }
  },


  increaseBlackBears: (by:number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by:number) => set(state=> ({polarBears: state.polarBears + by})),
  increasePandaBeras: (by:number) => set(state=> ({pandaBears: state.pandaBears + by})),
  doNothing:() =>set(state=>({bears: [...state.bears]})),
  agregarOso:()=>set(state=>({bears: [...state.bears, {id: state.bears.length+1, name:`Oso #${state.bears.length+1}`}]})),
  borrarOsos:()=>set({bears:[]})
  
}))
