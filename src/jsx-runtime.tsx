import type { JSX as ReactJSX } from "npm:@types/react/jsx-runtime";
import { Element } from "@jeb/jsx";

export function jsx(type: any, props: any): Element {
  return new Element(type, props);
}
export function jsxs(type: any, props: any) {
  return jsx(type, props);
}

export function jsxDEV(type: any, props: any, key: any, isStaticChildren: any, source: any, self: any) {
  return jsx(type, props);
};
export function jsxsDEV(type: any, props: any, key: any, isStaticChildren: any, source: any, self: any) {
  return jsx(type, props);
}

export function createElement() {
  throw new Error("not implemented");
}

type ExportedElement = Element;

// deno-lint-ignore no-namespace
export namespace JSX {
  export type Element = ExportedElement;
  export type ElementType = Element | keyof IntrinsicElements;
  export type ElementClass = {};
  export type IntrinsicElements = ReactJSX.IntrinsicElements;
}
