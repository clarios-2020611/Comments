import { objectIdValid } from '../../middlewares/db.validators.js';
import { checkPassword, encrypt } from '../../utils/encrypt.js';
import User from './user.model.js';

export const getAll = async (req, res) => {
    try {
        let { limit = 15, skip = 0 } = req.query;
        let users = await User.find().limit(limit).skip(skip).where({ status: true });
        if (!users) return res.status(404).send({ success: false, message: 'Users not found' });
        return res.send({ success: true, message: 'Users found', users });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const getOne = async (req, res) => {
    try {
        let { id } = req.body;
        objectIdValid(id);
        let user = await User.findOne({ _id: id, status: true });
        if (!user) return res.status(404).send({ success: false, message: 'User not found' });
        return res.send({ success: true, message: `User found ${user.username}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const updateUser = async (req, res) => {
    try {
        let {  id,  passwordConfirm, password, ...data  } = req.body;
        objectIdValid(id);
        console.log(data);
        let user = await User.findOne({ _id: id, status: true });
        let confirm = await checkPassword(user.password, passwordConfirm);
        if (!confirm) return res.status(400).send({ success: true, message: 'Password does not match. Unable to update user data.' });
        if (password == ! null) return res.status(401).send({ success: false, message: 'Password cannot be modified using this endpoint' });
        await User.findOneAndUpdate({ _id: id, status: true }, data, { new: true });
        if (!user) return res.status(404).send({ success: false, message: 'User not found' });
        return res.send({ success: true, message: `User updated seccussfully ${user.username}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const updatePassword = async (req, res) => {
    try {
        let { id, passwordConfirm, password } = req.body;
        objectIdValid(id);
        let user = await User.findOne({ _id: id, status: true });
        if (!user || !await checkPassword(user.password, passwordConfirm)) return res.status(400).send({ success: false, message: 'Password does not match or user not found. Unable to update user password.' });
        User.findOneAndUpdate({ _id: id, status: true }, encrypt(password), { new: true });
        return res.send({ success: true, message: `User updated seccussfully ${user.username}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const deletedUser = async (req, res) => {
    try {
        let { id } = req.body;
        objectIdValid(id);
        let user = await User.findOneAndUpdate({ _id: id, status: true }, { status: false }, { new: true });
        if (!user) return res.status(404).send({ success: true, message: 'User not found' });
        return res.send({ success: true, message: `User deleted successfully ${user.name}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}