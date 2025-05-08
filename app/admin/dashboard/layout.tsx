'use client';

import AdminAuthProvider from '@/components/AdminAuthProvider';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}