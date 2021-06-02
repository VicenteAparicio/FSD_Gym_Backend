const router = require('express').Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');


// NEW USER REGISTER
router.post('/newuser', async (req, res) => {
    try {
        let user = req.body;
        res.json(await userController.newUser(user));
    } catch (err) {
        return res.status(500).json({
            mesaje: err.message
        });
    }
});

// LOGIN 
router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body;
        let jwt = await userController.login(email,password);
        const token = jwt.token;
        const user = jwt.user;
        res.json({token,user})
    } catch (err) {
        return res.status(500).json({
            mesaje: err.message
        });
    }
});

// MODIFY USER
router.put('/modify', auth, async (req, res) => {
    try {
        let body = req.body;
        res.json(await userController.modifyUser(body));
    } catch (err) {
        return res.status(500).json({
            mesaje: err.message
        });
    }
});

// MODIFY USER BY ADMIN
router.put('/modifyadmin', admin, async (req, res) => {
    try {
        let body = req.body;
        res.json(await userController.modifyUser(body));
    } catch (err) {
        return res.status(500).json({
            mesaje: err.message
        });
    }
});

// DELETE USER
router.delete('/delete', auth, async (req, res) => {
    try {
        const body = req.body;
        res.json(await userController.delete(body));
    } catch (err) {
        return res.status(500).json({
            mesaje: err.message
        });
    }
});

// FIND ALL USERS
router.get('/allusers', admin, async (req, res) => {
    try {
        res.json(await userController.allUsers());
    } catch (err) {
        return res.status(500).json({
            mesaje: err.message
        });
    }
});

module.exports = router;