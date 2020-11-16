const express = require('express');
const router = express.Router();
const condenser = require("../models/condenser");


router.post("/",
    (req, res) => {
        // generating and saving the condensed URL
        condenser.saveCondensedURL(condenser.createACondensedURL(), req.body.URL,
            (error, data) => {
                if(error){
                    res.send(error);
                }
                else {
                    res.send(data);
                }
            }
        );
    }
);

router.get("/:id", 
    (req, res) => {
        condenser.getActualURL(req.params.id, 
            (error, data) => {
                if(error){
                    res.send(error);
                }
                else {
                    res.redirect(data);
                }
            }
        );
    }
);

module.exports = router;
