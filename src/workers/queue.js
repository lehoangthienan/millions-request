import kue from 'kue'
import Million from '../models/million'

import logger from '../utils/logger'
import configs from '../configs'

// init queue
const queue = kue.createQueue({
  prefix: configs.KUE_PREFIX_MESSAGES,
  redis: configs.REDIS_ADDR,
})

queue.setMaxListeners(10000)

const _exit = () => {
  // Reset all: stop queue, reset bot status  --> user must start bot manually
  queue.shutdown(5000, function (err) {
    logger.error('Kue shutdown: ', err || '')
    process.exit(0)
  })
}

process.on('SIGINT', _exit)

// re-queue all stuck job (active job)
queue.active(function (err, ids) {
  ids.forEach(function (id) {
    kue.Job.get(id, function (err, job) {
      if (job.type === 'millions') {
        job.inactive() // re-queue
      }
    })
  })
})

const findJobCount = () => {
  queue.activeCount(function(err,count) {
    if(!err)
      console.log('Active: ',count) // eslint-disable-line
  })
  queue.inactiveCount(function(err,count) {
    if(!err)
      console.log('Inactive: ',count) // eslint-disable-line
  })
}

export const processQueue = () => {
  findJobCount()
  queue.process('millions', configs.MAX_QUEUE_PROCESS, async (job, done) => {
    findJobCount()
    try {
        const { name } = job.data
        const million = new Million ({ name })
        await million.save()
    } catch (err) {
      logger.error(err)
    } finally {
      done()
    }
  })
}

export const removeQueueCompleted = () => {
  queue.completeCount( function( err, total ) {
    console.log( 'CompleteCount', total ) // eslint-disable-line
  })
  queue.failedCount( function( err, total ) {
    console.log( 'FailedCount', total ) // eslint-disable-line
  })

  queue.on('job enqueue', function(){
  }).on('job complete', function(id){
    kue.Job.get(id, function(err, job){
      if (err) return
      job.remove(function(err){
        if (err) throw err
      })
    })
  })
}
  
export default queue
