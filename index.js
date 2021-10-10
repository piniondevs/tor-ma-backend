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


    // Get Galis Route
    server.route({
        path: '/galis',
        method: 'GET',
        handler: async () => {
            try {
                const galis = await Galis.find();
                return galis;
            } catch (err) {
                return err;
            }
        }
    })

    await server.start();
    console.log(`Server running at http://localhost:${PORT}`);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);

});

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => init()).catch(console.err);