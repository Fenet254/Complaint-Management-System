import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to auth pages
        if (pathname.startsWith('/auth')) {
          return true;
        }

        // Require authentication for all other pages
        if (!token) {
          return false;
        }

        // Role-based access
        if (pathname.startsWith('/admin') && token.role !== 'admin') {
          return false;
        }

        // Staff and admin can access complaint management
        if (pathname.startsWith('/complaint/users') && !['staff', 'admin'].includes(token.role as string)) {
          return false;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
