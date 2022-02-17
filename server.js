const fastify = require('fastify')({'logger': true})
fastify.register(require('./routes/jobsRoutes'))
fastify.register(require('./routes/authentication'))


const startServer = async () => {
    try {
        await fastify.listen(5000) 
    } catch (err) {
        fastify.error.log(err)
    }
}

startServer()