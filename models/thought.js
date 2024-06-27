const {Schema, model} = require('mongoose');
const reactions = require('./reaction');

const thoughtSchema = new Schema({
    thougtText:{
        type:String,
        min_length:1,
        max_length:280,
        required:true,
    },
    createdAt:{
        type:Date,
        default:  Date.now,
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

thoughtSchema.methods.fotmatDate = function(){
    return this.createdAt.toLocaleDateString();
}

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.lenght;
})

const Thoughts = model('thougts', thoughtSchema);

module.exports = Thoughts;