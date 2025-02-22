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
    return `${
      this.type
        ? `<${this.type}${
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
        }>`
        : ""
    }${
      this.children.map((child) => {
        if (child instanceof JsxElement) {
          return child.toString({ ...opts });
        } else if (typeof child === "string") {
          return textAsChildOfTag(child, this.type);
        } else {
          throw new TypeError(`unexpected child type`);
        }
      }).join("")
    }${this.type ? `<${this.type}>` : ""}`;
  }
}
