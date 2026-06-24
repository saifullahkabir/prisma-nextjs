import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { IRegisterUser } from "./user.interface";

const registerUserIntoDB = async (payload: IRegisterUser) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  // await prisma.profile.create({
  //   data: {
  //     userId: createdUser.id,
  //     profilePhoto,
  //   },
  // });

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: createdUser.id,
  //   },
  //   omit: {
  //     password: true,
  //   },
  //   include: {
  //     profile: true,
  //   },
  // });

  return createdUser;
};

const getMyProfileFromDB = async (userId: string) => {
  const profile = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return profile
};

export const userService = {
  registerUserIntoDB,
  getMyProfileFromDB,
};
