Deno.serve(async (request: Request, info) => {
  console.log(info.remoteAddr.hostname, request.method, request.url);

  const url = new URL(request.url, "http://localhost");
  const path = url.pathname;

  const circle = (
    <svg
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="3"
        fill="red"
      />
    </svg>
  );

  switch (path) {
    case "/":
      return (<html>
        <head>
          <style children="
            body {
              font-family: system-ui, sans-serif;
            }
          " />
        </head>
        <body>
          <p>
            Hello, {Math.random().toString(16).slice(2, 6)}!
          </p>

          {circle}

          <img src="/image.svg" />
        </body>
      </html>).toResponse();

    case "/image.svg":
      return circle.toResponse();

    default:
      return new Response("404 not found", { status: 404 });
  }
});
