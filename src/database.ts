import { connect, connection } from 'mongoose'
                //
const mongoURI = 'mongodb://localhost:27017/proyecto66';  
//mongodb+srv://victorarjona:RkJ7CyZ46HzsvC3b@quickfindeaproject.mr2tj.mongodb.net/?retryWrites=true&w=majority&appName=QuickFindEAProject
export async function startConnection() {
    try {
        await connect(mongoURI, {
        });
        console.log('Connected to MongoDB successfully!');
    } catch (err) {
        console.error('Unable to connect to MongoDB. Error:', err);
    }
}
