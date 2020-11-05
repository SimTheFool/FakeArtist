import { readable } from "svelte/store";
import { interpret } from "xstate";

export const useMachine = (machine, options) => {
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
    stop: service.stop
  };
}