const fakeDB =
{
    "backgrounds":
    {
        "0": 
        {
            img : "background0.jpg",
            scale : 125,
            offsetY : 0
        },
        "1": 
        {
            img : "background1.jpg",
            scale : 200,
            offsetY : 20
        },
        "2": 
        {
            img : "background2.jpg",
            scale : 120,
            offsetY : 0
        },
        "3":
        {
            img : "background3.jpg",
            scale : 115,
            offsetY : 0
        }
    }
};

export function get(req, res, next)
{
    const { slug } = req.params;
    const datas = fakeDB[slug];

    if (datas !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(datas));
	} else {
		next();
	}
}