const { MongoClient } = require("mongodb");
const seedData = require("./data/prescriptions");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "telemedicine";

let db;
const client = new MongoClient(uri);

async function connectToDatabase() {
  await client.connect();
  db = client.db(dbName);

  const collection = db.collection("prescriptions");
  await collection.createIndex({ prescriptionId: 1, patientId: 1 }, { unique: true });

  const count = await collection.countDocuments();
  if (count === 0) {
    await collection.insertMany(seedData);
    console.log("Seeded prescriptions collection with sample data.");
  }

  console.log(`Connected to MongoDB at ${uri}/${dbName}`);
}

function getDb() {
  if (!db) {
    throw new Error("MongoDB is not connected. Call connectToDatabase() first.");
  }
  return db;
}

function getCollection() {
  return getDb().collection("prescriptions");
}

module.exports = {
  connectToDatabase,
  getDb,
  getCollection
};
