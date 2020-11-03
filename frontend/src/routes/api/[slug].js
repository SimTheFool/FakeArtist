const fakeDB =
{
    "backgrounds":
    {
        "0": 
        {
            src : "background0.jpg",
            scale : 125,
            offsetY : 0,
            brightness: 75,
            contrast: 250,
            lightboxX: 55,
            lightboxY: 100,
            lightboxColor: "#ffedbc",
            lightboxMaxScale: 1.6
        },
        "1": 
        {
            src : "background1.jpg",
            scale : 100,
            offsetY : 0,
            brightness: 50,
            contrast: 150,
            lightboxX: 50,
            lightboxY: 100,
            lightboxColor: "#971513",
            lightboxMaxScale: 1.5
        },
        "2": 
        {
            src : "background2.jpg",
            scale : 100,
            offsetY : 0,
            brightness: 50,
            contrast: 200,
            lightboxX: 125,
            lightboxY: 75,
            lightboxColor: "#678510",
            lightboxMaxScale: 1.6
        },
        "3":
        {
            src : "background3.jpg",
            scale : 100,
            offsetY : 0,
            brightness: 75,
            contrast: 150,
            lightboxX: 105,
            lightboxY: 10,
            lightboxColor: "#7d7d33",
            lightboxMaxScale: 1.3
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