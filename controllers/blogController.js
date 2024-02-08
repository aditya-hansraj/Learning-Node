const Blog = require('../models/blog');




const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1}).then((result) => {
        // res.send(fs.readFileSync('./assets/index.html'));
        console.log('Opened Home page (/blogs)');
        res.render('index', {title: 'Home', blogs: result});
    }).catch(err => console.log(err));
}

const blog_details = (req, res) => {
    const id = req.params.id;

    Blog.findById(id).then(
        result => {
            if(!result) res.status(404).render('404', {title: 'Blog Not found'})
           
            console.log('Opened Blog Details (/blogs/:id)');
            res.render('details', {blog: result, title: 'Blog Details'})
        }
    ).catch(err => res.status(404).render('404', {title: 'Blog Not found'}));
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then(result => {
        console.log('Deleted Blog (/blogs:id)');
        res.json({redirect: '/blogs'})
    })
    .catch( err => console.log(err));
}

const blogCreateGet = (req, res) => {
    console.log('Opened Create Page (blogs/create)');
    res.render('create', {title: 'Create blog'});
}

const blogCreatePost = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then( result => {
        console.log('Added new Blog(/blogs)');
        res.redirect('/blogs')
    }).catch(
        err => console.log(err)
    );
}

module.exports = {
    blog_index,
    blogCreateGet,
    blogCreatePost,
    blog_details,
    blog_delete,
    
}