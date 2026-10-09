"use client";
import InputCustom from "@/components/ui/input-custom";
import { loginDB } from "@/service/auth.service";
import { Alert, Button, Checkbox } from "@heroui/react";
import axios from "axios";
import { Lock, User, Wine } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
interface Login {
  email: string;
  password: string;
}
interface AlertResponse {
  message : string | null,
  color : "warning" | "success" | "danger"
}
export default function SectionForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertResponse>({message : null, color : "danger"});
  const redirectUrl = searchParams.get("redirect");
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginDB(login.email, login.password);
      setAlert({color: "success", message:  "Usuario logeado correctamente"});
      const destination = redirectUrl
        ? decodeURIComponent(redirectUrl)
        : "/dashboard";
      router.push(destination);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAlert({color: "danger", message:  error.response?.data?.message || "Ocurrió un error inesperado"});
      } else if (error instanceof Error) {
        setAlert({color : "danger", message: error.message});
      } else {
        setAlert({color : "danger", message: "Ocurrió un error inesperado, por favor intentelo nuevamente"});
      }
    }finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex w-full items-center justify-center bg-[#f7f6f3] px-5 py-10 lg:w-[45%]">
      <div className="w-full max-w-md">
        <div className="mb-10 flex items-center gap-3 lg:hidden">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500">
            <Wine size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-900"> HEUSEIN </p>
            <p className="text-xs text-slate-500"> Intranet </p>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-[.2em] text-amber-600">
            Acceso interno
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Bienvenido de nuevo
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Ingresa tus credenciales para acceder al sistema de gestión.
          </p>
        </div>
        {alert.message && <Alert color={alert.color} title={alert.message} className="mb-4" />}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className=" mb-5">
            <InputCustom
              size="lg"
              type="text"
              name="email"
              value={login.email}
              onChange={handleChange}
              label="Usuario o correo electrónico"
              isRequired
              className="text-slate-700"
              startContent={<User size={24} className="text-slate-400" />}
            />
          </div>
          <div className="mb-5">
            <InputCustom
              size="lg"
              type="password"
              isRequired
              value={login.password}
              name="password"
              onChange={handleChange}
              className="text-slate-700"
              label="Contraseña"
              startContent={<Lock size={24} className="text-slate-400" />}
            />
          </div>
          <div className="my-5 flex gap-3 justify-between items-center">
            <Checkbox size="md">Recordame accesos</Checkbox>
            {/* <a href="#" className="text-primary text-sm">¿Olvidaste tu contraseña?</a> */}
          </div>
          <div>
            <Button size="lg" type="submit" isDisabled={loading} fullWidth color="primary">
              Iniciar sesión
            </Button>
          </div>
        </form>
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Seguridad
          </span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50">
              <Lock size={20} className="text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Acceso restringido
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Este sistema es de uso exclusivo para personal autorizado de la
                empresa.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            HEUSEIN · Intranet empresarial
          </p>
          <p className="mt-1 text-[10px] text-slate-300">
            © 2026 Todos los derechos reservados
          </p>
        </div>
      </div>
    </section>
  );
}
