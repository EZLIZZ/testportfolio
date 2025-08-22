import { ActiveSectionProvider } from "@/contexts/active-section";
import Header from "./_components/Header";

import type { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
     <ActiveSectionProvider ids={["home", "work", "namaste", "collaborate"]}>
      <Header />
      {children}
      </ActiveSectionProvider>

    </>
  );
}