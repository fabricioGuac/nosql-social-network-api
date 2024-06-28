const {User,Thought} = require('../models');

module.exports = {
    async thoughtGetter(req, res){
        try {
            const thoughts = await Thought.find();
            if(thoughts.length === 0){
                res.status(400).json({message:'No thougths yet'})
                return;
            }
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json({message:`Error reading thoughts from the database ${err}`});
        }
    },
    async idThoughtGetter(req, res){
        try {
            const thought = await Thought.findById(req.params.id);
            if(!thought){
                res.status(400).json({message:'No thought under that id'});
                return;
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json({message:`Error reading thought from the database ${err}`});
        }
    },
    async thoughtPoster(req, res){
        try {
            const newThought =  await Thought.create(req.body);

            await User.findByIdAndUpdate(req.body.userId,{$addToSet:{thoughts:newThought._id}},{runValidators:true, new:true});

            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json({message:`Error creating new thought ${err}`});
        }
    },
    async thoughtUpdater(req, res){
        try {
            const edThought = await Thought.findByIdAndUpdate(req.params.id, {$set:req.body}, {runValidators:true, new:true});

            if(!edThought){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            res.status(200).json(edThought);
        } catch (err) {
            res.status(500).json({message:`Error editing thought ${err}`})
        }
    },
    async thoughtDeleter(req, res){
        try {
            const exThought = await Thought.findByIdAndDelete(req.params.id);

            if(!exThought){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            res.status(200).json(exThought);
        } catch (err) {
            res.status(500).json({message:`Error deleting thought ${err}`});
        }
    },
    async addReaction(req, res){
        try {
            const reaction = await Thought.findByIdAndUpdate(req.params.id, {$addToSet:{reactions:req.body}}, {runValidators:true, new:true});

            if(!reaction){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            res.status(200).json(reaction);
        } catch (err) {
            res.status(500).json({message:`Error adding reaction ${err}`})
        }
    },
    
    async delReaction(req, res){
        try {
            const exReaction = await Thought.findByIdAndUpdate(req.params.id, {$pull:{reactions:req.params.reactionId}}, {runValidators:true, new:true});

            if(!exReaction){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            res.status(200).json(exReaction);
        } catch (err) {
            res.status(500).json({message:`Error removing reaction ${err}`})
        }
    }
}