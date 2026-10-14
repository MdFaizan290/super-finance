
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const page = Math.max(
            1,
            parseInt(req.query.page, 10) || 1
        );

        const response = await axios.get(
            "https://api.marketaux.com/v1/news/all",
            {
                params: {
                    api_token: process.env.MARKETAUX_API_TOKEN,
                    countries: "in",
                    language: "en",
                    filter_entities: true,
                    must_have_entities: true,
                    limit: 3,
                    page,
                },
                timeout: 100000,
            }
        );

        res.json({
            articles: response.data.data || [],
            page,
            totalPages: response.data.meta?.found
                ? Math.ceil(response.data.meta.found / 3)
                : null,
        });
    } catch (error) {
        console.error(
            "Marketaux error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Unable to fetch stock news",
        });
    }
});

module.exports = router;







// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// router.get("/", async (req, res) => {
//     try {
//         const response = await axios.get(
//             "https://api.marketaux.com/v1/news/all",
//             {
//                 params: {
//                     api_token: process.env.MARKETAUX_API_TOKEN,
//                     countries: "in",
//                     language: "en",
//                     // filter_entities: true,
//                     // must_have_entities: true,
//                     limit: 10,
//                 },
//                 timeout: 50000,
//             }
//         );

//         res.json(response.data.data ?? []);
//     } catch (error) {
//         console.error("Stock news API error:", error.response?.data ?? error.message);
//         res.status(502).json({ message: "Unable to fetch stock news right now.", });
//     }
// });

// module.exports = router;
