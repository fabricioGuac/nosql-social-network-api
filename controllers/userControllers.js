// Imports the User and Thought models
const {User,Thought} = require('../models');

// Exports an object with methods to perform the CRUD operations in the User model
module.exports = {
    // Function to get all users
    async userGetter(req, res){
        try {
            // Searches for all users
            const users = await User.find();

            // If there are no users notifies the user
            if(users.length === 0){
                res.status(400).json({message:"No users registered"});
                return;
            }

            // Returns the users
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({message:`Error reading users from the database ${err}`});
        }
    },
    // Function to get an user by id
    async idUserGetter(req, res){
        try {
            // Seraches for an user with the desired id
            const user = await User.findById(req.params.id);

            // If no user is found notifies the user
            if(!user){
                res.status(400).json({message:"No users registered under that id"});
                return;
            }
            // Returns the user
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message:`Error reading user from the database ${err}`});
        }
    },
    // Function to create a new user
    async userPoster(req, res){
        try {
            // Creates an user with the information of the request body
            const newUser = await User.create(req.body);
            // Returns the new user
            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json({message:`Error creeating new user ${err}`});
        }
    },
    // Function to edit an user
    async userUpdater(req,res){
        try {
            // Searches for the user with the desired id and updates it with the request body, runs the validators to ensure data integrity and returns the updated document
            const userEd = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {runValidators:true, new:true});

            // If no user is found notifies the user
            if(!userEd){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }
            // Returns the edited user
            res.status(200).json(userEd);
        } catch (err) {
            res.status(500).json({message:`Error editing the user ${err}`});
        }
    },
    // Function to delete an user
    async userDeleter(req, res){
        try {
             // Searches for the user with the desired id and deletes it
            const exUser = await User.findByIdAndDelete(req.params.id)

            // If no user is found notifies the user
            if(!exUser){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }

            // Deletes the thoughts associated to the user
            await Thought.deleteMany({_id: {$in:exUser.thoughts} }); 

            // Returns the deleted user
            res.status(200).json(exUser);
        } catch (err) {
            res.status(500).json({message:`Error deleting the user ${err}`});
        }
    },
    // Function to add a friend
    async addFriend(req,res){
        try {
            //Searches for the user with the desired id and adds to the friendId to the friends array, runs the validators to ensure data integrity and returns the updated document
            const user = await User.findByIdAndUpdate(req.params.id, {$addToSet:{friends:req.params.friendId}}, {runValidators:true, new:true});

            // if no user is found notifies the user 
            if(!user){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }

            // Returns the user with the new friendId in the friends array
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message: `Error adding frien ${err}`})
        }
    },
    async unfriend(req, res){
        try {
            //Searches for the user with the desired id and removes from friends the friendId, runs the validators to ensure data integrity and returns the updated document
            const user = await User.findByIdAndUpdate(req.params.id,{$pull: {friends:req.params.friendId}}, {runValidators:true, new:true});

            // If no user is found notifies the user
            if(!user){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }

            // Returns the user excluding the target friendId from the friends array
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message:`Error deleting friend ${err}`});
        }
    }
}