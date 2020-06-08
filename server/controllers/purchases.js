const Purchase = require('../models/purchase')

const validatePurchase = async ({ params: { id }, user }, res) => {
  const purchase = await Purchase.findById(id).populate('ticket').populate('user')

  if (!purchase) {
    return res.status(404).json({
      message: 'Il biglietto non esiste.'
    })
  }

  if (purchase.get('user._id').toString() !== user.get('_id').toString()) {
    return res.status(401).json({
      message: 'Non si è autorizzati a convalidare il titolo di viaggio.'
    })
  }

  const endDate = purchase.get('validity.endDate')

  if (endDate !== null && endDate < new Date()) {
    return res.status(403).json({
      message: 'Il biglietto è scaduto.'
    })
  } else {
    const validity = purchase.get('ticket.validity')
    const startDate = new Date()

    const newEndDate = new Date(startDate.getTime() + validity * 60000)

    purchase.set('validity.startDate', startDate)
    purchase.set('validity.endDate', newEndDate)

    await purchase.save()
  }

  res.status(200).json({
    message: 'Il biglietto è stato convalidato.'
  })
}

module.exports = {
  validatePurchase
}
