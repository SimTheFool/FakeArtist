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
            scale : 200,
            offsetY : 20,
            brightness: 130,
            contrast: 300,
            lightboxX: 50,
            lightboxY: 55,
            lightboxColor: "#aaeebc",
            lightboxMaxScale: 2.6
        },
        "2": 
        {
            src : "background2.jpg",
            scale : 120,
            offsetY : 0,
            brightness: 100,
            contrast: 150,
            lightboxX: 110,
            lightboxY: 80,
            lightboxColor: "#ffadaa",
            lightboxMaxScale: 1.6
        },
        "3":
        {
            src : "background3.jpg",
            scale : 115,
            offsetY : 0,
            brightness: 80,
            contrast: 200,
            lightboxX: 10,
            lightboxY: 10,
            lightboxColor: "#99a1ee",
            lightboxMaxScale: 1.9
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