
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-gray-50'>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID!}>{children}</GoogleOAuthProvider>
      </body>
    </html>
  );
}
