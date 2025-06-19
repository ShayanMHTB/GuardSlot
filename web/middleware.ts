// // middleware.ts
// import { createServerClient } from '@supabase/ssr';
// import { NextResponse, type NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({
//     request,
//   });

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll();
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             request.cookies.set(name, value),
//           );
//           supabaseResponse = NextResponse.next({
//             request,
//           });
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options),
//           );
//         },
//       },
//     },
//   );

//   // Refresh session if expired
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Protected routes - require authentication
//   if (
//     request.nextUrl.pathname.startsWith('/(protected)') ||
//     request.nextUrl.pathname.startsWith('/dashboard') ||
//     request.nextUrl.pathname.startsWith('/bookings') ||
//     request.nextUrl.pathname.startsWith('/analytics') ||
//     request.nextUrl.pathname.startsWith('/payments') ||
//     request.nextUrl.pathname.startsWith('/settings') ||
//     request.nextUrl.pathname.startsWith('/api-keys')
//   ) {
//     if (!user) {
//       // Redirect to login if not authenticated
//       const redirectUrl = request.nextUrl.clone();
//       redirectUrl.pathname = '/login';
//       redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
//       return NextResponse.redirect(redirectUrl);
//     }
//   }

//   // Auth routes - redirect to dashboard if already authenticated
//   if (
//     (request.nextUrl.pathname.startsWith('/login') ||
//       request.nextUrl.pathname.startsWith('/register')) &&
//     user
//   ) {
//     const redirectUrl = request.nextUrl.clone();
//     redirectUrl.pathname = '/dashboard';
//     return NextResponse.redirect(redirectUrl);
//   }

//   return supabaseResponse;
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// };

export default function middleware() {
  return null;
}
