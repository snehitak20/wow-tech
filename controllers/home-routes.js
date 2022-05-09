const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// Get all posts for the homepage
router.get('/', async ( req, res) => {
    try { 
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('allpostsadmin', { posts, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET SINGLE POST 
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {id: req.params.id},
            include: [
                User,
                {
                model: Comment,
                include: [User],
                },
            ],
        });
  
        if (postData) {
            const post = postData.get({ plain: true });
            
            console.log(post);
            res.render('singlepost', { post, loggedIn: req.session.loggedIn});
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login and sign up routes
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});
  
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
  
    res.render('signup');
});
  
module.exports = router;