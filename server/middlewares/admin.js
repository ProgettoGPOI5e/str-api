const admin = ({ user }, res, next) => {
  if (!user.get('employee')) {
    return res.status(401).json({
      message: 'Non si detengono i privilegi.'
    })
  }

  next()
}

module.exports = {
  admin
}
