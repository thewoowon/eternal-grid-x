"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/module/Scene"), { ssr: false });

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Scene />
    </div>
  );
}
