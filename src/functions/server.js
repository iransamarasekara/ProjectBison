const express = require("express");
const serverless = require('serverless-http');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD} = require('./env.js');

const app = express();
const router = express.Router();

const port = 4000;

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://Bison:0123456789@cluster0.fwkif6z.mongodb.net/t-shirt-new");

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));

//API Routes
router.get("/", (req, res)=>{
    res.send("Express App is Running")
});

router.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
    description: { type: String },
    colors: { type: Object },
    image_logo: { type: String },
    avl_size: { type: Object },
    image_2: { type: String },
    image_3: { type: String },
    rating: { type: Number },
    reviewText: { type: Object },
    no_of_rators: { type: Number },
});

router.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        description: req.body.description,
        colors: req.body.colors,
        image_logo: req.body.image_logo,
        avl_size: req.body.avl_size,
        image_2: req.body.image_2,
        image_3: req.body.image_3,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
        no_of_rators: req.body.no_of_rators,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
});

router.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
});

router.post('/getrelatedproducts', async (req, res) => {
    let products = await Product.find({ category: req.body.category });
    let related_products = products.slice(-4).reverse();
    res.send(related_products);
});

router.post('/setavailablestate', async (req, res) => {
    let currentProduct = await Product.findOne({ id: req.body.itemId });
    currentProduct.available = req.body.available;
    await Product.findOneAndUpdate({ id: req.body.itemId }, { available: currentProduct.available });
    res.send("AvailableStateAdded");
});

router.post('/addreview', async (req, res) => {
    let currentProduct = await Product.findOne({ id: req.body.itemId });
    currentProduct.reviewText[currentProduct.no_of_rators + 1] = {
        text: req.body.text,
        name: req.body.name,
        profilephoto: req.body.profilephoto,
        rating: req.body.rating
    };
    currentProduct.rating = (currentProduct.rating * currentProduct.no_of_rators + req.body.rating) / (currentProduct.no_of_rators + 1);
    currentProduct.no_of_rators += 1;

    await Product.findOneAndUpdate({ id: req.body.itemId }, { reviewText: currentProduct.reviewText, no_of_rators: currentProduct.no_of_rators, rating: currentProduct.rating });
    res.send("reviewAdded");
});

router.post('/addrating', async (req, res) => {
    let currentProduct = await Product.findOne({ id: req.body.itemId });
    currentProduct.rating = req.body.rating;
    currentProduct.no_of_rators += 1;

    await Product.findOneAndUpdate({ id: req.body.itemId }, { rating: currentProduct.rating, no_of_rators: currentProduct.no_of_rators });
    res.send("ratingAdded");
});

router.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products.reverse());
});

const Users = mongoose.model('Users', {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, unique: true },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
    index: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    batch: { type: String, required: true },
    profile_pic: { type: String },
});

router.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with same email address" });
    }

    let cart = [];
    for (let i = 0; i < 300; i++) {
        cart.push({ q: 0, size: [], color: [] });
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        index: req.body.index,
        faculty: req.body.faculty,
        department: req.body.department,
        batch: req.body.batch,
        profile_pic: req.body.profile_pic,
    });

    await user.save();
    const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
    res.json({ success: true, token });

    let config = {
        service: 'gmail',
        auth: { user: EMAIL, pass: PASSWORD }
    };
    const transporter = nodemailer.createTransport(config);
    let message = {
        from: 'MORAMERCH',
        to: req.body.email,
        subject: "Register for MORAMERCH",
        text: "Successfully Register with MORAMERCH.",
        html: "<b>Successfully Register with MORAMERCH.</b>",
    };

    transporter.sendMail(message);
});

router.get('/allusers', async (req, res) => {
    let users = await Users.find({});
    res.send(users);
});

router.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

router.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(-8).reverse();
    res.send(newcollection);
});

router.get('/popularinmora', async (req, res) => {
    let products = await Product.find({ category: 't-shirts' });
    let popular_in_mora = products.slice(-4).reverse();
    res.send(popular_in_mora);
});

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token" });
        }
    }
};

router.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId].q = req.body.q;
    userData.cartData[req.body.itemId].size = req.body.size;
    userData.cartData[req.body.itemId].color = req.body.color;

    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send('addedToCart');
});

router.get('/fetchcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    res.send(userData.cartData);
});

app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);
