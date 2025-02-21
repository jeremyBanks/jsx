/**
 * @fileoverview Implement the JSX runtime interface.
 *
 * This isn't meant to be used directly, only through the JSX transform.
 */

import { unimplemented } from "jsr:@std/assert/unimplemented";

import type { Jsx } from "@jeb/jsx";

type Primitive = string | boolean | number | bigint | null | undefined;

// deno-lint-ignore no-namespace
export namespace JSX {
  /** Allowed JSX component/reciever types. */
  // export type ElementType =
  //   | keyof IntrinsicElements
  //   | ((props: Record<string | number | symbol, unknown>) => Jsx | Primitive);

  /** The type of JSX expressions. */
  export type Element = Jsx;

  /** Intrinsic (native) tag names and attributes. */
  export type IntrinsicElements = {
    [_: string]: Record<
      string,
      string | boolean | number | bigint | null | undefined
    >;
  };

  /** Props/attributes shared by all instrinsic tags. */
  export type IntrinsicAttributes = {
    children?: Jsx | string;
  };

  /** Class components must satisfy this type. */
  export type ElementClass = never;

  /** Props/attributes shared by all class components satisfying T. */
  export type IntrinsicClassAttributes<T> = never;

  type _ElementAttributesProperty = "default";
  type _ElementChildrenAttribute = "default";
}

export function jsx<
  Prop extends Record<string | symbol, unknown>,
  Component extends string | ((prop: Prop) => string),
>(
  type: Component,
  props: Prop,
  _key?: unknown,
  _isStaticChildren?: unknown,
  _source?: unknown,
  _self?: unknown,
) {
  if (typeof type === "function") {
    return type(props);
  } else {
    return `<${type} />`;
    unimplemented();
  }
}

export const jsxs = jsx;
export const jsxDEV = jsx;
export const jsxsDEV = jsx;

export { Fragment } from "./model.tsx";
