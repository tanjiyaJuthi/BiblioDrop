import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PATCH(req) {
  try {
    const { role } = await req.json();
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await auth.api.updateUser({
      headers: req.headers,

      body: {
        role,
      },
    });


    return NextResponse.json({
      success: true,
      message: "Role updated",
    });


  } catch(error) {

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status:500,
      }
    );
  }
}