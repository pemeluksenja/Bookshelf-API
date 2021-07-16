const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const startServer = async () => {
	const server = Hapi.server({
		port: 5000,
		host: "localhost",
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

	server.route(routes);
	await server.start();
	console.log(
		`Server berjalan pada host ${server.info.host} dan port ${server.info.port} `
	);
};

startServer();
