const dotenv = require('dotenv');
const { connectDB } = require('./src/config/database');
const app = require('./src/app');
const PORT = process.env.PORT || 5000;

dotenv.config();

(async () => {
    await connectDB();
})();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
