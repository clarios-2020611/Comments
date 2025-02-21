import { objectIdValid } from '../../middlewares/db.validators.js';
import Comments from './comments.model.js';

export const createPost = async (req, res) => {
    try {
        let data = req.body;
        let comment = new Comments(data);
        await comment.save();
        return res.send({ success: false, message: 'Post create successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const getAll = async (req, res) => {
    try {
        let { limit = 15, skip = 0 } = req.query;
        let posts = await Comments.find().limit(limit).skip(skip);
        if (!posts) return res.status(404).send({ success: false, message: 'No posts yet! Be the first to share something.' });
        return res.send({ success: true, message: `Found ${posts.length} posts`, posts });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const getOne = async (req, res) => {
    try {
        let { id } = req.body;
        objectIdValid(id);
        let post = Comments.finOne({ _id: id, status: true });
        if (!post) return res.status(404).send({ success: false, message: `Oops! We couldn't find that post.` });
        return res.send({ success: true, message: 'Post found', post });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const updatePost = async (req, res) => {
    try {
        let { id, data } = req.body;
        objectIdValid(id);
        let post = Comments.findOneAndUpdate({ _id: id, status: true }, data, { new: true });
        if (!post) return res.status(404).send({ success: false, message: `Oops! We couldn't find that post.` });
        return res.send({ success: true, message: 'Post updated successfully', post });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const deletedPost = async (req, res) => {
    try {
        let { id } = req.body;
        objectIdValid(id);
        let status = false;
        let post = Comments.findOneAndUpdate({ _id: id, status: true }, status, { new: true });
        if (!post) return res.status(404).send({ success: false, message: `Oops! We couldn't find that post.` });
        return res.send({ success: true, message: 'Post deleted successfully', post });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const addComment = async (req, res) => {
    try {
        let { user } = req;
        if (!user) return res.status(401).send({ success: false, message: 'Unauthorized' });
        let { id, bodyComment, img } = req.body;
        objectIdValid(id);
        let post = Comments.findOneAndUpdate({ _id: id, status: true }, { $push: { commet: { _id: user.uid, bodyComment: bodyComment, img: img } } }, { new: true, runValidators: true });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}