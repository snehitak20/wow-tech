const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// To CREATE a post 
router.post('/', withAuth, async (req, res) => {
    const body = req.body; 
    console.log(body);

    try {
        const newPost = await Post.create({ ...body, userId: req.session.userId });
        console.log("Here is your new post: ", newPost);
        res.json(newPost);
    } catch (err) {
        console.log('This failed.', err);
        res.json(500).json(err); 
    }
});

// To UPDATE a post
router.put('/:id', withAuth, async (req, res) => {
    try{
        console.log('Here is the req.body', req.body);

        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end(); 
        } else {
            res.status(404).end();
        } 
    } catch (err) {
        res.status(500).json(err); 
    }
});

// To DELETE a post 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
  
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router;