const fastify = require('fastify')({'logger': true})
fastify.register(require('./routes/jobsRoutes'))
fastify.register(require('./routes/authentication'))
// fastify.register(require('./DataBase/mongo'))

// fastify.register(
//     require('sequelize-fastify'),
//     {
//       instance: 'db',
//       sequelizeOptions: {
//         dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
//         database: 'postgres',
//         username: 'postgres',
//         password: 'DATABASE_USER_PASSWORD',
//         options: {
//           host: 'DATABASE_HOST_OR_SERVER',
//           port: 'DATABASE_PORT'
//         }
//       }
//     }
//   )
//     .ready(async () => {
//       try {
//         // first connection
//         const result = await fastify.db.authenticate()
  
//         console.log(
//             'Database connection is successfully established.'
//         //   chalk.green('Database connection is successfully established.')
//         )
//       } catch(err) {
//         console.log(
//             `Connection could not established: ${err}`
//         //   chalk.red(`Connection could not established: ${err}`)
//         )
//       } finally {
//         fastify.close()
//       }
//     })

const startServer = async () => {
    try {
        await fastify.listen(5000) 
    } catch(err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

startServer()