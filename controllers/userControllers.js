const {User,Thought} = require('../models');

module.exports = {
    async userGetter(req, res){
        try {
            const users = await User.find();
            if(users.length === 0){
                res.status(400).json({message:"No users registered"});
                return;
            }
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({message:`Error reading users from the database ${err}`});
        }
    },
    async idUserGetter(req, res){
        try {
            const user = await User.findById(req.params.id);
            if(!user){
                res.status(400).json({message:"No users registered under that id"});
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message:`Error reading user from the database ${err}`});
        }
    },
    async userPoster(req, res){
        try {
            const newUser = await User.create(req.body);
            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json({message:`Error creeating new user ${err}`});
        }
    },
    async userUpdater(req,res){
        try {
            // Run validators and new, run validators ensure it sticks to the validation rules and new ensures that it returns the updated version 
            const userEd = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {runValidators:true, new:true});
            if(!userEd){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }
            res.status(200).json(userEd);
        } catch (err) {
            res.status(500).json({message:`Error editing the user ${err}`});
        }
    },
    async userDeleter(req, res){
        try {
            const exUser = await User.findByIdAndDelete(req.params.id)
            if(!exUser){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }

            await Thought.deleteMany({_id: {$in:exUser.thoughts} }); 

            res.status(200).json(exUser);
        } catch (err) {
            res.status(500).json({message:`Error deleting the user ${err}`});
        }
    },
    async addFriend(req,res){
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$addToSet:{friends:req.params.friendId}}, {runValidators:true, new:true});

            if(!user){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message: `Error adding frien ${err}`})
        }
    },
    async unfriend(req, res){
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{$pull: {friends:req.params.friendId}}, {runValidators:true, new:true});

            if(!user){
                res.status(400).json({message:'No user registered under that id'});
                return;
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({message:`Error deleting friend ${err}`});
        }
    }
}