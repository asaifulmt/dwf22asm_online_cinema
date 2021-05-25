const models = require('../models')

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req

    const profile = await models.user.findOne({
      where: {
        id: userId
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'role']
      },
      include: {
        model: models.film,
        attributes: ['id', 'title', 'price'],
        through: {
          model: models.userFilm,
          attributes: ['orderDate', 'status']
        }
      }
    })

    res.status(200).send({
      status: 'success',
      profile
    })

  } catch(err) {
    console.log(err)
    res.status(500).send({
      status: 'failed',
      message: 'server error'
    })
  }
}
