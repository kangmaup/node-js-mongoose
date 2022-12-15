const { faker } = require("@faker-js/faker");
const bcrypt = require('bcryptjs');
const MongoClient = require("mongodb").MongoClient;


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    const uri = "mongodb://localhost:27017/";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("app_db").collection("users");
        // const collection = mongoDB.collection('users');
        let userData = [];
        collection.drop();
        for (let i = 0; i < 100000; i++) {
            const name = faker.name.fullName();
            const username = faker.internet.userName();
            const pass = faker.internet.password();
            const password = bcrypt.hashSync(pass);
            const user = {
                name,
                username,
                password
            }

            userData.push(user);
        }

        await collection.insertMany(userData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();