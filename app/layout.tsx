export const metadata = {
  title: 'RWANDA UNIT RATE',
  description: 'BOQ unit rate website for Rwanda provinces and districts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
