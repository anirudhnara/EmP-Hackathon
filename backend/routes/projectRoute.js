import express from 'express';
import { User } from '../models/user.js';
import Fuse from 'fuse.js';

const router = express.Router();
router.get("/test2", async (req, res) => {
    return res.send("Hello World");
});

router.post("/create_post", async (req, res) => {
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
        newPost.volunteers = [];
        newPost.donors = [];
        newPost.numVolunteers = 0;
        newPost.numDonors = 0;

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


router.post("/volunteer", async (req, res) => {
    try {
        if (!req.body.post_title) {
            return res.status(400).send({ message: "post_title is required" });
        } 

        let users = await User.find()
        let posts = []
        users.forEach(user => {
            posts = posts.concat(user.posts)
        });

        let post = posts.find(post => post.title === req.body.post_title)
        if (!post) {
            return res.status(400).send({ message: "Post not found" });
        }

        if (post.volunteers.includes(req.user.username)) {
            return res.status(400).send({ message: "User is already volunteering for this post" });
        }

        let user = await User.findOne({ username: post.username })
        user.set({ posts: user.posts.map(p => p.title === req.body.post_title ? { ...p, volunteers: p.volunteers.concat(req.user.username) } : p) })
        user.set({ posts: user.posts.map(p => p.title === req.body.post_title ? { ...p, numVolunteers: p.numVolunteers + 1 } : p) })
        await user.save()

        return res.status(200).send("Volunteered successfully")

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

router.post("/donate", async (req, res) => {
    try {
        if (!req.body.post_title) {
            return res.status(400).send({ message: "post_title is required" });
        }

        let users = await User.find()
        let posts = []
        users.forEach(user => {
            posts = posts.concat(user.posts)
        });

        let post = posts.find(post => post.title === req.body.post_title)
        if (!post) {
            return res.status(400).send({ message: "Post not found" });
        }

        if (post.donors.includes(req.user.username)) {
            return res.status(400).send({ message: "User is already volunteering for this post" });
        }

        let user = await User.findOne({ username: post.username })
        user.set({ posts: user.posts.map(p => p.title === req.body.post_title ? { ...p, donors: p.donors.concat(req.user.username) } : p) })
        user.set({ posts: user.posts.map(p => p.title === req.body.post_title ? { ...p, numDonors: p.numDonors + 1 } : p) })
        await user.save()

        return res.status(200).send("Donated successfully")

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

router.get("/get_user_posts", async (req, res) => {
    try {
        var userId = req.user._id
        if (req.body.user_id != undefined) {
            userId = req.body.user_id
        }

        const user = await User.findById(userId)
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
        let posts = []
        users.forEach(user => {
            posts = posts.concat(user.posts)
        });

        let post = posts.find(post => post.title === req.body.post_title)
        if (!post) {
            return res.status(400).send({ message: "Post not found" });
        }

        let user = await User.findOne({ username: post.username })
        user.set({ posts: user.posts.filter(p => p.title !== req.body.post_title) })
        await user.save()

        return res.status(200).send("Post deleted successfully")

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

router.post("/get_post", async (req, res) => {
    try {
        if (!req.body.post_title) {
            return res.status(400).send({ message: "post_title is required" });
        }

        let users = await User.find()
        let posts = []
        users.forEach(user => {
            posts = posts.concat(user.posts)
        });

        let post = posts.find(post => post.title === req.body.post_title)
        if (!post) {
            return res.status(400).send({ message: "Post not found" });
        }

        return res.status(200).send(post)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;