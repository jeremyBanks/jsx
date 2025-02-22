import { unreachable } from "jsr:@std/assert/unreachable";
import { textAsAttributeValue, textAsChildOfTag } from "./escaping.ts";

export interface JsxStringOpts {
  indent?: string;
  previousIndent?: string;
  previousComponents?: Array<string | ((prop: unknown) => unknown)>;
}

export class JsxElement {
  constructor(
    readonly type: string | undefined,
    readonly attributes: Readonly<Record<string, string | true>>,
    readonly children: ReadonlyArray<JsxElement | string>,
  ) {}

  toString(opts?: JsxStringOpts): string {
    const body = this.children.map((child) => {
      if (child instanceof JsxElement) {
        return child.toString({ ...opts });
      } else if (typeof child === "string") {
        return textAsChildOfTag(child, this.type);
      } else {
        throw new TypeError(`unexpected child type`);
      }
    }).join("");

    if (!this.type) {
      return body;
    }

    if (
      !body && [
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
      ].includes(this.type.toLowerCase())
    ) {
      return `<${this.type}/>`;
    }

    if (this.type == "!--") {
      return `<!--${body}-->`;
    }

    return `<${this.type}${
      Object.entries(this.attributes).map(([name, value]) => {
        let buffer = " ";

        buffer += name;

        if (typeof value === "string") {
          buffer += `=${textAsAttributeValue(value)}`;
        } else if (value !== true) {
          throw new TypeError(`unexpected attribute value type`);
        }

        return buffer;
      }).join("")
    }>${
      this.children.map((child) => {
        if (child instanceof JsxElement) {
          return child.toString({ ...opts });
        } else if (typeof child === "string") {
          return textAsChildOfTag(child, this.type);
        } else {
          throw new TypeError(`unexpected child type`);
        }
      }).join("")
    }</${this.type}>`;
  }
}
