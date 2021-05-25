const joi = require("joi")
const models = require('../models')

exports.createFilm = async (req, res) => {
  try {
    const { files, body } = req

    if (!files.thumbnail) {
      return res.status(400).send({
        status: 'failed',
        message: 'thumbnail image field is required'
      })
    }

    const thumbnail = files.thumbnail[0].filename

    const schema = joi.object({
      title: joi.string().required(),
      price: joi.number().required(),
      description: joi.string().required(),
      filmUrl: joi.string().required(),
      categoryId: joi.number().required()
    })

    const { error } = schema.validate({ ...body })

    if (error) {
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message
      })
    }

    const newFilm = await models.film.create({
      ...body,
      price: Number(body.price),
      thumbnail,
      categoryId: Number(body.categoryId)
    })

    const film = await models.film.findOne({
      where: { id: newFilm.id },
      attributes: {
        exclude: ['categoryId']
      },
      include: {
        model: models.category,
        attributes: ['id', 'name']
      }
    })

    res.status(200).send({ film })

  } catch (err) {
    console.log(err)
    res.status(500).send({
      status: 'failed',
      message: 'server error'
    })
  }
}

exports.getFilmById = async (req, res) => {
  try {
    const { id } = req.params

    const film = await models.film.findOne({ where: { id }, include: {
      model: models.category,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    } })

    res.status(200).send({ film })
  } catch(err) {
    console.log(err)
    res.status(500).send({
      status: 'failed',
      message: 'server error'
    })
  }
}
