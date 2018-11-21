/**
 * Protostar.
 *
 * 'Create account' action.
 *
 * @module server-actions
 * @license Apache-2.0
 */




import { type } from "@xcmats/js-toolbox"




/**
 * Create account.
 *
 * @function createAccount
 * @param {Function} _logger
 * @returns {Function} express.js action.
 */
export default function createAccount (_logger) {

    return async (req, res, next) => {

        if (!type.isString(req.query.addr)) {

            res.status(404).send({
                message: "Hi! Use: ?addr=G_PUBLIC",
            })

        } else {

            res.status(200).send({
                message: "hi!",
                query: req.query,
            })

        }

        next()

    }

}
