"use server";

// import User from "@/lib/modals/user.modal";
import User from "@/lib/models/user.model";
// import { connect } from "@/lib/db";
import { connect } from "../db";

export async function createUser(user: any) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
