'use strict'

const githubClient = require('./githubClient')

function resolvePrLabels(prId, cb) {
  githubClient.pullRequests.getFiles({
    user: 'nodejs',
    repo: 'node',
    number: prId
  }, (err, res) => {
    if (err) {
      return cb(err)
    }

    const filenamesChanged = res.map((fileMeta) => fileMeta.filename)

    cb(err, filenamesChanged)
  })
}

exports.resolvePrLabels = resolvePrLabels;