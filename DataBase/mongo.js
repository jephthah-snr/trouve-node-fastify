// module.exports = async function application (app, opts, done) {
//     // ...
  
//     app.register(require('fastify-mongodb'), {
    
//     })
//   done()
//     // our code..
//   }
  const fastifyPlugin = require('fastify-plugin')

  async function dbConnector (fastify, options, done) {
    fastify.register(require('fastify-mongodb'), {
    url: 'mongodb+srv://jephthah:jeph3000@cluster0.bcpew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    })

  }
  
  // Wrapping a plugin function with fastify-plugin exposes the decorators
  // and hooks, declared inside the plugin to the parent scope.
  module.exports = dbConnector