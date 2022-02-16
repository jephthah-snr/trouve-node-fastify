const database = require('../DataBase/data')
const databse = require('../DataBase/data')
const {getAllJobsSchema} = require('../controllers/schemas/jobposts')


getJobsOpts = {
    schema: getAllJobsSchema
};

const router =  (fastify, options, done) => {
    // get all jobs from database
    fastify.get('/',getJobsOpts, async (req, reply) => {
        await reply.send(database)
    })
    
    // get single $$ active job from database with ID
    fastify.get('/:id', async (req, reply) => {

        let job = database.find(data => data.id === req.params.id)
        await reply.send(job)
    })

    fastify.post('/add/job', (req, reply) => {
        console.log(req.body)
        reply.send(req.body)
    })
    

done()
}

module.exports = router