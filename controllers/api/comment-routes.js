const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route
router.get('/', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.findAll({
            include: [User],
        });

        // To serialize the data
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log(comments);

        res.render('singlepost', {comments, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route
router.post('/', withAuth, async (req, res) => { 
    const body = req.body;

    try {
        const newComment = await Comment.create({
            ...body, 
            userId: req.session.userId,
        });

        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 