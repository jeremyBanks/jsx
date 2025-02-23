import { assertEquals } from "jsr:@std/assert";
import { Element } from "../src/element.ts";

Deno.test("Element.toDocument - HTML", () => {
  const element = new Element("html", {}, [
    new Element("head", {}, [
      new Element("title", {}, ["Test Page"]),
    ]),
    new Element("body", {}, [
      new Element("p", {}, ["Hello, world!"]),
    ]),
  ]);

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "text/html");
  assertEquals(body, `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p></body></html>`);
});

Deno.test("Element.toDocument - SVG", () => {
  const element = new Element("svg", { width: "100", height: "100" }, [
    new Element("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "3", fill: "red" }, []),
  ]);

  const { body, contentType } = element.toDocument();
  assertEquals(contentType, "image/svg+xml");
  assertEquals(body, `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>`);
});

Deno.test("Element.toDocument - Plain Text", () => {
  const element = new Element("div", {}, ["Hello, world!"]);

  const { body, contentType } = element.toDocument({ grammar: "unknown" });
  assertEquals(contentType, "text/plain");
  assertEquals(body, `<div>Hello, world!</div>`);
});

Deno.test("Element.toResponse - HTML", () => {
  const element = new Element("html", {}, [
    new Element("head", {}, [
      new Element("title", {}, ["Test Page"]),
    ]),
    new Element("body", {}, [
      new Element("p", {}, ["Hello, world!"]),
    ]),
  ]);

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "text/html");
  response.text().then((body) => {
    assertEquals(body, `<!DOCTYPE html><meta charset=utf-8><html><head><title>Test Page</title></head><body><p>Hello, world!</p></body></html>`);
  });
});

Deno.test("Element.toResponse - SVG", () => {
  const element = new Element("svg", { width: "100", height: "100" }, [
    new Element("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "3", fill: "red" }, []),
  ]);

  const response = element.toResponse();
  assertEquals(response.headers.get("content-type"), "image/svg+xml");
  response.text().then((body) => {
    assertEquals(body, `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/></svg>`);
  });
});

Deno.test("Element.toResponse - Plain Text", () => {
  const element = new Element("div", {}, ["Hello, world!"]);

  const response = element.toResponse({ grammar: "unknown" });
  assertEquals(response.headers.get("content-type"), "text/plain");
  response.text().then((body) => {
    assertEquals(body, `<div>Hello, world!</div>`);
  });
});
