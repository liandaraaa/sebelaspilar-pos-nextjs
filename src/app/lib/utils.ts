export function formatRupiah(amount?: number): string {
  return "Rp " + (amount || 0).toLocaleString("id-ID");
}
