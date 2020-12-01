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
    service: service,
    send: service.send,
    stop: service.stop,
    context: machine.config.context,
  };
}

export const createMachineSubscriber = (machine, stateValue) => {
    return (cbk) => {
        let subscription = machine.service.subscribe(state => {
            if(state.value == stateValue && state.changed)
            {
                cbk(state, state.context);
            }
        });
        return subscription.unsubscribe;
    };
};