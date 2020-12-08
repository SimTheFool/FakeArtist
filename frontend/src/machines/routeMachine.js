import { useMachine, createMachineSubscriber } from 'machines/utils.js';
import { animSettings } from "settings";
import { changeStyle, styleMachine } from "machines/styleMachine";

export const routeMachine = useMachine({
    id: "routeMachine",
    context:
    {
        stepDuration: animSettings.stepDuration,
        url: null,
        nextUrl: null,
        styleMachine: styleMachine
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
            changeStyle(ctx.nextUrl);
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(resolve, ctx.stepDuration);
            });
        },
        enter: (ctx, event) => {
            ctx.url = ctx.nextUrl;
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(resolve, ctx.stepDuration);
            });
        }
    },
    guards:
    {
        areRoutesDifferent: (ctx, event) => {
            return ctx.url != ctx.nextUrl;
        }
    }
});

export const changeRoute = (url) => {
    routeMachine.context.nextUrl = url;
    routeMachine.send("ROUTE_CHANGE");
    
};

export const subscribeOnExit = createMachineSubscriber(routeMachine, "exit");
export const subscribeOnEnter = createMachineSubscriber(routeMachine, "enter");
export const subscribeOnIdle = createMachineSubscriber(routeMachine, "idle");