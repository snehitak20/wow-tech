const { Post } = require('../models');

const postdata = 
[
    {
        postTitle: "First post!",
        postContent: "Yes, this finally works :)",
        userId: 1
    },
    {
        postTitle: "Test test test",
        postContent: "Is this even on?",
        userId: 2
    },
    {
        postTitle: "The hills are alive...",
        postContent: "With the sound of music.",
        userId: 3
    }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost; 