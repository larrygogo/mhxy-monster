import React from "react";
import Header from "@/src/layout/components/Header";

type LayoutProps = {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  )
}

export default Layout