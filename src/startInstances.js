'use strict'

const { listInstances, startInstances, filterInstancesByTag } = require('./helper')
const { scheduler } = require('./config')

module.exports.handler = (event, context, callback) => {
  listInstances()
    .then(instances => {
      console.log(JSON.stringify(instances, null, 2))
      const filteredInstances = filterInstancesByTag(instances, scheduler.filterTag)
      if (filteredInstances.length > 0) {
        console.log(`Stopping ${filteredInstances.length} instances...`)
        return startInstances(filteredInstances)
      } else {
        callback(null, {
          message: 'No instances to start.'
        })
      }
    })
    .then(data => {
      console.log(JSON.stringify(data, null, 2))
      callback(null, data)
    })
    .catch(err => callback(err))
}
