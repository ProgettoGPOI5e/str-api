const Ticket = require('../models/ticket')

const getTickets = async (req, res) => {
  const tickets = await Ticket.find()

  res.status(200).json(tickets)
}

const buyTickets = async ({ user, params: { id } }, res) => {
  const ticket = await Ticket.findById(id)

  if (!ticket) {
    return res.status(404).json({
      message: 'Il titolo di viaggio non esiste.'
    })
  }

  const price = ticket.get('price').split(' ')[1]

  if (user.get('wallet.balance') < price) {
    return res.status(500).json({
      message: 'Non si dispone dei fondi necessari.'
    })
  }

  try {
    const purchase = await user.buyTicket({
      title: id,
      price
    })
    res.status(200).json(purchase)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Impossibile acquistare il titolo di viaggio.'
    })
  }
}

module.exports = {
  getTickets,
  buyTickets
}
