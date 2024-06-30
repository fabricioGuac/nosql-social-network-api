// Imports the schema class and the model object from mongoose
const {Schema, model} = require('mongoose');

// Creates a new instance of the mongoose schema with fields for username, email, thoughts, and friends
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[ /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
    },
    thoughts:[
        {
            type:Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:'user',
        },
    ],},
    {
        toJSON:{
            getters:true,
        },
        id:false,
    }
)

// Creates a virtual field 'friendCount' to calculate the number of friends a user has
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

// Creates a model using the userSchema
const User = model('user', userSchema);

// Exports the User model
module.exports = User;