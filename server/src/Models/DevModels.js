const {Schema, model } = require('mongoose');
const DevSchema = new Schema ({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
    },likes:[{
        type: Schema.Types.ObjectID,
        ref: 'Dev',
    }],
    dislikes:[{
        type: Schema.Types.ObjectID,
        ref: 'Dev',
    }],
    },{
        timestamps:true,
});

module.exports = model('Dev', DevSchema)