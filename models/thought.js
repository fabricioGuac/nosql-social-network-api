// Imports the schema class and the model object from mongoose
const {Schema, model} = require('mongoose');
// Imports the reaction schema
const reactions = require('./reaction');
// Imports dayjs
const dayjs = require('dayjs');

// Creates a new instance of the mongoose schema with fields for thoughtText, createdAt, username and reactions 
const thoughtSchema = new Schema({
    thoughtText:{
        type:String,
        min_length:1,
        max_length:280,
        required:true,
    },
    createdAt:{
        type:Date,
        default:  Date.now,
        get: function (createdAt) {
            return dayjs(createdAt).format('MMM D[,] YYYY [at] h:mm A');
        }
    },
    username:{
        type:String,
        required:true,
    },
    reactions:[reactions],
},
{
    toJSON:{
        getters:true,
    },
    id:false,
}
)

// Creates a virtual field 'reactionCount' to calculate the number of reactions a thought has
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

// Creates a model using the thoughtSchema
const Thoughts = model('thougts', thoughtSchema);

// Exports the Thought model
module.exports = Thoughts;