import jwt from 'jsonwebtoken';

const JWT_SECRET = 'Y29WDusaCmjASKsHOlz6oAFJxbrK4gtmLdYfeyxDWpwa9uiIYfR8Vr3xdA+hBD8mqJXHxe7h/SI+z31ylZxM0w==';

export async function protectRoute(context) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return {
      redirect: '/',
    };
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return context.next();
  } catch (error) {
    return {
      redirect: '/',
    };
  }
}
