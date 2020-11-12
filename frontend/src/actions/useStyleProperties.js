export const useStyleProperties = (node, getStyleProperties) => {
    let previousProperties = null;
    let properties = getStyleProperties();

    const setStyleProperties = () => {
        for(let entry in properties)
        {
            node.style.setProperty(`${entry}`, properties[entry]);
        }
        previousProperties = properties;
    };

    const unsetStyleProperties = () => {
        for(let entry in previousProperties)
        {
            node.style.removeProperty(`${entry}`);
        }
    };

    setStyleProperties();    

    return {
        update: (getUpdatedStyleProperties) => {
            properties = getUpdatedStyleProperties();

            unsetStyleProperties();
            setStyleProperties();
        },
        destroy: () => {
            unsetStyleProperties();
        }
    };
};