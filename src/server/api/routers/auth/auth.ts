import { signUpSchema } from "../../../api/validation/auth";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import * as trpc from "@trpc/server";
import { hash } from "argon2";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { transporter } from "../../nodemailer/mailer";
import jwt from "jsonwebtoken";
import { env } from "../../../../env.mjs";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;

      const emailExits = await ctx.prisma.user.findFirst({
        where: { email },
      });

      const usernameExits = await ctx.prisma.user.findFirst({
        where: { username },
      });

      if (emailExits || usernameExits) {
        throw new trpc.TRPCError({
          code: "CONFLICT",
          message: "el usuario ya existe",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "cuenta creada satisfactoriamente",
        result: result.email,
      };
    }),

  sendEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { email } = input;

      if (!email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "email debe ser incluido",
        });
      }

      const user = await ctx.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "cuenta no encontrada",
        });
      }

      try {
        const user = await ctx.prisma.user.findFirst({
          where: {
            email,
          },
        });

        const token = jwt.sign({ id: user?.id }, env.EMAIL_JWT_SECRET, {
          expiresIn: 86400 /*24 hour*/,
        });

        const httpResetPassword = `http://localhost:3000/auth/password/reset?resetToken=${token}&email=${email}`;

        await transporter.sendMail({
          from: "hla buens",
          to: email,
          subject: "Restablecer la contraseña",

          html: `<div>
                  <p>Saludos de su equipo de make your ideas reality</p>
                  <p>Hemos recibido una solicitud para restablecer la contraseña de la cuenta asociada a esta direccion de correo electronico haga click en el enclace de abajo para restablecer la contraseña usando nuestro servidor seguro </p>
                  <a href=${httpResetPassword}>${httpResetPassword}</a>
                  <p>Si al hacer clic en el enlace no funciona, cópielo y péguelo en la barra de dirección del explorador web. Podrá crear una nueva contraseña para su cuenta  cuando haya hecho clic en el enlace anterior.</p>
                  <p>Si no solicitó el restablecimiento de su contraseña, puede hacer caso omiso de este mensaje de correo electrónico. Tenga la tranquilidad de que su cuenta es segura.</p>
          </div>`,
        });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "algo salio mal",
        });
      }

      return {
        status: 201,
        message: "se ha enviado al correo",
      };
    }),

  resetPassword: publicProcedure
    .input(
      z.object({
        password: z.string().nullish(),
        resetToken: z.string(),
        email: z.string().email().trim(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { password, resetToken, email } = input;

      if (!password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "introduce una contraseña",
        });
      }

      if (!resetToken) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "token no valido o proporionado",
        });
      }

      try {
        jwt.verify(resetToken, env.EMAIL_JWT_SECRET);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "algo salio mal, por favor vuelva a introducir su email",
        });
      }

      const hashedPassword = await hash(password);

      await ctx.prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: "contraseña cambiada",
      };
    }),
});
