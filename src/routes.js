/**
 * Protostar.
 *
 * Routes configuration.
 *
 * @module server-routes
 * @license Apache-2.0
 */




import hello from "./actions/hello"




/**
 * Shambhala routes configuration.
 *
 * @function configureRoutes
 * @param {Object} app
 * @param {Object} logger
 */
export default function configureRoutes (app, logger) {


    // "hello world" route
    app.get("/", hello(logger))

}
