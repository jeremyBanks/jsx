/** @jsxImportSource @jeb/jsx */
import { assertEquals } from "jsr:@std/assert";
import { Element } from "../src/element.ts";

Deno.test("Element.toDocument - HTML (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p>Hello, world!</p>
      </body>
    </html>
  );

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "text/html");
  assertEquals(
    body,
    `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p></body></html>`,
  );
});

Deno.test("Element.toDocument - SVG (JSX)", () => {
  const element = (
    <svg width="100" height="100">
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

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "image/svg+xml");
  assertEquals(
    body,
    `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>`,
  );
});

Deno.test("Element.toDocument - Plain Text (JSX)", () => {
  const element = <div>Hello, world!</div>;

  const { body, contentType } = element.toDocument({ grammar: "unknown" });
  assertEquals(contentType, "text/plain");
  assertEquals(body, `<div>Hello, world!</div>`);
});

Deno.test("Element.toDocument - Mixed Data Types (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p
          booleanAttrTrue={true}
          booleanAttrFalse={false}
          numberAttr={123}
          stringAttr="test"
          nullAttr={null}
          undefinedAttr={undefined}
        >
          Text content
          {123}
          {true}
          {null}
          {undefined}
        </p>
      </body>
    </html>
  );

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "text/html");
  assertEquals(
    body,
    `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p booleanAttr numberAttr=123 stringAttr=test>Text content123true</p></body></html>`,
  );
});

Deno.test("Element.toDocument - Embedded SVG (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p>Hello, world!</p>
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="black"
            stroke-width="3"
            fill="red"
          />
        </svg>
      </body>
    </html>
  );

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "text/html");
  assertEquals(
    body,
    `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg></body></html>`,
  );
});

Deno.test("Element.toDocument - Embedded MathML (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p>Hello, world!</p>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <msup>
            <mi>x</mi>
            <mn>2</mn>
          </msup>
        </math>
      </body>
    </html>
  );

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "text/html");
  assertEquals(
    body,
    `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p><math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mi>x</mi><mn>2</mn></msup></math></body></html>`,
  );
});

Deno.test("Element.toDocument - No Head or Body (JSX)", () => {
  const element = (
    <html>
      <p>Hello, world!</p>
    </html>
  );

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "text/html");
  assertEquals(
    body,
    `<!DOCTYPE html><meta charset=utf-8><html><p>Hello, world!</p></html>`,
  );
});

Deno.test("Element.toDocument - SVG Root (JSX)", () => {
  const element = (
    <svg width="100" height="100">
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

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "image/svg+xml");
  assertEquals(
    body,
    `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>`,
  );
});

Deno.test("Element.toDocument - MathML Root (JSX)", () => {
  const element = (
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msup>
        <mi>x</mi>
        <mn>2</mn>
      </msup>
    </math>
  );

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "text/plain");
  assertEquals(
    body,
    `<math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mi>x</mi><mn>2</mn></msup></math>`,
  );
});

Deno.test("Element.toResponse - HTML (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p>Hello, world!</p>
      </body>
    </html>
  );

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "text/html");
  response.text().then((body) => {
    assertEquals(
      body,
      `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p></body></html>`,
    );
  });
});

Deno.test("Element.toResponse - SVG (JSX)", () => {
  const element = (
    <svg width="100" height="100">
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

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "image/svg+xml");
  response.text().then((body) => {
    assertEquals(
      body,
      `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>`,
    );
  });
});

Deno.test("Element.toResponse - Plain Text (JSX)", () => {
  const element = <div>Hello, world!</div>;

  const response = element.toResponse({ grammar: "unknown" });
  assertEquals(response.headers.get("content-type"), "text/plain");
  response.text().then((body) => {
    assertEquals(body, `<div>Hello, world!</div>`);
  });
});

Deno.test("Element.toResponse - Mixed Data Types (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p
          booleanAttr={true}
          numberAttr={123}
          stringAttr="test"
          nullAttr={null}
          undefinedAttr={undefined}
        >
          Text content
          {123}
          {true}
          {null}
          {undefined}
        </p>
      </body>
    </html>
  );

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "text/html");
  response.text().then((body) => {
    assertEquals(
      body,
      `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p booleanAttr numberAttr=123 stringAttr=test>Text content123true</p></body></html>`,
    );
  });
});

Deno.test("Element.toResponse - Embedded SVG (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p>Hello, world!</p>
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="black"
            stroke-width="3"
            fill="red"
          />
        </svg>
      </body>
    </html>
  );

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "text/html");
  response.text().then((body) => {
    assertEquals(
      body,
      `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg></body></html>`,
    );
  });
});

Deno.test("Element.toResponse - Embedded MathML (JSX)", () => {
  const element = (
    <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <p>Hello, world!</p>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <msup>
            <mi>x</mi>
            <mn>2</mn>
          </msup>
        </math>
      </body>
    </html>
  );

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "text/html");
  response.text().then((body) => {
    assertEquals(
      body,
      `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p><math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mi>x</mi><mn>2</mn></msup></math></body></html>`,
    );
  });
});

Deno.test("Element.toResponse - No Head or Body (JSX)", () => {
  const element = (
    <html>
      <p>Hello, world!</p>
    </html>
  );

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "text/html");
  response.text().then((body) => {
    assertEquals(
      body,
      `<!DOCTYPE html><meta charset=utf-8><html><p>Hello, world!</p></html>`,
    );
  });
});

Deno.test("Element.toResponse - SVG Root (JSX)", () => {
  const element = (
    <svg width="100" height="100">
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

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "image/svg+xml");
  response.text().then((body) => {
    assertEquals(
      body,
      `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>`,
    );
  });
});

Deno.test("Element.toResponse - MathML Root (JSX)", () => {
  const element = (
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <msup>
        <mi>x</mi>
        <mn>2</mn>
      </msup>
    </math>
  );

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "text/plain");
  response.text().then((body) => {
    assertEquals(
      body,
      `<math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mi>x</mi><mn>2</mn></msup></math>`,
    );
  });
});
