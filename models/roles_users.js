

const mongoose = require('mongoose');
const uuid = require('uuid');


const RoleUsersSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    role_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, { collection: 'roles_users' });

module.exports = mongoose.model('RolesUsers', RoleUsersSchema);