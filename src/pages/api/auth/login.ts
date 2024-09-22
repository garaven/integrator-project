import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'Y29WDusaCmjASKsHOlz6oAFJxbrK4gtmLdYfeyxDWpwa9uiIYfR8Vr3xdA+hBD8mqJXHxe7h/SI+z31ylZxM0w=='; // Asegúrate de usar una clave secreta segura

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
    const accessToken = jwt.sign({ email: data.email }, JWT_SECRET, { expiresIn: '12h' });
    return new Response(JSON.stringify({ success: true, accessToken }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Correo o contraseña inválidos." }), { status: 401 });
  }
};
