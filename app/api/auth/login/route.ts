import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.API_URL;
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
    const body = (await request.json()) as LoginRequest;
    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          message: "El correo y la contraseña son obligatorios.",
        },
        {
          status: 400,
        },
      );
    }
    
    const response = await fetch(`${API_URL}/auth/login`, {
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

    const data = (await response.json()) as NestLoginResponse;
    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message || "Credenciales incorrectas.",
        },
        {
          status: response.status,
        },
      );
    }
    const nextResponse = NextResponse.json(
      {
        user: data.user,
      },
      {
        status: 200,
      },
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
    console.error("Error en /api/auth/login:", error);
    return NextResponse.json(
      {
        message: "No se pudo conectar con el servidor.",
      },
      {
        status: 500,
      },
    );
  }
}
