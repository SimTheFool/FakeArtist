import { readable } from "svelte/store";
import { createMachine, interpret } from "xstate";

export const useMachine = (machineStates, machineOptions, options) => {
  
  const machine = createMachine(machineStates, machineOptions);

  const service = interpret(machine, options);

  const store = readable(service.initialState, set => {
    service.onTransition(state => {
      set(state);
    });
  });

  service.start();

  return {
    state: store,
    send: service.send,
    stop: service.stop,
    ...machine.config.context,
  };
}