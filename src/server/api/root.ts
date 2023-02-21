import { createTRPCRouter } from "./trpc";

import { authRouter } from "./routers/auth/auth";
import { awsRouter } from "./routers/aws/aws";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  aws: awsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
