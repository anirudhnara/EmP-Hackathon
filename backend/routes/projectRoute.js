import express from 'express';
import { User } from '../models/user.js';
import Fuse from 'fuse.js';

const router = express.Router();
router.get("/test2", async (req, res) => {
    return res.send("Hello World");
});

router.post("/create_post", async (req, res) => {
    console.log(req.body.post)
    try {
        if (
            !req.body.post.title || !req.body.post.text || req.body.post.isVolunteer == undefined || req.body.post.isFundraiser == undefined
        ) {
            return res.status(400).send({
                message: 'Send all required fields: post, post.title, post.text, post.isVolunteer, post.isFundraiser'
            });
        }

        var newPost = req.body.post;
        newPost.username = req.user.username;


        const userId = req.user._id
        let user = await User.findById(userId)
        user.set({ posts: user.posts.concat(newPost) })
        await user.save()


        return res.status(201).send("Post created successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get("/get_user_posts", async (req, res) => {
    try {
        if (!req.body.user_id) {
            return res.status(400).send({ message: "user_id is required" });
        }
        const userId = req.body.user_id
        let user
        if (userId) {
            user = await User.findById(userId)
        }
        else {
            user = req.user
        }
        return res.status(200).send(user.posts)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/delete_post", async (req, res) => {
    try {
        if (!req.body.post_title) {
            return res.status(400).send({ message: "post_title is required" });
        }
        
        let users = await User.find()
        users.forEach(user => {
            posts = posts.co
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get("/get_all_posts", async (req, res) => {
    try {
        let users = await User.find()
        let posts = []
        users.forEach(user => {
            posts = posts.concat(user.posts)
        });

        // if the search query is sent filter posts
        if (req.body.search_query) {
            const options = {
                keys: ['title'],
                includeScore: true
            };
            const fuse = new Fuse(posts, options);
            const result = fuse.search(req.body.search_query);
            posts = result.map(({ item }) => item);
        }

        return res.status(200).send(posts)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});


export default router;