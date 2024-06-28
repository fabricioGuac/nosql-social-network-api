const {User,Thought} = require('../models');

module.exports = {
    async userGetter(req, res){
        try {
            const users = await User.find();
            if(!users){
                res.status(400).json({message:"No users registered"});
            }
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({message:`Error reading users from the database ${err}`});
        }
    },
    async idUserGetter(req, res){
        try {
            const user = await User.findById(req.params.userId);
            if(!user){
                res.status(400).json({message:"No users registered under that id"});
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
            const userEd = await User.findByIdAndUpdate(req.params.userId, {$set:req.body}, {runValidators:true, new:true});
            if(!userEd){
                res.status(400).json({message:'No user registered under that id'});
            }
            res.status(200).json(userEd);
        } catch (err) {
            res.status(500).json({message:`Error editing the user ${err}`});
        }
    },
    async userDeleter(req, res){
        try {
            const exUser = await User.findByIdAndDelete(req.params.userId)
            if(!exUser){
                res.status(400).json({message:'No user registered under that id'});
            }

            await Thought.deleteMany({_id: {$in:exUser.thoughts} }); 

            res.status(200).json({message:`${exUser} deleted successfully`});
        } catch (err) {
            res.status(500).json({message:`Error deleting the user ${err}`});
        }
    }
}