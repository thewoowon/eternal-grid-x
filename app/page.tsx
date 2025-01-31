"use client";

import dynamic from "next/dynamic";

const TorusScene = dynamic(() => import("@/components/module/TorusScene"), {
  ssr: false,
});

const CubeScene = dynamic(() => import("@/components/module/CubeScene"), {
  ssr: false,
});

const PyramidScene = dynamic(() => import("@/components/module/PyramidScene"), {
  ssr: false,
});

const SphereScene = dynamic(() => import("@/components/module/SphereScene"), {
  ssr: false,
});

const CapsuleScene = dynamic(() => import("@/components/module/CapsuleScene"), {
  ssr: false,
});

const CylinderScene = dynamic(
  () => import("@/components/module/CylinderScene"),
  {
    ssr: false,
  }
);

const DodecahedronScene = dynamic(
  () => import("@/components/module/DodecahedronScene"),
  {
    ssr: false,
  }
);

const IcosahedronScene = dynamic(
  () => import("@/components/module/IcosahedronScene"),
  {
    ssr: false,
  }
);

const OctahedronScene = dynamic(
  () => import("@/components/module/OctahedronScene"),
  {
    ssr: false,
  }
);

const TetrahedronScene = dynamic(
  () => import("@/components/module/TetrahedronScene"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <section style={{ width: "100vw", height: "100vh" }}>
        <TorusScene />
      </section>
      {/* <section style={{ width: "100vw", height: "100vh" }}>
        <FluidScene />
      </section> */}
      <section style={{ width: "100vw", height: "100vh" }}>
        <CubeScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <PyramidScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <SphereScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <CapsuleScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <CylinderScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <DodecahedronScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <IcosahedronScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <OctahedronScene />
      </section>
      <section style={{ width: "100vw", height: "100vh" }}>
        <TetrahedronScene />
      </section>
    </div>
  );
}
