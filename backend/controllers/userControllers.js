const User = require('../models/user_model');
const { userValidator,deleteValidator } = require('../validators/body_validators');

exports.get_users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            no_of_users:users.length,
            status: "success",
            data: users,
            message: "Users fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching users",
            error
        });
    }
};

exports.update_user = async (req, res) => {
    try {
        const { username, email, password, status } = req.body;

        const { error, value } = userValidator({ username, email, password, status });
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message
            });
        }

        const user = await User.findOneAndUpdate(
            { username: req.params.username }, 
            value,  
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: user,
            message: "User updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error updating user",
            error: error.message
        });
    }
};


exports.delete_user = async (req, res) => {
    try {
        const username = req.params.username;
        const { error, value } = deleteValidator({ username });
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message
            });
        }
        const user = await User.findOneAndDelete({ value });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting user",
            error
        });
    }
};
