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
    url.save(
        (error) => {
            if(error){
                console.error("Error while saving the URL details into dB \n", error);
                cb(error, null);
            }
            else {
                console.log("Successfully saved a URL\n");
                cb(false, condensedURL);
            }
        }
    );
}

const getActualURL = (condensedURL, cb) => {
    URL.findOne({condensedURL : condensedURL}).lean().exec(
        (error, data) => {
            if(error){
                console.error("Error while retrieving the URL from dB \n", error);
                cb(error, null);
            }
            else if( data === null ) {
                cb(false, "");
            }
            else {
                cb(false, data['URL']);
            }
        }
    );
}

const createACondensedURL = () => {
    return nanoid(5);
}


module.exports = {
    saveCondensedURL : saveCondensedURL,
    getActualURL : getActualURL,
    createACondensedURL : createACondensedURL
}