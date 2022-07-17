import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
  removeCycleAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer, CyclesState } from "../reducers/cycles/reducer";
import { LocalStorageManager } from "../utils/local-storage-manager";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  removeCycle: (cycleId: string) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

const cyclesStateInitialValues: CyclesState = {
  cycles: [],
  activeCycleId: null,
};

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    cyclesStateInitialValues,
    () => {
      const cyclesStateStorage =
        LocalStorageManager.getItem<CyclesState>("cycles-state");
      return cyclesStateStorage || cyclesStateInitialValues;
    },
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  function removeCycle(cycleId: string) {
    dispatch(removeCycleAction(cycleId));
  }

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    LocalStorageManager.setItem("cycles-state", cyclesState);
  }, [cyclesState]);

  return (
    <CyclesContext.Provider
      value={{
        amountSecondsPassed,
        activeCycle,
        activeCycleId,
        cycles,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        removeCycle,
      }}>
      {children}
    </CyclesContext.Provider>
  );
}
