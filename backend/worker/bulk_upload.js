const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const User = require('../models/user_model'); 
const uploadsDir = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,uploadsDir); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); 
    }
    
});

const upload = multer({ storage });

const processFile = async (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // const users = data.map(row => ({
        //     username: row.username,
        //     email: row.email,
        //     password: row.password,
        //     status: row.status
        // }));

        await User.insertMany(users);
        return { status: 'success', message: 'Users uploaded successfully' };
    } catch (error) {
        throw new Error('Error uploading users: ' + error.message);
    }
};

module.exports = {
    upload,
    processFile
};
