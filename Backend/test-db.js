import mongoose from 'mongoose';

const testConnection = async () => {
    try {
        const connectionString = 'mongodb+srv://xyliophille06_db_user:3YzC2aCb7OKIVwml@cluster0.cd20ec4.mongodb.net/festivalhub?retryWrites=true&w=majority&appName=Cluster0';

        await mongoose.connect(connectionString);
        console.log('✅ MongoDB Connected Successfully!');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📊 Available collections:', collections.map(c => c.name));

        await mongoose.disconnect();
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
    }
};

testConnection();