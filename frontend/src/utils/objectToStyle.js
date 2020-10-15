export const objectToStyle = (obj) => {
    let style = "";
    for(let entry in obj)
    {
        style += `${entry} : ${obj[entry]};`
    }
    return style;
}