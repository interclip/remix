import { Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-3xl">New Clip</h1>
      <Outlet />
    </div>
  );
}
