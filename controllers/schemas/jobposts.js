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

module.exports = {getAllJobsSchema, getSingleJobSchema}