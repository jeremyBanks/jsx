/** @fileoverview web server for testing. */

Deno.serve((req: Request) => {
  console.log(req);
  return new Response("Hello World");
});
