import Example, { Circle } from "./Example.tsx";

Deno.serve(async (request: Request, info) => {
  console.log(info.remoteAddr.hostname, request.method, request.url);

  const url = new URL(request.url, "http://localhost");
  const path = url.pathname;

  switch (path) {
    case "/":
      return (<html>
        <head>
          <title>
            example page
          </title>
          <style children="
            body {
              font-family: system-ui, sans-serif;
            }
          " />
        </head>
        <body>
          <Example />

          <div>
            <Circle>{2}{3}</Circle>
          </div>

          <img src="/image.svg" />
        </body>
      </html>).toResponse();

    case "/image.svg":
      return (<Circle />).toResponse();

    default:
      return new Response("404 not found", { status: 404 });
  }
});
