const database = require('../../DataBase/data')
let dummyCache = {};


const getJobHandler = async (req, reply) => {
    await reply.send(database)
}


const getSingleJob = async (req, reply) => {
    const {id} = req.params
    const job = database.filter((job) => {
        return job.id == id;
      })[0];
    
      if (!job) {
        return reply.status(404).send({
          errorMsg: 'job not found',
        });
      }
      return reply.send(job);
}

//idempotent post request using dummy cache.
const postNewJob = async (req, reply) => {
    if (dummyCache[req.headers['x-idempotence-key']]) {
        return reply.status(304).send('Not Modified');
      }
   
      const response = {
        message: `Your job was sucessfull added to our catalogue!`,
      }; 

    dummyCache[req.headers['x-idempotence-key']] = response;
    reply.send({
        data: req.body,
        res: response
    })
}


module.exports = {getJobHandler, getSingleJob, postNewJob}