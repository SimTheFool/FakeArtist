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