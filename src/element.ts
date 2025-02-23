import { textAsAttributeValue, textAsTextNode } from "./escaping.ts";

export interface ElementStringOpts {
  indent?: string;
  previousIndent?: string;
  previousComponents?: Array<string | ((prop: unknown) => unknown)>;
  rootAttributes?: Readonly<Record<string, string | true>>;
  grammar?: "html" | "xml" | "unknown" | undefined;
}

export class Element {
  constructor(
    readonly type: string | undefined,
    readonly attributes: Readonly<Record<string, string | true>>,
    readonly children: ReadonlyArray<Element | string>,
  ) {}

  toString(opts?: ElementStringOpts): string {
    const body = this.children.map((child) => {
      if (child instanceof Element) {
        return child.toString({ ...opts, rootAttributes: {} });
      } else if (typeof child === "string") {
        return textAsTextNode(child, this.type, opts?.grammar ?? "unknown");
      } else {
        throw new TypeError(`unexpected child type`);
      }
    }).join("");

    if (!this.type) {
      return body;
    }

    if (this.type == "!--") {
      return `<!--${body}-->`;
    }

    const attributes = {
      ...opts?.rootAttributes ?? {},
      ...this.attributes,
    };

    let openingTag = `<${this.type}${
      Object.entries(attributes).map(([name, value]) => {
        let buffer = " ";

        buffer += name;

        if (value === true && opts?.grammar !== "html") {
          value = name;
        }

        if (typeof value === "string") {
          buffer += `=${
            textAsAttributeValue(value, opts?.grammar ?? "unknown")
          }`;
        } else if (value !== true) {
          throw new TypeError(`unexpected attribute value type`);
        }

        return buffer;
      }).join("")
    }>`;

    const tagContents = this.children.map((child) => {
      if (child instanceof Element) {
        return child.toString({ ...opts, rootAttributes: {} });
      } else if (typeof child === "string") {
        return textAsTextNode(child, this.type, opts?.grammar ?? "unknown");
      } else {
        throw new TypeError(`unexpected child type`);
      }
    }).join("");

    let closingTag = `</${this.type}>`;

    const hasAttributes = Object.keys(attributes).length > 0;

    if (opts?.grammar == "html") {
      // optional tags in html

      if (this.type === "html") {
        if (!hasAttributes) {
          openingTag = "";
        }
        closingTag = "";
      }

      if (this.type === "head") {
        if (!hasAttributes) {
          openingTag = "";
        }
        closingTag = "";
      }

      if (this.type === "body") {
        const firstChild = this.children[0];

        if (
          !hasAttributes && (
            firstChild === undefined ||
            (
              typeof firstChild === "string" &&
              !firstChild.match(/^[\t\n\f\r ]/)
            ) ||
            (
              firstChild instanceof Element &&
              ![
                "meta",
                "noscript",
                "link",
                "script",
                "style",
                "template",
                "!--" as string | undefined,
              ].includes(firstChild.type)
            )
          )
        ) {
          openingTag = "";
        }

        closingTag = "";
      }
    }

    if (!tagContents) {
      if (opts?.grammar === "xml") {
        // XXX: This should also apply for the pseudo-xml grammar
        // used by forign elements in HTML, i.e. descendants of
        // svg or math elements.
        // Similarly for the ]]> escape in our textAsTextNode function.
        openingTag = openingTag.slice(0, -1) + "/>";
        closingTag = "";
      } else if (VOID_HTML_ELEMENTS.includes(this.type)) {
        closingTag = "";
      }
    }

    return openingTag + tagContents + closingTag;
  }

  toDocument(
    opts: ElementStringOpts = {},
  ): { body: string; contentType: string } {
    opts = {
      ...opts ?? {},
      grammar: opts.grammar ??
        (this.type === "html"
          ? "html"
          : this.type === "svg"
          ? "xml"
          : undefined),
    };

    let root: string;
    let body: string;
    let contentType: string;

    if (this.type === "html") {
      root = this.toString({ grammar: "html", ...opts });
      body = `<!DOCTYPE html><meta charset=utf-8>${root}`;
      contentType = "text/html";
    } else if (this.type === "svg") {
      root = this.toString({
        grammar: "xml",
        rootAttributes: { xmlns: "http://www.w3.org/2000/svg" },
        ...opts,
      });
      body = `<?xml version="1.0" encoding="UTF-8"?>${root}`;
      contentType = "image/svg+xml";
    } else {
      body = this.toString({
        grammar: "unknown",
      });
      contentType = "text/plain";
    }

    return { body, contentType };
  }

  toResponse(opts: ResponseInit & ElementStringOpts = {}): Response {
    const { body, contentType } = this.toDocument(opts);

    return new Response(body, {
      status: 200,
      ...opts,
      headers: {
        "content-type": contentType,
        ...opts.headers ?? {},
      },
    });
  }
}

const VOID_HTML_ELEMENTS = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];
