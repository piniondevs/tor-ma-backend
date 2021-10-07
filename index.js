import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Models
import Galis from './models/GaliModel';
import Requests from './models/RequestModel';

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
    })

    await server.start();
    console.log(`Server running at http://localhost:${PORT}`);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);

});

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => init()).catch(console.err);