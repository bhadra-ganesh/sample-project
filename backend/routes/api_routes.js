const express = require('express');
const router = express.Router();
const crud_functions = require('../controllers/userControllers');
const { upload } = require('../worker/bulk_upload');
const { processFile } = require('../worker/bulk_upload');
const authenticateUser = require('../middlewares/Authentication');
const { login,create_user } = require('../controllers/authControllers');



router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const result = await processFile(filePath);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});
router.post('/login',login)
router.get('/list_users',authenticateUser,crud_functions.get_users);
router.post('/register',create_user);
router.put('/update/:username',authenticateUser, crud_functions.update_user);
router.delete('/delete/:username',authenticateUser, crud_functions.delete_user);

module.exports = router;
