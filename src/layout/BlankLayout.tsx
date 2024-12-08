import { Outlet } from '@umijs/max';
import { Toaster } from 'react-hot-toast';

interface BasicLayoutProps {
  children: React.ReactNode;
}

export default function BlankLayout({}: BasicLayoutProps) {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}
