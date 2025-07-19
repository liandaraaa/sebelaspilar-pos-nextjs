export function formatRupiah(amount?: number): string {
  return "Rp " + (amount || 0).toLocaleString("id-ID");
}

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};