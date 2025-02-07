const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { Session } = require('inspector');
const session = require('express-session');

const sequelize = require('./config/database');
const routes = require("./routes/routes");

const app = express();
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    credentials: true,
}
app.use(cors(corsOptions));

const port = process.env.PORT

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
    console.log(`Server is running at http://localhost:${port}`);
});
