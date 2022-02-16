const database = require('../../DataBase/data')



const getJobHandler = async (req, reply) => {
    await reply.send(database)
}


const getSingleJob = async (req, reply) => {
    const {id} = req.params
    let job = database.find(data => data.id == id)
    console.log(id)
    await reply.send(job)
}


module.exports = {getJobHandler, getSingleJob}