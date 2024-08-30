const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thought.findOne({_id: req.params.thoughtId })
            .select('-__v')

            if(!singleThought) {
                return res.status(404).json({message: 'No thought found with that ID!'});
            }
            res.json(singleThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);

            if (!thoughtData) {
                res.status(404).json({ message: 'Thought not created'})
            }
            
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id}},
                { runValidators: true, new: true },
            );

            if (!userData) {
                return res.status(404).json({ message: 'No user found with that ID'})
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: {...req.body} },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({message: 'No thought found with that ID!'});
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const removeThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!removeThought) {
                return res.status(404).json({message: 'No thought exists with that ID!'});
            }

            res.status(200).json({ message: 'Thought deleted'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body} },
                { runValidators: true, new: true }
            );

            if (!thoughtReaction) {
                return res.status(404).json({message: 'No thought found with that ID'});
            }
            res.json(thoughtReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.body.reactionId}}},
                { runValidators: true, new: true } 
            );

            if(!deleteReaction) {
                return res.status(404).json({message: 'No thought found with that ID!'});
            }
            res.json({message: 'reaction deleted'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
};