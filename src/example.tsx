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
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        stroke="#123"
        stroke-width="8"
        fill="#FED"
      />
    </svg>
  );

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
