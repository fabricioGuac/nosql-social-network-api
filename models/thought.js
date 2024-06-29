const {Schema, model} = require('mongoose');
const reactions = require('./reaction');
const dayjs = require('dayjs');


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

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thoughts = model('thougts', thoughtSchema);

module.exports = Thoughts;