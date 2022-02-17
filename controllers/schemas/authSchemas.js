// const { registerHandler } = require("../handlers/auth-handlers");

const registerSchema = {
    body: {
        type: 'object',
        required: ['title', 'body'],
        properties: {
          id: {type: 'number'},
          firstname: {type: 'string'},
          lastname: {type: 'string'},
          password1: {type: 'string'},
          password2: {type: 'string'},
          email: {type: 'string'},
      },
      response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: {type: 'number'},
                    firstname: {type: 'string'},
                    lastname: {type: 'string'},
                    password1: {type: 'string'},
                    password2: {type: 'string'},
                    email: {type: 'string'},
                },
            },
        }
      },
}
};

const loginSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {type: 'string'},
            password: {type: 'string'}
        },
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                    email: {type: 'string'},
                    password: {type: 'string'} 
                    },
                },
            },
        },
    },
};

module.exports = {registerSchema, loginSchema}