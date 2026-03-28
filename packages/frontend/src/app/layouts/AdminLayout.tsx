import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>Admin Panel</header>
      <main>{children}</main>
    </div>
  );
}