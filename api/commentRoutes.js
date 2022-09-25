const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res)=>{
    try {
        const commentData = await Comment.findAll({
            include:[
                User, Post
            ]
        });

        res.json(commentData);
    }
    catch (err) {
        res.status(500).json({ msg: "an error occured", err });
    }
});

router.get('/:id', async (req, res)=>{
    try {
        const commentData = await Comment.findByPk(req.params.id, 
        {
            include:[
                User, Post
            ]
        });

        res.json(commentData);
    }
    catch (err) {
        res.status(500).json({ msg: "an error occured", err });
    }
});

router.post('/', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.create({
            body: req.body.body,
            user_id: req.session.user.id,
            post_id: req.body.postId
        });

        res.json(commentData);
    }
    catch (err) {
        res.status(500).json({ msg: "an error occured", err });
    }
});

router.put('/:id', withAuth, async (req,res) => {
    try {
        const updateComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.json(updateComment);
    }
    catch (err) {
        res.status(500).json({ msg: "an error occured", err });
    }
});

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(deleteComment);
    }
    catch (err) {
        res.status(500).json({ msg: "an error occured", err });
    }
});


module.exports = router;