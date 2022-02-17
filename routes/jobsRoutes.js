const database = require('../DataBase/data')
const {getAllJobsSchema, getSingleJobSchema, addJobSchema} = require('../controllers/schemas/jobposts')
const {getJobHandler, getSingleJob, postNewJob} = require('../controllers/handlers/jobHandlers')


getJobsOpts = {
    schema: getAllJobsSchema
};

const router =  (fastify, options, done) => {
    // get all jobs from database
    fastify.get('/',getJobsOpts, getJobHandler )
    
    // get single $$ active job from database with ID
    fastify.get('/:id',getSingleJobSchema, getSingleJob)

    fastify.post('/add/job',addJobSchema, postNewJob)
    

done()
}

module.exports = router