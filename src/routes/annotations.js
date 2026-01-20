const express = require('express');
const router = express.Router();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require('crypto');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-southeast-2' });
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.ANNOTATIONS_TABLE || 'AnnotationsTable';

// Middleware to check if annotation exists
const getAnnotationById = async (req, res, next) => {
  try {
    const { annotationId } = req.params;
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: annotationId },
    });
    const result = await docClient.send(command);
    if (!result.Item) {
      return res.status(404).json({ error: 'Annotation not found' });
    }
    req.annotation = result.Item;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve annotation' });
  }
}

// Get all annotations
router.get("/", async (req, res) => {
  try {
    const { Items } = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    res.json(Items);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve annotations" });
  }
});

// Create a new annotation
router.post("/", async (req, res) => {
  const { title, coords } = req.body;
  
  if (!title || !coords || coords.x === undefined || coords.y === undefined || coords.z === undefined) {
    return res.status(400).json({ message: 'Title and coordinates (x, y, z) are required.' });
  }

  const newAnnotation = {
    id: randomUUID(),
    title,
    coords: {
      x: Number(coords.x),
      y: Number(coords.y),
      z: Number(coords.z)
    },
    createdAt: new Date().toISOString()
  };

  try {
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: newAnnotation,
    }));
    
    res.status(201).json(newAnnotation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an annotation
router.delete("/:annotationId", getAnnotationById, async (req, res) => {
  try {
    await docClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.annotationId },
    }));
    res.json({ message: "Annotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete annotation" });
  }
});

module.exports = router;
