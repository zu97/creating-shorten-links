const express = require('express');
const { nanoid } = require('nanoid');
const Link = require("../models/Link");
const router = express.Router();

router.get('/:shortUrl', async (req, res, next) => {
    try {
        const shortUrl = req.params.shortUrl;
        const linkData = await Link.findOne({shortUrl});
        if (!linkData) {
            return res.status(404).send('Page not found');
        }

        res.status(301).redirect(linkData.originalUrl);
    } catch (e) {
        next(e);
    }
});

router.post('/links', async (req, res, next) => {
    try {
        const originalUrl = req.body.url;
        if (!originalUrl) {
            return res.status(400).send({message : 'The URL field is a required field'});
        }

        let shortUrl;
        while (true) {
            shortUrl = nanoid(6);

            const checkExists = await Link.find({shortUrl});
            if (!checkExists.length) {
                break;
            }
        }

        const link = new Link({
            shortUrl,
            originalUrl
        });

        await link.save();
        res.send(link);
    } catch (e) {
        next(e);
    }
});

module.exports = router;


