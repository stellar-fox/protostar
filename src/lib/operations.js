/**
 * Protostar.
 *
 * Quick'n'dirty stellar-network operations.
 *
 * @module operations-lib
 * @license Apache-2.0
 */




import {
    type
} from "@xcmats/js-toolbox"




/**
 * Create stellar account on testnet.
 *
 * @function createTestnetAccount
 * @param {String} accountId
 * @returns {Object}
 */
export const createTestnetAccount = async (accountId) => {
    return type.toBool(accountId)
}
