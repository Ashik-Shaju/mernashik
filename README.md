# Book Inventory API

Simple REST API for a book inventory using Node.js, Express and MongoDB (Mongoose).

Features implemented:

- Mongoose Book model with schema:
  - title (String, required)
  - author (String, required)
  - genre (String, required)
  - price (Number, required)
  - stock (Number, default 0)
  - publishedYear (Number)
  - createdAt (Date, default Date.now)

- Routes (Express Router mounted at `/api/books`):
  - POST /api/books → Add a new book
  - GET /api/books → Get all books
  - PUT /api/books/:id → Update a book
  - DELETE /api/books/:id → Delete a book

DB name and connection
- The code uses the environment variable `MONGO_URI` if provided. The default connection string is:

```
mongodb://127.0.0.1:27017/ashik
```

Note: database name uses `book-inventory` (no space) to avoid issues with spaces in DB names. If you need the literal name with a space, use a properly encoded URI, but that's uncommon.

Quick start

1. Install dependencies:

```powershell
npm install
```

2. Run the model validation test (does not require MongoDB):

```powershell
npm run test-model
```

3. Start the server (ensure MongoDB is running or set `MONGO_URI`):

```powershell
npm start
```

or use hot-reload during development:

```powershell
npm run dev
```

API examples

- Add a book (POST JSON to /api/books):

```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "price": 12.99,
  "stock": 10,
  "publishedYear": 1949
}
```

Follow-ups you might want:

- Add request validation (Joi or express-validator).
- Add pagination/filtering to GET /api/books.
- Add tests for the route handlers (supertest + jest).

Connect to MongoDB Atlas
------------------------

If you'd like to use MongoDB Atlas (hosted DB) instead of a local MongoDB instance, follow these steps:

1. Create an Atlas cluster (or use an existing one):
  - Go to https://www.mongodb.com/cloud/atlas and sign up / sign in.
  - Create a free cluster (or paid if you prefer). Wait for the cluster to be provisioned.

2. Create a database user:
  - In Atlas, open "Database Access" → "Add New Database User".
  - Choose a username and password. For production use, give the user only necessary privileges.

3. Allow your IP to access the cluster:
  - In Atlas, open "Network Access" → "Add IP Address".
  - For testing, you can add 0.0.0.0/0 (anywhere) but it's not recommended for production.

4. Get the connection string:
  - In Atlas, click "Connect" → "Connect your application" and copy the connection string.
  - It will look like:

```
mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/<dbname>?retryWrites=true&w=majority
```

5. Update the connection string:
  - Replace `<username>` and `<password>` (URL-encode special characters in the password).
  - Replace `<dbname>` with `ashik` (or a name you prefer).

6. Provide the connection string to the app:
  - Option A: Create a `.env` file in the project root and add:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/ashik?retryWrites=true&w=majority
PORT=5000
```

  - Option B: Set the environment variable in PowerShell just for the current session and start the server:

```powershell
$env:MONGO_URI='mongodb+srv://<username>:<password>@cluster0.abcd.mongodb.net/book-inventory?retryWrites=true&w=majority'; npm start
```

7. Start the server (the app already uses `dotenv` to read `.env` and will use `MONGO_URI` when present):

```powershell
npm start
```

Notes and troubleshooting
- If you see authentication errors, double-check the username/password and URL-encode special characters in the password.
- If you see network errors, ensure your current IP is allowed in Atlas Network Access.
- For connection strings using SRV (`mongodb+srv://`), the MongoDB driver will resolve the seed list automatically.
- After connecting, the server will only start listening if the DB connection succeeds (the app is configured to fail-fast on DB connection failure).

Security tip
- Do not commit a `.env` file containing real credentials to source control. Use environment variables or secret management in production.

