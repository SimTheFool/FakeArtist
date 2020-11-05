import { writable, derived } from 'svelte/store';

export const urlKey = writable("");

export const backgroundsRegistry = writable(null);

export const backgroundDatas = derived([urlKey, backgroundsRegistry], ([$urlKey, $backgroundsRegistry]) => {
    let datas = $backgroundsRegistry ? $backgroundsRegistry[$urlKey] : null;
    return datas;
});