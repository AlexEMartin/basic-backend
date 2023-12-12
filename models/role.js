
const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'The role is required']
    }
});


module.exports = model('Role', roleSchema);