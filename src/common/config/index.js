const PORT = 7777;
const MONGO_URL = `mongodb://localhost:27017`;
const DEV_MODE = process.env.NODE_ENV === `development`;

module.exports = {
    PORT,
    MONGO_URL,
    DEV_MODE
}