import { CheckoutRedirect } from "./checkout-redirect";

const productKeys = new Set(["ai_credits", "portfolio_pro", "bundle"]);
const intervals = new Set(["one_day", "seven_day", "monthly", "annual"]);

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ productKey?: string; interval?: string }>;
}) {
  const params = await searchParams;
  const productKey = productKeys.has(params.productKey ?? "") ? params.productKey! : "bundle";
  const interval = intervals.has(params.interval ?? "") ? params.interval! : "annual";

  return <CheckoutRedirect productKey={productKey} interval={interval} />;
}
