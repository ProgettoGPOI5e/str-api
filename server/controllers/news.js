const News = require('../models/news')

const getNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate({
        path: 'author'
      })
    res.status(200).json(news)
  } catch (e) {
    res.status(500).json({
      message: 'Impossibile recuperare le notizie.'
    })
  }
}

const addNews = async ({ body: { title, body }, user: { _id } }, res) => {
  const news = new News({
    title,
    body,
    author: _id
  })

  try {
    await news.save()
    res.status(200).json(news)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Impossibile inserire l\'aggiornamento.'
    })
  }
}

module.exports = {
  getNews,
  addNews
}
