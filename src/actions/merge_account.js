/**
 * Protostar.
 *
 * 'Create account' action.
 *
 * @module server-actions
 * @license Apache-2.0
 */




import {
    codec,
    type,
} from "@xcmats/js-toolbox"
import { mergeTestnetAccount } from "../lib/operations"




/**
 * Merge account.
 *
 * @function mergeAccount
 * @param {Function} logger
 * @returns {Function} express.js action.
 */
export default function mergeAccount (_logger) {

    return async (req, res, next) => {

        if (!type.isString(req.query.addr)) {

            res.status(404).send({
                message: "Hi! Use: ?addr=S_SECRET",
            })

        } else {

            try {

                res.status(200).send({
                    message: "All right!",
                    envelope_xdr: codec.b64enc(
                        await mergeTestnetAccount(req.query.addr)
                    ),
                })

            } catch (ex) {

                res.status(ex.status || 500).send({ error: ex.message })

            }

        }

        next()

    }

}
