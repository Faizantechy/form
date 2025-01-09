import connectDataBase from "@/app/lib/db";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function POST(request) {
  try {
    // Connect to the database
    await connectDataBase();

    // Parse request body
    const { name, password, email } = await request.json();

    // Check if the user already exists
    const userExistence = await User.findOne({ email });
    if (userExistence) {
      return NextResponse.json({ results: "User Already Exists", status: 409 });
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    return NextResponse.json({
      message: "User is registered",
      user: newUser,
      status: 200,
    });
  } catch (error) {
    // Handle errors
    return NextResponse.json({ results: error.message, status: 500 });
  }
}
