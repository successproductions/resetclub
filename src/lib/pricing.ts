/**
 * Single source of truth for what a Reset Club membership costs.
 *
 * The page renders the price and the API charges it, but only the API's copy is
 * authoritative: the browser can rewrite anything it POSTs, so the amount sent
 * to the CMI gateway is always recomputed server-side and the client's figure
 * is ignored.
 *
 * Both sides read the same variable. `NEXT_PUBLIC_` is inlined into the client
 * bundle at build time and read from the environment at runtime on the server,
 * so displayed and charged prices cannot drift apart.
 */

/** CMI transaction fee passed on to the customer. */
export const CMI_FEE_MULTIPLIER = 1.0297;

const DEFAULT_PRICE_MAD = 1500;

/** Price shown to the customer, before the CMI fee. */
export function getBasePriceMad(): number {
  return Number(process.env.NEXT_PUBLIC_PAYMENT_AMOUNT_MAD) || DEFAULT_PRICE_MAD;
}

/** Amount actually charged, rounded up to the centime. */
export function getTotalAmountMad(): number {
  return Math.ceil(getBasePriceMad() * CMI_FEE_MULTIPLIER * 100) / 100;
}
