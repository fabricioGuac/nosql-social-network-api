// Imports the User and Thought models
const {User,Thought} = require('../models');

// Exports an object with methods to perform the CRUD operations in the Thought model
module.exports = {
    // Function to get all the thoughts
    async thoughtGetter(req, res){
        try {
            // Searches for all thoughts
            const thoughts = await Thought.find();

            // If there are no thoughts notifies the user
            if(thoughts.length === 0){
                res.status(400).json({message:'No thougths yet'})
                return;
            }
            // Returns the thoughts
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json({message:`Error reading thoughts from the database ${err}`});
        }
    },
    // Function to get one thought by id
    async idThoughtGetter(req, res){
        try {
            // Searches for the thought with the desired id
            const thought = await Thought.findById(req.params.id);
            // If no thought is found notifies the user
            if(!thought){
                res.status(400).json({message:'No thought under that id'});
                return;
            }
            // Returns the thought
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json({message:`Error reading thought from the database ${err}`});
        }
    },
    // Function to create a new thought
    async thoughtPoster(req, res){
        try {
            // Searches for an user under the userId
            const user = await User.findById(req.body.userId);
            
            // If no user is found notifies the user
            if(!user){
                res.status(400).json({message:'No user under that id'});
                return;
            }

            // Creates a new thought with the contents of the request body that match the schema
            const newThought =  await Thought.create(req.body);

            // Updates the user thoughts array by adding the id of the new thought, uses runValidator to maintain data integrity
            await User.findByIdAndUpdate(req.body.userId,{$addToSet:{thoughts:newThought._id}},{runValidators:true});

            // Returns the new thought
            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json({message:`Error creating new thought ${err}`});
        }
    },
    // Function to edit the thoughts
    async thoughtUpdater(req, res){
        try {
            // Searches for the thought with the desired id and updates it with the request body, runs the validators to ensure data integrity and returns the updated document
            const edThought = await Thought.findByIdAndUpdate(req.params.id, {$set:req.body}, {runValidators:true, new:true});

            // If no thought is found notifies the user
            if(!edThought){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            // Returns the edited thought
            res.status(200).json(edThought);
        } catch (err) {
            res.status(500).json({message:`Error editing thought ${err}`})
        }
    },
    // Function to delete documents 
    async thoughtDeleter(req, res){
        try {
            // Searches for the thought with the desired id and deletes it
            const exThought = await Thought.findByIdAndDelete(req.params.id);

            // If no thought is found notifies the user
            if(!exThought){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            // Returns the deleted thought
            res.status(200).json(exThought);
        } catch (err) {
            res.status(500).json({message:`Error deleting thought ${err}`});
        }
    },
    // Function to add reactions
    async addReaction(req, res){
        try {
            //Searches for the thought with the desired id and adds to the reactions the request body, runs the validators to ensure data integrity and returns the updated document
            const reaction = await Thought.findByIdAndUpdate(req.params.id, {$addToSet:{reactions:req.body}}, {runValidators:true, new:true});

            // If no thought is found notifies the user
            if(!reaction){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            // Returns the thought including the new reaction in the reactions array
            res.status(200).json(reaction);
        } catch (err) {
            res.status(500).json({message:`Error adding reaction ${err}`})
        }
    },
    // Fucntion to delete reactions
    async delReaction(req, res){
        try {
            //Searches for the thought with the desired id and removes the reaction that matches the reaction id, runs the validators to ensure data integrity and returns the updated document
            const exReaction = await Thought.findByIdAndUpdate(req.params.id, {$pull:{reactions:{reactionId:req.params.reactionId}}}, {runValidators:true, new:true});

            // If no thought is found notifies the user
            if(!exReaction){
                res.status(400).json({message:'No thought under that id'});
                return;
            }

            // Returns the thought excluding the target reaction from the reactions array
            res.status(200).json(exReaction);
        } catch (err) {
            res.status(500).json({message:`Error removing reaction ${err}`})
        }
    }
}