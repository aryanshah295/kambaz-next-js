import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-account">
      <div className="d-flex">
        <div className="d-none d-md-block">
          <AccountNavigation />
        </div>
        <div style={{ width: '25%' }}>
            {children}
        </div>
      </div>
    </div>
  );
}