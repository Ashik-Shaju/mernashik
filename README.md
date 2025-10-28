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
mongodb://127.0.0.1:27017/book-inventory
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
