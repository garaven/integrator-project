import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Correo y contraseña requeridos." }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('administrador')
    .select('email, password')
    .eq('email', email)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: "Correo o contraseña incorrectos." }), { status: 500 });
  }

  if (data && data.password === password) {
    const accessToken = "token-acceso-temporal";
    const refreshToken = "token-refresh-temporal";
    return new Response(JSON.stringify({ success: true, accessToken, refreshToken }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Correo o contraseña inválidos." }), { status: 401 });
  }
};
