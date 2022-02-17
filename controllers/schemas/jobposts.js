let post = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: {type: 'number'},
            title: {type: 'string'},
            type: {type: 'string'},
            date_posted: {type: 'string'},
            company: {type: 'string'},
            email: {type: 'string'},
            description: {type: 'string'},
        },
    },
};

const getAllJobsSchema = {
    response: {
        200: post
    },
};


const getSingleJobSchema = {
    params: {
        id: { type: 'number' },
      },
    response: {
        200: post
    },
};

const addJobSchema = {
    body: {
      type: 'object',
      required: ['title', 'body'],
      properties: {
        id: {type: 'number'},
        title: {type: 'string'},
        type: {type: 'string'},
        date_posted: {type: 'string'},
        company: {type: 'string'},
        email: {type: 'string'},
        description: {type: 'string'},
    },
    },
    response: {
      200: post, // sending a simple message as string
    },
  };

module.exports = {getAllJobsSchema, getSingleJobSchema, addJobSchema}