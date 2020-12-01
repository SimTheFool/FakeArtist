import { useMachine, createMachineSubscriber } from 'machines/utils.js';
import { animSettings } from "settings";

export const drawingMachine = useMachine({
    id: "drawingMachine",
    context:
    {
        stepDuration: animSettings.expandDrawingDuration,
        id: null,
        nextId: null,
    },
    initial: "idle",
    states:
    {
        idle:
        {   
            entry: (ctx) => {
                if(ctx.nextId && ctx.nextId != ctx.id)
                {
                    drawingMachine.send("EXPAND");
                }
            },
            on: { EXPAND: "expand", SHRINK: "shrink"}
        },
        expand:
        {
            invoke:
            {
                src: "expand",
                onDone: { target : "idle"}
            },
            on: { EXPAND: "shrink", SHRINK: "shrink" }
        },
        shrink:
        {
            invoke:
            {
                src: "shrink",
                onDone: { target : "idle"}
            }
        }
    }
},
{
    services:
    {
        expand: (ctx, event) => {
            ctx.id = ctx.nextId;
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(resolve, ctx.stepDuration);
            });
        },
        shrink: (ctx, event) => {
            return new Promise((resolve, reject) => {
                ctx.currentProcess = setTimeout(() => {
                    ctx.id = null;
                    resolve();
                }, ctx.stepDuration);
            });
        }
    }
});

export const clickDrawing = (id) => {
    
    let currentId = drawingMachine.context.id;

    if(id == currentId)
    {
        drawingMachine.context.nextId = null;
        drawingMachine.send("SHRINK");    
    }
    else
    {
        drawingMachine.context.nextId = id;
        drawingMachine.send("EXPAND");
    }
};

export const subscribeOnExpand = createMachineSubscriber(drawingMachine, "expand");
export const subscribeOnShrink = createMachineSubscriber(drawingMachine, "shrink");
export const subscribeOnIdle = createMachineSubscriber(drawingMachine, "idle");