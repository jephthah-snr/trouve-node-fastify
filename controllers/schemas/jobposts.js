const getAllJobsSchema = {
    response: {
        200: {
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
        },
    },
};

module.exports = {getAllJobsSchema}