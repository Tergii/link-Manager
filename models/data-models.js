const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    linkManager: {
        sectionsNumber: {
            type: Number,

        },
        links: {
            type: Object,

        },

        config: {
            type: Array,

        },
        sectionTitles: {
            type: Array,

        }
    },
    loginSys: {
        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }

});


module.exports = mongoose.model('links', linkSchema);