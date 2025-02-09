const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Session } = require('inspector');
const session = require('express-session');

const sequelize = require('./config/database');
const routes = require("./routes/routes");
require('dotenv').config();

const app = express();
const host = `${process.env.METHOD}://${process.env.HOST}`
const corsOptions = {
    origin: [
        `${host}:${process.env.CLIENT_PORT}`,
        `${host}:${process.env.MOBILE_PORT}`
    ],
    credentials: true,
}
app.use(cors(corsOptions));

const port = process.env.SERVER_PORT

sequelize.sync();

// app.use(cors());
app.use(session({
    secret: 'gorth',  // Khóa bí mật để mã hóa session
    resave: false,            // Không lưu lại session nếu không thay đổi
    saveUninitialized: false,  // Lưu session ngay cả khi nó chưa được khởi tạo
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, '../client/public/assets/')));
routes(app)

app.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`);
});
