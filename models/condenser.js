const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const urlSchema = mongoose.Schema(
    {
        URL : {
            required : true,
            type : String
        },
        condensedURL : {
            required: true,
            type : String,
            unique : true
        }
    }
);

const URL = mongoose.model("url", urlSchema, "url");

const saveCondensedURL = (condensedURL, actualURL, cb) => {
    let url = new URL(
        {
            "URL" : actualURL,
            "condensedURL" : condensedURL
        }
    );

    url.save()
        .then()
        .catch();
}

const getActualURL = (condensedURL, cb) => {
    URL.findOne({condensedURL : condensedURL})
        .lean()
        .exec()
        .then(data => cb(false, data["URL"]))
        .catch(err => cb(err, ""));
}

const createACondensedURL = () => {
    return nanoid(5);
}

module.exports = {
    saveCondensedURL : saveCondensedURL,
    getActualURL : getActualURL,
    createACondensedURL : createACondensedURL
}