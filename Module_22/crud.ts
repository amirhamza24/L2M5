import { prisma } from "./lib/prisma";

async function run() {
  // const createUser = await prisma.user.create({
  //   data: {
  //     name: "Jhankar Mahbub",
  //     email: "jkr@prisma.io",
  //   },
  // });
  // console.log("Created user: ", createUser);

  //! create post for user id =1
  // const createPost = await prisma.post.create({
  //   data: {
  //     title: "This is title",
  //     content: "This is a big Content",
  //     authorId: 1,
  //   },
  // });
  // console.log("Created post: ", createPost);
  // const createdProfile = await prisma.profile.create({
  //   data: {
  //     bio: "Web Dev at PH",
  //     userId: 1,
  //   },
  // });
  // console.log("Created profile: ", createdProfile);

  //! retrieve all users
  // const users = await prisma.user.findMany({
  // include: {
  //   posts: true,
  //   profile: true,
  // }, // includes works for all relations or all data
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     posts: true,
  //     profile: true,
  //   }, // select works for specific data only selected data
  // });
  // console.log("Users: ", users);
  // console.dir(users, { depth: Infinity }); // showing in details
  // update user
  // const updateUser = await prisma.profile.update({
  //   where: {
  //     userId: 1,
  //   },
  //   data: {
  //     bio: "Level 2 Mission 5 Module 22 is done",
  //     dateOfBirth: "2025-12-26T21:17:27.945Z",
  //   },
  //   select: {
  //     id: true,
  //     bio: true,
  //     user: {
  //       select: {
  //         name: true,
  //         email: true,
  //       },
  //     },
  //   },
  // });
  // console.log("Updated user: ", updateUser);

  //! delete user
  // const deleteUser = await prisma.user.delete({
  //   where: {
  //     id: 2,
  //   },
  // });
  // console.log("Deleted user: ", deleteUser);

  //! get user data by id
  // const getUserDataById = await prisma.user.findUnique({
  //   where: {
  //     id: 2,
  //   },
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // });
  // console.log("Get User Data By Id: ", getUserDataById);

  //! upsert user
  const upsertUser = await prisma.user.upsert({
    where: {
      email: "jkr@ph.com",
    },
    update: {
      name: "Jhankar Mahbub 2",
    },
    create: {
      name: "Jhankar Mahbub 3",
      email: "jkr@ph.com",
    },
  });
  console.log("Upsert user: ", upsertUser);
}

run();
