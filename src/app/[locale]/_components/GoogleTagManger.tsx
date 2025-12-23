export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>{/* End Google Tag Manager */}</head>

      <body>{children}</body>
    </html>
  );
}
