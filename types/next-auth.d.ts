import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    phone?: string;
    role?: string;
  }
}
