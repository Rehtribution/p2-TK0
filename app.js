const path = require("path");
const routes = require("./controllers/");
const session = require("express-session");
const express = require("express");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const app = express();
const PORT = process.env.PORT || 9001;
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
	secret: "DB_PASSWORD",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./controllers/"));
app.use(routes);

// turn on connection to db and server
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
	sequelize.sync({ force: false });
});

