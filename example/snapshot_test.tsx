import { assertSnapshot } from "jsr:@std/testing/snapshot";

import Example, { Circle } from "./Example.tsx";

/** @jsxImportSource @jeb/jsx */

Deno.test("Example component - HTML container", async (t) => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <Example />
      </body>
    </html>
  );

  await assertSnapshot(t, element.toDocument());
});

Deno.test("Example component - SVG container", async (t) => {
  const element = (
    <svg width="100" height="100">
      <foreignObject width="100" height="100">
        <Example />
      </foreignObject>
    </svg>
  );

  await assertSnapshot(t, element.toDocument());
});

Deno.test("Example component - Independent", async (t) => {
  const element = <Example />;

  await assertSnapshot(t, element.toDocument());
});
