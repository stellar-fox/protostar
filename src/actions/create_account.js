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
import { Keypair } from "stellar-sdk"
import { createTestnetAccount } from "../lib/operations"
import { secret } from "../config/configuration.json"




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
                i: Keypair.fromSecret(secret).publicKey(),
            })

        } else {

            try {

                res.status(200).send({
                    message: "All right!",
                    envelope_xdr: codec.b64enc(
                        await createTestnetAccount(req.query.addr)
                    ),
                })

            } catch (ex) {

                res.status(ex.status || 500).send({ error: ex.message })

            }

        }

        next()

    }

}
