export interface JsxStringOpts {
  indent?: string;
  previousIndent?: string;
  previousComponents?: Array<string | ((prop: unknown) => unknown)>;
}

class Jsx {
  constructor(
    readonly type: string | undefined,
    readonly attributes: Readonly<Record<string, string | true>>,
    readonly children: ReadonlyArray<Jsx | string>,
  ) {}

  toString(opts?: JsxStringOpts): string {
    return `<p>`;
  }
}

export type { Jsx };
