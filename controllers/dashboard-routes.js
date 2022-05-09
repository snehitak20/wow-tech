const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// ALL POST DASHBOARD
router.get('/', withAuth, async (req, res) => {
    try {
        // Here use the findAll method for the posts--> will store the results of db query within postData
        const postData = await Post.findAll({
            where: {
                "userId": req.session.userId
            },
            include: [User]
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);

        res.render('allposts', {
            layout: 'dashboard', 
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

// After clicking the 'NEW POST' button 
router.get('/new', withAuth, (req, res) => {
    res.render('newpost', {
        layout: 'dashboard', 
    });
});

// Click on post itself
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });
            console.log(post);

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;