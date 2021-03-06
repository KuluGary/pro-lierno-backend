const express = require("express");
const router = express.Router();
let Location = require("../models/location");
router.get("/locations", async (req, res) => {
    try {
        if (req.session.userId) {
            const locations = await Location.find({});
            res.status(200).json({ payload: locations });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.get("/location/:id", async (req, res) => {
    try {
        if (req.session.userId) {
            const location = await Location.findById(req.params.id);
            res.status(200).json({ payload: location });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
router.get("/campaignmap/:id", async (req, res) => {
    try {
        if (req.session.userId) {
            const location = await Location.find({ campaign: req.params.id });
            res.status(200).json({ payload: location });
        }
        else {
            res.status(401).json({ message });
        }
    }
    catch (e) {
        res.status(400).json({ message: "Error: " + e });
    }
});
module.exports = router;
//# sourceMappingURL=location.routes.js.map