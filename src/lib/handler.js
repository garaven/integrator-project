import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const JWT_SECRET = 'Y29WDusaCmjASKsHOlz6oAFJxbrK4gtmLdYfeyxDWpwa9uiIYfR8Vr3xdA+hBD8mqJXHxe7h/SI+z31ylZxM0w==';

export async function handler(req, res) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET);
    const { data, error } = await supabase.auth.api.getUser(token);

    if (error) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }
    res.status(200).json({ data });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
}
