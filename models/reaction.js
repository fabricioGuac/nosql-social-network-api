// Imports the schema class and the Types object from mongoose
const {Schema, Types} = require('mongoose');
// Imports dayjs
const dayjs = require('dayjs');

// Creates a new instance of the mongoose schema with fields for reactionId, reactionBody, username and  createdAt
const reactionSchema =  new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody:{
        type:String,
        max_lenght:280,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
        get: function (createdAt) {
            return dayjs(createdAt).format('MMM D[,] YYYY [at] h:mm A');
        }
    }
},
{
    toJSON:{
        getters:true,
    },
    id:false,
})

// Exports the reaction schema 
module.exports = reactionSchema;