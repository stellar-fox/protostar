/**
 * Protostar.
 *
 * Various utilities.
 *
 * @module utils-lib
 * @license Apache-2.0
 */




import {
    func,
    string,
    struct,
} from "@xcmats/js-toolbox"




/**
 * Safe version of (window/self).console object.
 *
 * @function consoleWrapper
 * @param {String} context
 * @returns {Object}
 */
export const consoleWrapper = (() => {
    let
        methods = ["log", "info", "warn", "error"],
        noop = struct.dict(methods.map((m) => [m, () => null])),
        c = (context = "main") => (
            (con) => struct.dict(methods.map(
                (m) => [m, func.partial(con[m])(string.quote(context, "[]"))]
            ))
        )(struct.access(global, ["console"], noop))
    c.noop = noop
    return c
})()
