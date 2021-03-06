const http = require("http");
const server = http.createServer();
const { MongoClient } = require("mongodb");


const url = "mongodb+srv://test:test@cluster0.x08wt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const dbName = "test";
const client = new MongoClient(url, { useNewUrlParser: true });
const students = [
  {
    name: { first: "joe", last: "appleton" },
    dob: new Date("August 12, 1982"),
  },
  {
    name: { first: "bill", last: "smith" },
    dob: new Date("August 12, 1982"),
  },
];

server.on("request", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("students");
    await collection.insertMany(students);
    res.end("request ended");
  } catch (e) {
    console.log(`could not update ${e}`);
  }
});

server.listen(8080);