const joi = require('joi')
const moment = require('moment')
const models = require('../models')

exports.buyFilm = async (req, res) => {
  try {
    const { userId, files, body, params } = req

    if (!files.transferProof) {
      return res.status(400).send({
        status: 'failed',
        message: 'transferProof image field is required'
      })
    }

    const user = await models.userFilm.findOne({ userId })

    if (user && (user.status === 'pending' || user.status === 'approved')) {
      return res.status(400).send({
        status: 'failed',
        message: `You already purchased this film.${user.status === 'pending' ? ' Please wait 1x24 hours because your transaction still in process.' : ''}`
      })
    }

    const transferProof = files.transferProof[0].filename

    const schema = joi.object({
      accountNumber: joi.number().required()
    })

    const { error } = schema.validate({ ...body })

    if (error) {
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message
      })
    }

    const userFilm = await models.userFilm.create({
      ...body,
      status: 'pending',
      transferProof,
      userId,
      filmId: Number(params.id),
      orderDate: moment().format('dddd, DD MMMM yyyy')
    })

    res.status(200).send({ userFilm })
  } catch(err) {
    console.log(err)
    res.status(500).send({
      status: 'failed',
      message: 'server error'
    })
  }
}
