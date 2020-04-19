import logger from '../utils/logger'
import queue from '../workers/queue'

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/

export async function addQueue(req, res) {
    try {
        const { name } = req.body

        queue.create('millions', {
            name,
          }).delay(100)
            .priority('high')
            .removeOnComplete(true)
            .save()

        res.status(200).json({
            message: 'Success',
        })

    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/
