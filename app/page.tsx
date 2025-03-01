"use client";

import dynamic from "next/dynamic";

const EarthScene = dynamic(
  () => import("@/components/module/EarthScene/NewEarthScene"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* <section style={{ width: "100vw", height: "100vh" }}>
        <TorusScene />
      </section> */}
      <section style={{ width: "100vw", height: "100vh" }}>
        <EarthScene />
      </section>
    </div>
  );
}
