import { unimplemented } from "jsr:@std/assert/unimplemented";

export const Fragment = (_props: unknown) => {};

export class DomNode {
  constructor(
    readonly name: string,
    readonly attributes: Record<string, string>,
    readonly children: Array<DomNode | string | Html | Css | Javascript>,
  ) {}

  static #defaultOpts = {
    existingIndent: "",
  };

  toString(opts = DomNode.#defaultOpts) {
  }
}

export class Html {
  private constructor(readonly html: string) {}

  static raw(...parts: Array<Html | string>): Html {
    return new Html(
      parts
        .map((part) => typeof part === "string" ? part : part.html)
        .join(""),
    );
  }
}

export class Css {
  private constructor(readonly css: string) {}

  static raw(...parts: Array<Css | string>): Css {
    return new Css(
      parts
        .map((part) => typeof part === "string" ? part : part.css)
        .join(""),
    );
  }

  static number(number: number | bigint): Css {
    if (Number.isFinite(number) || typeof number === "bigint") {
      return new Css(number.toString());
    }
    throw new Error(`expected finite number or bigint, got ${number}`);
  }

  static string(text: string): Css {
    unimplemented();
  }

  static stringBody(text: string): Css {
    unimplemented();
  }

  static identifier(identifier: string): Css {
    unimplemented();
  }
}

export class Javascript {
  private constructor(readonly javascript: string) {}

  static raw(...parts: Array<Javascript | string>): Javascript {
    return new Javascript(
      parts
        .map((part) => typeof part === "string" ? part : part.javascript)
        .join(""),
    );
  }

  static number(number: number | bigint) {
    return new Javascript(String(number));
  }

  static string(text: string): Css {
    unimplemented();
  }

  static stringBody(text: string): Css {
    unimplemented();
  }

  static identifier(identifier: string): Css {
    unimplemented();
  }
}
