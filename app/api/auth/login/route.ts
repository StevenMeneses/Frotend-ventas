import { NextRequest, NextResponse } from "next/server";

interface LoginRequest {
  email: string;
  password: string;
}

interface NestLoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  message?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      console.error("Error: La variable de entorno API_URL no está definida.");
      return NextResponse.json(
        { message: "Falta la variable de entorno API_URL en el servidor frontend." },
        { status: 500 }
      );
    }

    const cleanApiUrl = baseUrl.replace(/\/$/, "");

    const body = (await request.json()) as LoginRequest;
    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "El correo y la contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const response = await fetch(`${cleanApiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      cache: "no-store",
    });

    const textResponse = await response.text();
    let data: NestLoginResponse;

    try {
      data = JSON.parse(textResponse) as NestLoginResponse;
    } catch {
      console.error("El backend no devolvió un JSON válido. Respuesta:", textResponse);
      return NextResponse.json(
        { message: "El backend devolvió una respuesta no válida o se encuentra desactivado." },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Credenciales incorrectas." },
        { status: response.status }
      );
    }

    const nextResponse = NextResponse.json(
      { user: data.user },
      { status: 200 }
    );

    nextResponse.cookies.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 60 * 60,
    });

    return nextResponse;
  } catch (error) {
    const errMessage = (error as { message?: string })?.message || "Error desconocido";
    console.error("Error en /api/auth/login:", error);
    return NextResponse.json(
      { message: `No se pudo conectar con el servidor: ${errMessage}` },
      { status: 500 }
    );
  }
}