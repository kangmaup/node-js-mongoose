const router = require('express').Router();
const {
  createBlog,
  getBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('./blog.handler');

router.get('/:blogId', (req, res) => {
  getBlogById(req, res);
});

router.route('/').get(getBlog).post(createBlog);

router.put('/update/:articleId', (req, res) => {
  updateBlog(req, res);
});
router.delete('/delete/:articleId', (req, res) => {
  deleteBlog(req, res);
});

// router.get('/', (req,res)=>{
//     getBlog(req,res);
// } )

// router.post('/', (req,res)=>{
//     createBlog(req,res);
// } )
module.exports = router;
