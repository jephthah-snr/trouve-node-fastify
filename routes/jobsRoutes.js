const database = require('../DataBase/data')
const {getAllJobsSchema, getSingleJobSchema, addJobSchema, searchJobSchema} = require('../controllers/schemas/jobposts')
const {getJobHandler, getSingleJob, postNewJob, searchHAndler} = require('../controllers/handlers/jobHandlers')



getJobsOpts = {
    schema: getAllJobsSchema
};

const router =  (fastify, options, done) => {
    // get all jobs from database
    fastify.get('/',getJobsOpts, getJobHandler )
    
    // get single $$ active job from database with ID
    fastify.get('/:id',getSingleJobSchema, getSingleJob)

    fastify.post('/add/job',addJobSchema, postNewJob)

    fastify.get('/api/search/:query', searchJobSchema, searchHAndler)
    

done()
}

module.exports = router