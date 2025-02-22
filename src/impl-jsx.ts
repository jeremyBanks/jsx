/**
 * @fileoverview Implement the JSX runtime interface.
 *
 * This isn't meant to be used directly, only through the JSX transform.
 */

import { unimplemented } from "jsr:@std/assert/unimplemented";

import { Jsx } from "@jeb/jsx";

type Primitive = string | boolean | number | bigint | null | undefined;

// deno-lint-ignore no-namespace
export namespace JSX {
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

export function jsx(
  type: string | ((prop: Record<string | symbol, unknown>) => Jsx),
  props: { children?: Jsx; [_: string | symbol]: unknown },
  _key?: unknown,
  _isStaticChildren?: unknown,
  _source?: unknown,
  _self?: unknown,
): Jsx {
  return jsxs(type, {
    ...props,
    children: props.children ? [props.children] : [],
  });
}

export function jsxs(
  type: string | ((prop: Record<string | symbol, unknown>) => Jsx),
  props: { children: Array<Jsx | string>; [_: string | symbol]: unknown },
  _key?: unknown,
  _isStaticChildren?: unknown,
  _source?: unknown,
  _self?: unknown,
): Jsx {
  if (typeof type === "function") {
    return type(props);
  } else {
    const { children, ...propsWithoutChildren } = props;
    return new Jsx(type, propsWithoutChildren as any, children ?? []);
  }
}

export function Fragment(props: { children: Array<Jsx | string> }): Jsx {
  return new Jsx(undefined, {}, props.children ?? []);
}

export const jsxDEV = jsx;
export const jsxsDEV = jsxs;
