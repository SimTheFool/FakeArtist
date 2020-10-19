export const appendStyle = function(node, datasCbk){
    let originalCssText = node.style.cssText;
    let datas = datasCbk();

    function stringify(datas)
    {
        let style = "";
        for(let entry in datas)
        {
            style += `${entry} : ${datas[entry]};`
        }

        return style;
    }

    node.style.cssText = originalCssText + stringify(datas);

    return {
        update(newDatasCbk)
        {
            let newDatas = newDatasCbk();
            node.style.cssText = originalCssText + stringify(newDatas);
        },
        destroy()
        {
            node.style.cssText = originalCssText;
        }
    };
};