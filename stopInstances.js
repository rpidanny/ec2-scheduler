'use strict'

const { listInstances, stopInstances, filterInstancesByTag } = require('./helper')
const { scheduler } = require('./config')

module.exports.handler = (event, context, callback) => {
  listInstances()
    .then(instances => {
      console.log(JSON.stringify(instances, null, 2))
      const filteredInstances = filterInstancesByTag(instances, scheduler.filterTag)
      if (filteredInstances > 0) {
        console.log(`Stopping ${filteredInstances.length} instances...`)
        return stopInstances(filteredInstances)
      } else {
        callback(null, {
          message: 'No instances to stop.'
        })
      }
    })
    .then(data => {
      console.log(JSON.stringify(data, null, 2))
      callback(null, data)
    })
    .catch(err => callback(err))
}
