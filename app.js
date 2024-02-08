const { error } = require('console');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/BlogRoutes');

const app = express();

//connection String for mongoDB
const dbURI = 'mongodb+srv://trafalgarlaw3b:9jrcy9gv9@nodetut.5edjncm.mongodb.net/node-tuts?retryWrites=true&w=majority';

// promise.then()
mongoose.connect(dbURI).then((resullt) => {
    const server = app.listen(3000);
    console.log('Listening to port 3000 !');
}).catch(err => console.log(err));

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs') ;

app.use('/blogs', blogRoutes);
    
app.get('/about', (req, res) => {
    // res.send(fs.readFileSync('./assets/index.html'));
    res.render('about', {title: 'About'});
});

app.use((req, res) => {
    res.status(404).render('404');
});


//mongoose and mongo sandbox use: 
// app.get('/blog-create', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog 2',
//         snippet: 'ABCD',
//         body: 'Blog Details ...'
//     });

//     blog.save()
//     .then( (result) => {res.send(result)})
//     .catch((err) => {console.log(err)});
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find().then((result) => {
//         res.send(result);
//     }).catch(err => console.log(err))
// })