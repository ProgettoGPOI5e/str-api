const User = require('../models/user')

const getUser = async ({ params: { id } }, res) => {
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({
      message: 'Nessun utente associato all\'ID.'
    })
  }

  res.status(200).json(user)
}

const getTickets = async ({ params: { id } }, res) => {
  const user = await User.findById(id).populate('tickets.title')

  if (!user) {
    return res.status(404).json({
      message: 'Nessun utente associato all\'ID.'
    })
  }

  res.status(200).json(user.get('tickets'))
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
  getTickets,
  getWallet
}
