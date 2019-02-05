/**
 * Protostar.
 *
 * Quick'n'dirty stellar-network operations.
 *
 * @module operations-lib
 * @license Apache-2.0
 */




import {
    func,
    timeUnit,
} from "@xcmats/js-toolbox"
import {
    Keypair,
    Memo,
    Network,
    Networks,
    Operation,
    Server,
    TransactionBuilder,
} from "stellar-sdk"
import {
    secret,
    amount,
} from "../config/configuration.json"




/**
 * Create stellar account on testnet.
 *
 * @function createTestnetAccount
 * @param {String} accountId
 * @returns {Uint8Array}
 */
export const createTestnetAccount = async (accountId) => {
    let
        destinationKP = Keypair.fromPublicKey(accountId),
        sourceKP = Keypair.fromSecret(secret),
        server = null,
        sourceAccount = null,
        tx = null

    // do nothing on destination === source
    if (destinationKP.publicKey() === sourceKP.publicKey()) {
        throw { message: "Won't fund myself.", status: 400 }
    }

    // testnet
    Network.use(new Network(Networks.TESTNET))
    server = new Server("https://horizon-testnet.stellar.org/")

    // load source account
    sourceAccount = await server.loadAccount(sourceKP.publicKey())

    // transaction
    tx = func.pipe(new TransactionBuilder(sourceAccount))(

        // create account
        (tb) => tb.addOperation(Operation.createAccount({
            destination: destinationKP.publicKey(),
            startingBalance: String(amount),
        })),

        // add memo ...
        (tb) => tb.addMemo(Memo.text("star formation")),

        // ... with some time bounds
        (tb) => tb.setTimeout(10 * timeUnit.second),

        // build the transaction
        (tb) => tb.build(),

    )

    // sign the transaction with source keypair
    tx.sign(sourceKP)

    // send transaction to the network
    await server.submitTransaction(tx)

    // return transaction envelope xdr
    return tx.toEnvelope().toXDR()
}




/**
 * Merge stellar account to >>our<< account on testnet.
 *
 * @function mergeTestnetAccount
 * @param {String} mergedAccountSecret
 * @returns {Uint8Array}
 */
export const mergeTestnetAccount = async (mergedAccountSecret) => {
    let
        destinationKP = Keypair.fromSecret(secret),
        sourceKP = Keypair.fromSecret(mergedAccountSecret),
        server = null,
        sourceAccount = null,
        tx = null

    // do nothing on destination === source
    if (destinationKP.publicKey() === sourceKP.publicKey()) {
        throw { message: "Won't merge myself.", status: 400 }
    }

    // testnet
    Network.use(new Network(Networks.TESTNET))
    server = new Server("https://horizon-testnet.stellar.org/")

    // load source account
    sourceAccount = await server.loadAccount(sourceKP.publicKey())

    // transaction
    tx = func.pipe(new TransactionBuilder(sourceAccount))(

        // merge into account
        (tb) => tb.addOperation(Operation.accountMerge({
            destination: destinationKP.publicKey(),
        })),

        // add memo ...
        (tb) => tb.addMemo(Memo.text("nova explosion")),

        // ... with some time bounds
        (tb) => tb.setTimeout(10 * timeUnit.second),

        // build the transaction
        (tb) => tb.build(),

    )

    // sign the transaction with source keypair
    tx.sign(sourceKP)

    // send transaction to the network
    await server.submitTransaction(tx)

    // return transaction envelope xdr
    return tx.toEnvelope().toXDR()
}
