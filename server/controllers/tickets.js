const Ticket = require('../models/ticket')
const Purchase = require('../models/purchase')

const getTickets = async (req, res) => {
  const tickets = await Ticket.find()

  res.status(200).json(tickets)
}

// const buyTicket = async ({ user, params: { id } }, res) => {
//   const ticket = await Ticket.findById(id)

//   if (!ticket) {
//     return res.status(404).json({
//       message: 'Il titolo di viaggio non esiste.'
//     })
//   }

//   const price = ticket.get('price.value')

//   if (user.get('wallet.balance') < price) {
//     return res.status(403).json({
//       message: 'Non si dispone dei fondi necessari.'
//     })
//   }

//   try {
//     const purchase = await user.buyTicket({
//       title: id,
//       price
//     })
//     res.status(200).json(purchase)
//   } catch (e) {
//     res.status(403).json({
//       message: 'Impossibile acquistare il titolo di viaggio.'
//     })
//   }
// }

const buyTickets = async ({ user, body }, res) => {
  const tickets = await Ticket.find({
    _id: {
      $in: body.map(el => el.id)
    }
  })

  if (tickets.length !== body.length) {
    return res.status(403).json({
      message: 'Uno dei biglietti non e\' valido.'
    })
  }

  const purchases = []

  for (let i = 0; i < body.length; i++) {
    for (let j = 0; j < body[i].counter; j++) {
      purchases.push(tickets.find(el => {
        return el.get('_id').toString() === body[i].id.toString()
      }))
    }
  }

  if (!purchases.length) {
    return res.status(403).json({
      message: 'Nessun titolo di viaggio selezionato.'
    })
  }

  const price = purchases.reduce((accumulator, current) => {
    return accumulator + current.get('price.value')
  }, 0)

  if (user.get('wallet.balance') < price) {
    return res.status(403).json({
      message: 'Non si dispone dei fondi necessari.'
    })
  }

  try {
    const buy = Purchase.create(purchases.map(el => {
      return {
        user: user.get('_id'),
        ticket: el._id
      }
    }))
    await buy

    await user.buyTicket(price)
    res.status(200).json(purchases)
  } catch (e) {
    res.status(403).json({
      message: 'Impossibile acquistare il titolo di viaggio.'
    })
  }
}

/* const buyTicket = async ({ user, params: { id } }, res) => {
  const ticket = await Ticket.findById(id)

  if (!ticket) {
    return res.status(404).json({
      message: 'Il titolo di viaggio non esiste.'
    })
  }

  const price = ticket.get('price.value')

  if (user.get('wallet.balance') < price) {
    return res.status(403).json({
      message: 'Non si dispone dei fondi necessari.'
    })
  }

  try {
    const purchase = new Purchase({
      ticket: ticket.get('_id'),
      user: user.get('_id')
    })
    await purchase.save()
    await user.buyTicket(price)
    res.status(200).json(purchase)
  } catch (e) {
    res.status(403).json({
      message: 'Impossibile acquistare il titolo di viaggio.'
    })
  }
} */

module.exports = {
  getTickets,
  buyTickets
}
