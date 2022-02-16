const database = require('../DataBase/data')
const {getAllJobsSchema, getSingleJobSchema} = require('../controllers/schemas/jobposts')
const {getJobHandler, getSingleJob} = require('../controllers/handlers/jobHandlers')


getJobsOpts = {
    schema: getAllJobsSchema
};

const router =  (fastify, options, done) => {
    // get all jobs from database
    fastify.get('/',getJobsOpts, getJobHandler )
    
    // get single $$ active job from database with ID
    fastify.get('/:id',getSingleJobSchema, getSingleJob)

    fastify.post('/add/job', (req, reply) => {
        console.log(req.body)
        reply.send(req.body)
    })
    

done()
}

module.exports = router