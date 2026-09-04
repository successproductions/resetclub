
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
