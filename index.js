const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { nanoid } = require('nanoid');

// Model Imports
const Gali = require('./models/GaliModel');
const Request = require('./models/RequestModel');

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

const init = async () => {

    const server = Hapi.server({
        port: PORT,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    // Home Route
    server.route({
        path: '/',
        method: 'GET',
        handler: () => {
            return 'Hello World';
        }
    });

    /* Routes Relating to Requests 
     *
     * /requests - Get all the requests (GET)
     * /requests/{request_id} - Get a single request (GET)
     * /requests/create - Create a new request (POST)
     * /requests/delete/{request_id} - Delete a request (DELETE)
     * 
    */

    // Get Requests Route
    server.route({
        path: '/requests',
        method: 'GET',
        handler: async () => {
            try {
                const requests = await Request.find();
                return requests;
            } catch (err) {
                return err;
            }
        }
    });

    // Getting a single request route
    server.route({
        path: '/requests/{request_id}',
        method: 'GET',
        handler: async (request) => {
            try {

                const singleRequest = await Request.findOne({ id: request.params.request_id });
                return singleRequest;

            } catch (err) {
                return err;
            }
        }
    });

    // Creating a Request Route
    server.route({
        path: '/requests/create',
        method: 'POST',
        handler: async (request) => {
            try {
                const { gali, author } = request.payload;

                if (!gali) return 'You must include a \'gali\' property in the payload.'
                if (!author) return 'You must include a \'author\' property in the payload.'


                const schema = {
                    id: nanoid(10),
                    gali: gali,
                    author: author
                }

                const newRequest = new Request(schema);
                await newRequest.save();

                return { saved: true, data: schema };
            } catch (err) {
                return err;
            }
        }
    });

    // Deleting a request route 
    server.route({
        path: '/requests/delete/{request_id}',
        method: 'DELETE',
        handler: async (request) => {
            try {

                await Request.deleteOne({ id: request.params.request_id });
                return `If everything went fine then the element has been deleted`;

            } catch (err) {
                return err;
            }
        }
    });


    /* Routes Relating to Galis 
     *
     * /galis - Get all the galis (GET)
     * /galis/{gali_id} - Get a single gali (GET)
     * /galis/delete/{gali_id} - Delete a single gali (DELETE)
     * 
    */

    // Get Galis Route
    server.route({
        path: '/galis',
        method: 'GET',
        handler: async () => {
            try {
                const galis = await Gali.find();
                return galis;
            } catch (err) {
                return err;
            }
        }
    });

    // Get Single Gali Route
    server.route({
        path: '/galis/{gali_id}',
        method: 'GET',
        handler: async (request) => {
            try {

                const singleGali = await Gali.findOne({ id: request.params.gali_id });
                return singleGali;

            } catch (err) {
                return err;
            }
        }
    });

    // Deleteing a gali
    server.route({
        path: '/galis/delete/{gali_id}',
        method: 'DELETE',
        handler: async (request) => {
            try {

                await Gali.deleteOne({ id: request.params.gali_id });
                return `If everything went fine then the element has been deleted`;

            } catch (err) {
                return err;
            }
        }
    });


    await server.start();
    console.log(`Server running at http://localhost:${PORT}`);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);

});

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => init()).catch(console.err);