import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

export const requireAuth =
  (func: GetServerSideProps) => (ctx: GetServerSidePropsContext) => {
    const session = await;
  };
