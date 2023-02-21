/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { s3 } from "../../../aws/S3";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const awsRouter = createTRPCRouter({
  upload: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const image = await ctx.prisma.image.create({
      data: {
        userId,
      },
    });

    const uploadParams = {
      Bucket: "myipideas",
      Key: `${userId}/${image.id}`,
      Expires: 60,
      ContentType: "image/",
    };

    const url = s3.getSignedUrl("putObject", uploadParams);

    return {
      status: 201,
      url,
    };
  }),
});
