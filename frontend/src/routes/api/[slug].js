const fakeDB =
{
    "backgrounds":
    {
        "": 
        {
            src : "background0.jpg",
            scale : 125,
            offsetY : 0,
            brightness: 75,
            contrast: 250,
            color: "#ffedbc",
            lightbox:
            {
                lightboxX: 55,
                lightboxY: 100,
                lightboxColor: "#ffedbc",
                lightboxMaxScale: 1.6
            }
        },
        "drawings": 
        {
            src : "background1.jpg",
            scale : 100,
            offsetY : 0,
            brightness: 50,
            contrast: 150,
            color: "#995a5a",
            lightbox:
            {
                lightboxX: 50,
                lightboxY: 100,
                lightboxColor: "#995a5a",
                lightboxMaxScale: 1.5
            }
        },
        "about": 
        {
            src : "background2.jpg",
            scale : 100,
            offsetY : 0,
            brightness: 50,
            contrast: 200,
            color: "#678510",
            lightbox:
            {
                lightboxX: 125,
                lightboxY: 75,
                lightboxColor: "#678510",
                lightboxMaxScale: 1.6
            }
        },
        "contact":
        {
            src : "background3.jpg",
            scale : 100,
            offsetY : 0,
            brightness: 75,
            contrast: 150,
            color: "#5e83ab",
            lightbox:
            {
                lightboxX: 105,
                lightboxY: 10,
                lightboxColor: "#5e83ab",
                lightboxMaxScale: 1.3
            }
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