const User = require('../models/user')
const Purchase = require('../models/purchase')

const getUser = async ({ params: { id } }, res) => {
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({
      message: 'Nessun utente associato all\'ID.'
    })
  }

  res.status(200).json(user)
}

const getPurchases = async ({ params: { id }, user }, res) => {
  const purchases = await Purchase.find({
    user: user.get('_id')
  })
    .sort({
      _id: -1
    })
    .populate('user')
    .populate('ticket')

  if (!user) {
    return res.status(404).json({
      message: 'Nessun utente associato all\'ID.'
    })
  }

  res.status(200).json(purchases)
}

const getValidPurchases = async ({ user }, res) => {
  const purchases = await Purchase.find({
    user: user.get('_id'),
    $or: [{
      'validity.endData': null
    }, {
      'validity.endData': {
        $gte: new Date()
      }
    }]
  })
    .sort({
      _id: -1
    })
    .populate('user')
    .populate('ticket')

  res.status(200).json(purchases)
}

const getInvalidPurchases = async ({ user }, res) => {
  const tickets = await Purchase.find({
    user: user.get('_id'),
    'validity.endData': {
      $lt: new Date()
    }
  })
    .sort({
      _id: -1
    })
    .populate('user')
    .populate('ticket')

  res.status(200).json(tickets)
}

const getWallet = async ({ params: { id } }, res) => {
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({
      message: 'Nessun utente associato all\'ID.'
    })
  }

  res.status(200).json(user.get('wallet'))
}

module.exports = {
  getUser,
  getPurchases,
  getValidPurchases,
  getInvalidPurchases,
  getWallet
}
