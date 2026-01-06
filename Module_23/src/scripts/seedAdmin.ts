import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    console.log("***** Admin Seeding Start *****");
    const adminData = {
      name: "Admin2 Saheb",
      email: "admin2@admin.com",
      role: UserRole.ADMIN,
      password: "admin1234",
      emailVerified: true,
    };

    console.log("***** Checking Admin Exist or not *****");
    // check user exist on database or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exist!!");
    }

    const signUpAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    );

    if (signUpAdmin.ok) {
      console.log("***** Admin Created *****");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });

      console.log("***** Email verification status updated *****");
    }

    console.log("****** SUCCESS ******");
  } catch (error) {
    console.log(error);
  }
}

seedAdmin();
