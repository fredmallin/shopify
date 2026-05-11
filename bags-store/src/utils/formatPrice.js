export const formatPrice = (amount, currency = "KES") => {
  if (!amount && amount !== 0) return "—";
  return `${currency} ${Number(amount).toLocaleString("en-KE")}`;
};