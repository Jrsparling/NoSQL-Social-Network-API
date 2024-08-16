const { Schema, model } = require('mongoose');

const userSchema = new Schema(

    {
        username: {
    type:String,
    unique: true,
    required: true,
    trim: true,
    },
    email: {
        type:String,
        unique: true,
        required: true,
        trim: true,
        match:[]
        // two elements 
        // what el do i need to match regex
        // what message displays with bad email
    },
    // thoughts
        // 
    // friends
    },
    {

    }
)
// username
// String
// Unique
// Required
// Trimmed

// email
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)