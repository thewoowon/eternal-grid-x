"use client";

import dynamic from "next/dynamic";

const TorusScene = dynamic(() => import("@/components/module/TorusScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <section style={{ width: "100vw", height: "100vh" }}>
        <TorusScene />
      </section>
    </div>
  );
}
