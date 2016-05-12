'use strict'

const tap = require('tap')

const nodeLabels = require('../lib/node-labels')

tap.test('label: "test" when only ./test/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'test/debugger/test-debugger-pid.js',
    'test/debugger/test-debugger-repl-break-in-module.js',
    'test/debugger/test-debugger-repl-term.js'
  ])

  t.same(labels, ['test'])

  t.end()
})

tap.test('no labels: when ./test/ and ./doc/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'test/debugger/test-debugger-pid.js',
    'doc/api/fs.md'
  ])

  t.same(labels, [])

  t.end()
})

// This ensures older mislabelling issues doesn't happen again
// https://github.com/nodejs/node/pull/6432
// https://github.com/nodejs/node/pull/6448
tap.test('no labels: when ./test/ and ./lib/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'lib/punycode.js',
    'test/parallel/test-assert.js'
  ])

  t.same(labels, [])

  t.end()
})

tap.test('label: "doc" when only ./doc/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'doc/api/fs.md',
    'doc/api/http.md',
    'doc/onboarding.md'
  ])

  t.same(labels, ['doc'])

  t.end()
})

tap.test('label: "benchmark" when only ./benchmark/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'benchmark/http_server_lag.js',
    'benchmark/http/check_is_http_token.js'
  ])

  t.same(labels, ['benchmark'])

  t.end()
})

tap.test('label: "c++" when ./src/* has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'src/async-wrap.h',
    'src/async-wrap.cc'
  ])

  t.same(labels, ['c++'])

  t.end()
})

tap.test('label: not "c++" when ./src/node_version.h has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'src/node_version.h'
  ])

  t.same(labels, [])

  t.end()
})

tap.test('label: "v8" when ./deps/v8/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'deps/v8/src/arguments.cc'
  ])

  t.same(labels, ['v8'])

  t.end()
})

tap.test('label: "libuv" when ./deps/ub/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'deps/uv/src/fs-poll.c'
  ])

  t.same(labels, ['libuv'])

  t.end()
})

tap.test('label: "v8", "openssl" when ./deps/v8/ and ./deps/openssl/ files has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'deps/v8/src/arguments.cc',
    'deps/openssl/openssl/ssl/ssl_rsa.c'
  ])

  t.same(labels, ['v8', 'openssl'])

  t.end()
})

//
// Planned tests to be resolved later
//

tap.test('label: "repl" when ./lib/repl.js has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'lib/repl.js',
    'test/debugger/test-debugger-pid.js',
    'test/debugger/test-debugger-repl-break-in-module.js',
    'test/debugger/test-debugger-repl-term.js'
  ])

  t.same(labels, ['repl'])

  t.end()
})

tap.test('label: "lib / src" when more than 5 sub-systems has been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'lib/assert.js',
    'lib/dns.js',
    'lib/repl.js',
    'lib/process.js',
    'src/async-wrap.cc',
    'lib/module.js'
  ])

  t.same(labels, ['lib / src'], { todo: true })

  t.end()
})

tap.test('label: "meta" when meta-info files have changed', (t) => {
  // e.g. LICENSE, AUTHORS, some ./*.md files
  const labels = nodeLabels.resolveLabels([
    '.gitattributes',
    '.gitignore',
    '.mailmap',
    'AUTHORS',
    'LICENSE',
    'CHANGELOG.md',
    'CODE_OF_CONDUCT.md',
    'GOVERNANCE.md',
    'ROADMAP.md',
    'WORKING_GROUPS.md'
  ])

  t.same(labels, ['meta'])

  t.end()
})

tap.test('label: not "meta" when other top-level have been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'BUILDING.md',
    'README.md',
    'COLLABORATOR_GUIDE.md',
    'CONTRIBUTING.md',
    'configure'
  ])

  t.same(labels.indexOf('meta'), -1)

  t.end()
})

tap.test('label: "doc" when top-level .md files have changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'BUILDING.md',
    'README.md'
  ])

  t.same(labels, ['doc'])

  t.end()
})

tap.test('label: not "doc" when other top-level files have been changed', (t) => {
  const labels = nodeLabels.resolveLabels([
    'LICENSE',
    'configure',
    '.mailmap'
  ])

  t.same(labels.indexOf('doc'), -1)

  t.end()
})
