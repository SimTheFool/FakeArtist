import { useMachine } from 'utils/useMachine.js';
import { createMachineSubscriber } from 'utils/createMachineSubscriber.js';
import { animSettings } from "settings";

export const styleMachine = useMachine({
    id: "styleMachine",
    context:
    {
        stepDuration: animSettings.stepDuration,
        key: null,
        nextKey: null
    },
    initial: "idle",
    states:
    {
        idle:
        {   
            on:
            {
                STYLE_CHANGE:
                {
                    target: "vanish",
                    cond: "areKeysDifferent"
                }
            }
        },
        vanish:
        {
            invoke:
            {
                src: "vanish",
                onDone: { target : "appear"}
            }
        },
        appear:
        {
            invoke:
            {
                src: "appear",
                onDone: { target : "idle"}
            },
            on:
            {
                STYLE_CHANGE:
                {
                    target: "vanish",
                    cond: "areKeysDifferent"
                }
            }
        }
    }
},
{
    services:
    {
        vanish: (ctx, event) => {
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(resolve, ctx.stepDuration);
            });
        },
        appear: (ctx, event) => {
            ctx.key = ctx.nextKey;
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(resolve, ctx.stepDuration);
            });
        }
    },
    guards:
    {
        areKeysDifferent: (ctx, event) => {
            return ctx.nextKey != ctx.key;
        }
    }
});

export const changeStyle = (key) => {
    styleMachine.context.nextKey = key;
    styleMachine.send("STYLE_CHANGE");
};

export const subscribeOnVanish = createMachineSubscriber(styleMachine, "vanish");
export const subscribeOnAppear = createMachineSubscriber(styleMachine, "appear");
export const subscribeOnIdle = createMachineSubscriber(styleMachine, "idle");