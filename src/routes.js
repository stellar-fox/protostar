/**
 * Protostar.
 *
 * Routes configuration.
 *
 * @module server-routes
 * @license Apache-2.0
 */




import createAccount from "./actions/create_account"




/**
 * Shambhala routes configuration.
 *
 * @function configureRoutes
 * @param {Object} app
 * @param {Object} logger
 */
export default function configureRoutes (app, logger) {

    // "create account" route
    app.get("/", createAccount(logger))

}
