// const { default: mongoose, Schema } = require('mongoose');
const { articleModel } = require('./blog.model');

const getBlog = async (req, res) => {
  try {
    const data = await articleModel.find().populate('author').exec();
    console.log(data);
    res
      .send({
        status: 'Sukses',
        message: 'Article Berhasil Ditambahkan',
        data,
      })
      .status(201);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.blogId);
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createBlog = async (req, res) => {
  const article = new articleModel(req.body);
  try {
    await article.save();
    res
      .send({
        status: 'Sukses',
        message: 'Article Berhasil Ditambahkan',
      })
      .status(201);
  } catch (err) {
    res
      .send({
        status: 'Error',
        message: 'Article Gagal Ditambahkan',
      })
      .status(400);
  }
};

const updateBlog = async (req, res) => {
  const cekId = await articleModel.findById(req.params.articleId);
  if (!cekId)
    return res.status(404).json({ message: 'Article Tidak Ditemukan' });
  try {
    await articleModel.updateOne(
      {
        _id: req.params.articleId,
      },
      {
        $set: req.body,
      }
    );
    res
      .send({
        status: 'Sukses',
        message: 'Data Berhasil ditambahkan',
      })
      .status(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deleteBlog = async (req, res) => {
  const cekId = await articleModel.findById(req.params.articleId);
  if (!cekId)
    return res.status(404).json({ message: 'Article Tidak Ditemukan' });
  try {
    const deletedBlog = await articleModel.deleteOne({
      _id: req.params.articleId,
    });
    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
