# Serverless Annotations API

APIs for Managing Annotations in the Potree Viewer
**Unleash Live – Assessment Task**

---

## 📌 Overview

This repository contains a **Serverless API** built using the **Node/Express** and **AWS DynamoDb**. The API is designed to manage **annotations** for the **Potree Viewer**, enabling creation, retrieval, and deletion of annotation data via RESTful endpoints.

The infrastructure is fully serverless and provisions:

* **AWS Lambda** functions
* **Amazon API Gateway** (HTTP endpoints)

All routes are deployed and accessible via working public URLs.

---

## 🧱 Tech Stack

* **Node.js/Express.js**
* **Serverless Framework**
* **AWS DynamoDb**
* **AWS Lambda**
* **AWS API Gateway**
* **JSON-based REST APIs**

---

## 🚀 API Routes

The API exposes **three routes** for managing annotations:

| Method | Route               | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/annotations`      | Fetch all annotations      |
| POST   | `/annotations`      | Create a new annotation    |
| DELETE | `/annotations/{id}` | Delete an annotation by ID |

> ✅ All routes are deployed and functional.

---

## 🔧 Prerequisites

Before using or testing this repository locally, ensure you have:

* **Node.js** (v18 or later recommended)
* **npm** or **yarn**
* **Serverless Framework** installed globally

```bash
npm install -g serverless
```

* An **AWS account**
* AWS credentials configured locally:

```bash
aws configure
```

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/serverless-annotations-api.git
cd serverless-annotations-api
npm install
```

---

## ▶️ Running Locally (Offline Testing)

You can test the API locally using **serverless-offline**:

```bash
serverless offline
```

This will start a local server, typically at:

```
http://localhost:3000
```

### Example Local Requests

```bash
# Get all annotations
curl http://localhost:3000/annotations

# Create a new annotation
curl -X POST http://localhost:3000/annotations \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Annotation","coords":{x:1,y:1,z:1}}'

# Delete an annotation
curl -X DELETE http://localhost:3000/annotations/{id}
```

---

## ☁️ Deploying to AWS

To deploy the API to AWS:

```bash
serverless deploy
```

After deployment, the Serverless Framework will output the **live API Gateway URLs** for each route.

---

## 🧪 Testing the Deployed API

You can test the live endpoints using:

* **Postman**
* **cURL**
* **Frontend application (Potree Viewer)**

### Example cURL (Deployed URL)

```bash
curl https://<api-id>.execute-api.<region>.amazonaws.com/annotations
```

```bash
curl -X POST https://<api-id>.execute-api.<region>.amazonaws.com/annotations \
  -H "Content-Type: application/json" \
  -d '{"title":"Live Annotation","coords":{x:1,y:1,z:1}}'
```

---

## 📂 Project Structure

```
serverless-annotations-api/
├── handlers/           # Lambda function handlers
├── serverless.yml      # Serverless configuration
├── package.json
├── README.md
```

---

## 📝 Notes for Assessment

* The project demonstrates **serverless architecture best practices**.
* API routes are fully functional and deployed.
* Designed specifically for integration with **Potree Viewer annotations**.
* Infrastructure is reproducible via Serverless Framework.

---

## 📜 License

This project is created for assessment purposes.
