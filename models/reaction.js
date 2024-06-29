const {Schema, Types} = require('mongoose');
const dayjs = require('dayjs');

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

module.exports = reactionSchema;