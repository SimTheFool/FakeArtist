const fakeDB =
{
    "backgrounds":
    {
        "": 
        {
            src : "background0.jpg",
            scale : 1.25,
            offsetY : 0,
            brightness: 75,
            contrast: 250,
            color: "#ffedbc",
            lightbox:
            {
                lightboxX: 55,
                lightboxY: 105,
                lightboxColor: "#ffedbc",
                lightboxMaxScale: 1.65
            }
        },
        "drawings": 
        {
            src : "background1.jpg",
            scale : 1,
            offsetY : 0,
            brightness: 50,
            contrast: 150,
            color: "#995a5a",
            lightbox:
            {
                lightboxX: 50,
                lightboxY: 105,
                lightboxColor: "#eb3f3f",
                lightboxMaxScale: 1.8
            }
        },
        "about": 
        {
            src : "background2.jpg",
            scale : 1,
            offsetY : 0,
            brightness: 50,
            contrast: 200,
            color: "#678510",
            lightbox:
            {
                lightboxX: 125,
                lightboxY: 75,
                lightboxColor: "#a0cd18",
                lightboxMaxScale: 1.6
            }
        },
        "contact":
        {
            src : "background3.jpg",
            scale : 1,
            offsetY : 0,
            brightness: 75,
            contrast: 150,
            color: "#5e83ab",
            lightbox:
            {
                lightboxX: 110,
                lightboxY: 10,
                lightboxColor: "#5c85d6",
                lightboxMaxScale: 1.6
            }
        },
        "404":
        {
            src : "background3.jpg",
            scale : 1,
            offsetY : 0,
            brightness: 75,
            contrast: 150,
            color: "#5e83ab",
            lightbox:
            {
                lightboxX: 110,
                lightboxY: 10,
                lightboxColor: "#5c85d6",
                lightboxMaxScale: 1.6
            }
        }
        
    },
    "about":
    [
        {
            "title": "Disclaimer",
            "content" : "This website is a false artist portfolio I've made for personnal technical tests. I'm not the designer of the paintings and drawings used, and I chose them randomly from all the images I have been downloading for years, so I don't know their respective artists. This website won't be indexed by any search engine, but if you're the author of one of the graphic art used here and you want me to delete it, feel free to tell me."
        },{
            "title": "Ecce Gratum",
            "content" : "tum, orci eget luctus elementum, mi ex gravida nisi, sed faucibus tellus lorem vitae lorem. Ut bibendum nisi arcu, eget tincidunt mi imperdiet id. Proin nec massa dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tristique nec arcu eu venenatis. Pellentesque commodo elit eu justo cursus, nec commodo dui porta. Sed dignissim urna sed felis molestie, a aliquam augue aliquet. Praesent facilisis sed velit eu rhoncus. Maecenas lacinia cursus nulla, ut vulputate felis porttitor eu. Sed porta risus nec pretium fringilla. Phasellus dignissim euismod ligula ac aliquam. Maecenas placerat tempus lectus et bibendum. Vivamus sagittis id erat non porta. Mauris faucibus magna eget tempor euismod."
        },{
            "title": "Ecce Gratum",
            "content" : "tum, orci eget luctus elementum, mi ex gravida nisi, sed faucibus tellus lorem vitae lorem. Ut bibendum nisi arcu, eget tincidunt mi imperdiet id. Proin nec massa dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tristique nec arcu eu venenatis. Pellentesque commodo elit eu justo cursus, nec commodo dui porta. Sed dignissim urna sed felis molestie, a aliquam augue aliquet. Praesent facilisis sed velit eu rhoncus. Maecenas lacinia cursus nulla, ut vulputate felis porttitor eu. Sed porta risus nec pretium fringilla. Phasellus dignissim euismod ligula ac aliquam. Maecenas placerat tempus lectus et bibendum. Vivamus sagittis id erat non porta. Mauris faucibus magna eget tempor euismod."
        }
    ],
    "drawings":
    [
        {
            src : "drawing1.jpg"
        },
        {
            src : "drawing2.jpg"
        },
        {
            src : "drawing3.jpg"
        },
        {
            src : "drawing4.jpg"
        },
        {
            src : "drawing5.jpg"
        },
        {
            src : "drawing6.jpg"
        },
        {
            src : "drawing1.jpg"
        },
        {
            src : "drawing2.jpg"
        },
        {
            src : "drawing3.jpg"
        },
        {
            src : "drawing4.jpg"
        },
        {
            src : "drawing5.jpg"
        },
        {
            src : "drawing6.jpg"
        },
        {
            src : "background0.jpg"
        },
        {
            src : "background1.jpg"
        },
        {
            src : "background2.jpg"
        }
    ]
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