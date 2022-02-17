const {registerHandler, loginHandler} = require('../controllers/handlers/auth-handlers');
const {registerSchema, loginSchema} = require('../controllers/schemas/authSchemas');



const router = (fastify, options, done) => {
    fastify.post('/new/user', registerSchema,registerHandler)
    fastify.post('/login',loginSchema, loginHandler )

done()
};

module.exports = router
