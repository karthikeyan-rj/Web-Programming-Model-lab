const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) return res.status(400).send("All fields required");
    if (password !== confirmPassword) return res.status(400).send("Passwords dont match");
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).send("User already exists");

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send("Registered");
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) res.send("Success");
    else res.status(400).send("Invalid Credentials");
};
