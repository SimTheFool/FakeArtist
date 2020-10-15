import { writable, readable, derived } from 'svelte/store';

export const id = writable(0);
export const backgroundsRegistry = writable(null);
export const backgroundDatas = derived([id, backgroundsRegistry], ([id, registry]) => registry ? registry[id] : null);