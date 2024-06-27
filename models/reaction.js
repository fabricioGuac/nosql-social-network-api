const {Schema, Types} = require('mongoose');

const reactionSchema =  new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId,
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
    }
},
{
    toJSON:{
        getters:true,
    },
    id:false,
})

reactionSchema.methods.fotmatDate = function(){
    return this.createdAt.toLocaleDateString();
}

module.exports = reactionSchema;