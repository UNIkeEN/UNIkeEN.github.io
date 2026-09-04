import type { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export function HomeLayout({ children, sidebar }: HomeLayoutProps) {
  return (
    <div className="site-shell" id="top">
      <aside className="profile-column">{sidebar}</aside>
      <main className="content-column" id="main-content">
        {children}
      </main>
    </div>
  );
}
