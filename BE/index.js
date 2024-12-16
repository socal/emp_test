import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PORT } = process.env;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

async function getSlides(userId) {
  const params = {
    TableName: "emp_slides",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": { S: userId },
    },
  };

  try {
    const command = new QueryCommand(params);
    const data = await client.send(command);
    return data.Items.map((elm) => {
      return unmarshall(elm);
    });
  } catch (error) {
    console.error("Error querying DynamoDB:", error);
  }
}

async function insertItem(data) {
  try {
    console.log(data);
    const params = {
      TableName: "emp_slides",
      Item: marshall(data),
    };
    const command = new PutItemCommand(params);
    await client.send(command);
  } catch (err) {
    console.error("Error inserting item:", err);
  }
}

app.get("/slides/user/:id", async (req, res) => {
  const userId = req.params.id;
  const data = await getSlides(userId);
  res.send(data);
});

app.post("/slides", async (req, res) => {
  const data = req.body;
  const dynamoResposne = await insertItem(data);
  console.log(dynamoResposne);
  res.send("inserted");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
