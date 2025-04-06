export default function covertToPersianInt(num) {
  return num.toLocaleString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}