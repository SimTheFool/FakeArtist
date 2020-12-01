let mutationObserver = null;

export const portal = (node, identifier) => {
    let originalContainer = node;
    let lastIdentifier = identifier;
    let container = document.querySelector(identifier);
    let children = new Set(originalContainer.children);

    function teleport()
    {
        children.forEach((child) => {
            container.appendChild(child);
        });
    };

    function update(identifier)
    {
        lastIdentifier = identifier;
        container = document.querySelector(identifier);

        children.forEach((child) => {
            if(child.parentNode) return;
            children.delete(child);
        });

        for(let child of originalContainer.children)
        {
            children.add(child);
        }

        teleport();
    };

    teleport();

    if("MutationObserver" in window)
    {
        if(!mutationObserver)
        {
            mutationObserver = new MutationObserver((mutations) => {
                for(var mutation of mutations)
                {
                    if (mutation.type == 'childList')
                    {
                        update(lastIdentifier);
                    }
                }
            });
        }

        mutationObserver.observe(node, { childList: true });
    }

    return {
        update: update,
        destroy: () => {
            children.forEach((child) => {
                container.removeChild(child);
            });

            children.clear();
        }
    };
};