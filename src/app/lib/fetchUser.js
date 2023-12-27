import { prisma } from './prisma.js';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function fetchUser() {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('token');
    if (!userCookie) {
      return { user: {}, token: null };
    }
    const decodedToken = jwt.verify(userCookie.value, process.env.JWT_SECRET);

    const { userId } = decodedToken;

    const user = await prisma.user.findFirst({ where: { id: userId } });

    delete user.password;

    return { user, token: userCookie.value };
  } catch (error) {
    console.log(error);
    return { user: {}, token: null };
  }
}
