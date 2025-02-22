/**
 * @fileoverview Implement the JSX runtime interface.
 *
 * This isn't meant to be used directly, only through the JSX transform.
 */

import { unimplemented } from "jsr:@std/assert/unimplemented";

import { JsxElement } from "@jeb/jsx";

type Primitive = string | boolean | number | bigint | null | undefined;

// deno-lint-ignore no-namespace
export namespace JSX {
  /** The type of JSX expressions. */
  export type Element = JsxElement;

  /** Intrinsic (native) tag names and attributes. */
  export type IntrinsicElements = {
    [_: string]: Record<
      string,
      string | boolean | number | bigint | null | undefined
    >;
  };

  /** Props/attributes shared by all instrinsic tags. */
  export type IntrinsicAttributes = {
    children?: Array<JsxElement | string>;
  };

  /** Class components must satisfy this type. */
  export type ElementClass = never;

  /** Props/attributes shared by all class components satisfying T. */
  export type IntrinsicClassAttributes<T> = never;

  interface ElementChildrenAttribute {
    // deno-lint-ignore ban-types
    children: {};
  }
}

export function jsx(
  type: string | ((prop: Record<string | symbol, unknown>) => JsxElement),
  props: { children?: JsxElement; [_: string | symbol]: unknown },
  _key?: unknown,
  _isStaticChildren?: unknown,
  _source?: unknown,
  _self?: unknown,
): JsxElement {
  return jsxs(type, {
    ...props,
    children: props.children ? [props.children] : [],
  });
}

export function jsxs(
  type: string | ((prop: Record<string | symbol, unknown>) => JsxElement),
  props: {
    children: Array<JsxElement | string>;
    [_: string | symbol]: unknown;
  },
  _key?: unknown,
  _isStaticChildren?: unknown,
  _source?: unknown,
  _self?: unknown,
): JsxElement {
  if (typeof type === "function") {
    return type(props);
  } else {
    const { children, ...propsWithoutChildren } = props;
    return new JsxElement(
      type,
      propsWithoutChildren as any,
      children?.flat(Infinity)?.flatMap(
        (child): ReadonlyArray<string | JsxElement> => {
          if (child instanceof JsxElement) {
            return [child];
          } else if (child === null || child === undefined) {
            return [];
          } else {
            return [String(child)];
          }
        },
      ) ?? [],
    );
  }
}

export function Fragment(
  props: { children: Array<JsxElement | string> },
): JsxElement {
  return new JsxElement(undefined, {}, props.children ?? []);
}

export const jsxDEV = jsx;
export const jsxsDEV = jsxs;
