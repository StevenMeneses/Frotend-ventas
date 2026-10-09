import { Metadata } from "next"
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
        <SectionForm />
      </main>
    </div>
  );
}
