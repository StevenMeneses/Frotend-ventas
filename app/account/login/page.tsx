import { Metadata } from "next";
import { Suspense } from "react";
import SectionInformation from "./components/SectionInformation";
import SectionForm from "./components/SectionForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0b0d0f] text-white antialiased">
      <main className="min-h-screen flex">
        <SectionInformation />
        <Suspense fallback={<div className="flex-1 flex items-center justify-center">Cargando...</div>}>
          <SectionForm />
        </Suspense>
      </main>
    </div>
  );
}
