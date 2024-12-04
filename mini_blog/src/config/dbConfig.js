import mongoose from 'mongoose'
import serverConfig from './serverConfig.js'


async function dbConnection() {
    try {
        mongoose.connect(serverConfig.db);
        console.log('DB CONNECTION SUCESSFULL');
    } catch (err) {
        console.log("db not connected");
        
    }
}

export default dbConnection;

