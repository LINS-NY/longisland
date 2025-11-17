import type { ReactNode } from "react";

export const metadata = {
  title: "LINS-NY",
  description: "Long Island Nepalese Society",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}