const User = require('/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Enregistrer un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const newuser = new user ({firstName, lastName, email, password });
        await newuser.save() ;
        res.status(201).json({ message: 'utilisateur créé avec succès' }) ;
    }
    catch (error){
        res.status(400).json({message: error.message});
    }
};

// Connecter un utilisateur
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Mot de passe incorrect.' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
