export function toArabicNumbers(input: string): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  return input.replace(/\d/g, digit => arabicNumerals[parseInt(digit)]);
}
