'use strict'
const AWS = require('aws-sdk')

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' })

const params = {
  DryRun: false
}

const listInstances = () => new Promise((resolve, reject) => {
  ec2.describeInstances(params, function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data.Reservations)
    }
  })
})

const filterInstancesByTag = (instances, tag) => {
  return instances.filter(
    instance =>
      instance.Instances[0].Tags.filter(
        t => t.Key === tag.Key && t.Value === tag.Value
      ).length > 0
  )
}

const stopInstances = instances => new Promise((resolve, reject) => {
  ec2.stopInstances({
    ...params,
    InstanceIds: instances.map(instance => instance.Instances[0].InstanceId)
  }, function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const startInstances = instances => new Promise((resolve, reject) => {
  ec2.startInstances({
    ...params,
    InstanceIds: instances.map(instance => instance.Instances[0].InstanceId)
  }, function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

module.exports = {
  listInstances,
  stopInstances,
  startInstances,
  filterInstancesByTag
}
