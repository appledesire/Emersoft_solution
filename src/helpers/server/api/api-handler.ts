import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "./error-handler";

export { apiHandler };

function apiHandler(handler: any) {
  const wrappedHandler: any = {};
  const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  // wrap handler methods to add middleware and global error handler

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== "function") return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        // monkey patch req.json() because it can only be called once
        const json = await req.json();
        req.json = () => json;
      } catch {}
      const responseBody = await handler[method](req, ...args);
      return NextResponse.json(responseBody || {});
      //   try {
      //     // monkey patch req.json() because it can only be called once
      //     const json = await req.json();
      //     req.json = () => json;
      //     console.log(json);
      //   } catch {}
    };
  });

  return wrappedHandler;
}
