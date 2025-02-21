export interface JsxStringOpts {
  indent?: string;
  existingIndent?: string;
}

export interface Jsx {
  jsx: number;
  toString(opts?: JsxStringOpts): string;
}
