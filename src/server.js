const app = require("./app");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const socket = require("socket.io");
let server;

const db_name = process.env.NODE_ENV === "test" ? "test-lierno" : "lierno";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/" + db_name;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        const port = process.env.PORT || 3001;

        logger.info(`MongoDB connected at ${uri}`);

        server = app.listen(port, () => {
            logger.info(`Server is running at http://192.168.1.51:${port}`);
            logger.info(
                `GraphQL playground at http://192.168.1.51:${port}/api/v2/graphql`,
            );
        });

        const io = socket(server);
        app.io = io;

        io.on("connection", function (socket) {
            logger.info("Socket connected:", socket.client.id);
        });
    });

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server close");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.info(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
