/**
 * Protostar.
 *
 * 'Create account' action.
 *
 * @module server-actions
 * @license Apache-2.0
 */




import { type } from "@xcmats/js-toolbox"
import { createTestnetAccount } from "../lib/operations"




/**
 * Create account.
 *
 * @function createAccount
 * @param {Function} logger
 * @returns {Function} express.js action.
 */
export default function createAccount (_logger) {

    return async (req, res, next) => {

        if (!type.isString(req.query.addr)) {

            res.status(404).send({
                message: "Hi! Use: ?addr=G_PUBLIC",
            })

        } else {

            try {

                await createTestnetAccount(req.query.addr)

                res.status(200).send({
                    message: "All right!",
                })

            } catch (ex) {

                res.status(500).send({
                    error: ex,
                })

            }

        }

        next()

    }

}
