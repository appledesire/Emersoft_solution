import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export { errorHandler };

function errorHandler(err: Error | string) {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const status = is404 ? 404 : 400;
    return NextResponse.json({ message: err }, { status });
  }

  // default to 500 server error
  console.error(err);
  return NextResponse.json({ message: err.message }, { status: 500 });
}
