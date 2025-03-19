import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google'
import db from "./db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import { accounts, sessions, users, verificationTokens } from "./schema";
import { redirect } from "next/navigation";
import React from "react";


const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
export const authOptions: NextAuthOptions = {
  providers: [ 
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          gh_username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }), 
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
};

type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    role: string;
}

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session as { user: User } | null;
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }

    const restaurant = await db.query.restaurants.findFirst({
      where: (restaurants, { eq }) => eq(restaurants.id, siteId),
    });

    if (!restaurant || restaurant.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, restaurant, key);
  };
}

export function withMenuAuth(action: any) {
  return async (
    formData: FormData | null,
    menuId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const menu = await db.query.menus.findFirst({
      where: (menus, { eq }) => eq(menus.id, menuId),
      with: {
        restaurant: true,
      },
    });

    if (!menu || menu.userId !== session.user.id) {
      return {
        error: "Menu not found",
      };
    }

    return action(formData, menu, key);
  };
}


export function withMenuItemAuth(action: any) {
  return async (
    formData: FormData | null,
    menuItemId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    try {
      const menuItem = await db.query.menuItems.findFirst({
        where: (menuItems, { eq }) => eq(menuItems.id, menuItemId),
        with: {
          restaurant: true,
        },
      });
      if (!menuItem || menuItem.restaurant.userId !== session.user.id) {
        return {
          error: "Menu item not found",
        };
      }
  
      return action(formData, menuItem, key);
    }
    catch (error) {
      console.error(error);
      return {
        error: "Something is wrong, try again later",
      };
    }
  };
}

export const withRole = (WrappedComponent: React.ComponentType<any>, requiredRole: string) => {
  const WithRoleComponent = async (props: React.ComponentProps<typeof WrappedComponent>) => {
    const session = await getSession();
    if (!session?.user || session.user.role !== requiredRole) {
      redirect("/unauthorized");
      return null;
    }
    return React.createElement(WrappedComponent, props);
  };

  WithRoleComponent.displayName = `WithRole(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithRoleComponent;
};
