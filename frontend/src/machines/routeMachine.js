import { useMachine } from 'utils/useMachine.js';
import { createMachineSubscriber } from 'utils/createMachineSubscriber.js';
import { animSettings } from "settings";
import { changeStyle } from "machines/styleMachine";

const routeMachine = useMachine({
    id: "routeMachine",
    context:
    {
        stepDuration: animSettings.stepDuration,
        url: null
    },
    initial: "idle",
    states:
    {
        idle:
        {   
            on:
            {
                ROUTE_CHANGE:
                {
                    target: "exit",
                    cond: "areRoutesDifferent"
                }
            }
        },
        exit:
        {
            invoke:
            {
                src: "exit",
                onDone: { target : "enter"}
            }
        },
        enter:
        {
            invoke:
            {
                src: "enter",
                onDone: { target : "idle"}
            },
            on:
            {
                ROUTE_CHANGE:
                {
                    target: "exit",
                    cond: "areRoutesDifferent"
                }
            }
        }
    }
},
{
    services:
    {
        exit: (ctx, event) => {
            ctx.url = event.url;
            changeStyle(ctx.url);
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(resolve, ctx.stepDuration);
            });
        },
        enter: (ctx, event) => {
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(resolve, ctx.stepDuration);
            });
        }
    },
    guards:
    {
        areRoutesDifferent: (ctx, event) => {
            return event.url != ctx.url;
        }
    }
});

export const changeRoute = (url) => {
    routeMachine.send("ROUTE_CHANGE", { url: url});
};

export const subscribeOnExit = createMachineSubscriber(routeMachine, "exit");
export const subscribeOnEnter = createMachineSubscriber(routeMachine, "enter");
export const subscribeOnIdle = createMachineSubscriber(routeMachine, "idle");