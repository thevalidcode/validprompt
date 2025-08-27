import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>ValidPrompt | Your AI-powered prompt builder</title>
      <body>{children}</body>
    </html>
  );
}
