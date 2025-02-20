import { checkPassword, encrypt } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';
import User from '../users/user.model.js'

export const register = async (req, res) => {
    try {
        let data = req.body;
        let user = new User(data);
        user.password = await encrypt(user.password);
        await user.save();
        return res.send({ message: `Registered successfully, can be logged with username: ${user.username}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const login = async (req, res) => {
    try {
        let { userLoggin, password } = req.body;
        let user = await User.findOne(
            {
                $or: [
                    { email: userLoggin },
                    { username: userLoggin }
                ]
            }
        );

        if (user && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }

            let token = await generateJwt(loggedUser);

            return res.send(
                { message: `Welcome ${user.name}`, loggedUser, token });
        }
        return res.status(400).send({ message: 'Wrong email or password' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}