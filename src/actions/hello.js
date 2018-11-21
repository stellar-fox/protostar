/**
 * Protostar.
 *
 * 'Hello-world' action.
 *
 * @module server-actions
 * @license Apache-2.0
 */




/**
 * "Hello world".
 *
 * @function hello
 * @param {Function} _logger
 * @returns {Function} express.js action.
 */
export default function hello (_logger) {

    return async (_req, res, next) => {

        res.status(200).send({
            message: "protostar - REST API",
            version: 1,
        })

        next()

    }

}
