/**
 * @fileoverview Implement the JSX runtime interface.
 *
 * This isn't meant to be used directly, only through the JSX transform.
 */

import { Element } from "@jeb/jsx";

type Primitive = string | boolean | number | bigint | null | undefined;

type ElementType = Element;

// deno-lint-ignore no-namespace
export namespace JSX {
  /** The type of JSX expressions. */
  export type Element = ElementType;

  /** Intrinsic (native) tag names and attributes. */
  export type IntrinsicElements = {
    [_: string]: Record<
      string,
      string | boolean | number | bigint | null | undefined
    >;
  };

  /** Props/attributes shared by all instrinsic tags. */
  export type IntrinsicAttributes = {
    children?: Array<Element | string>;
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
  type: string | ((prop: Record<string | symbol, unknown>) => Element),
  props: { children?: Element; [_: string | symbol]: unknown },
  _key?: unknown,
  _isStaticChildren?: unknown,
  _source?: unknown,
  _self?: unknown,
): Element {
  return jsxs(type, {
    ...props,
    children: props.children ? [props.children] : [],
  });
}

export function jsxs(
  type: string | ((prop: Record<string | symbol, unknown>) => Element),
  props: {
    children: Array<Element | string>;
    [_: string | symbol]: unknown;
  },
  _key?: unknown,
  _isStaticChildren?: unknown,
  _source?: unknown,
  _self?: unknown,
): Element {
  if (typeof type === "function") {
    return type(props);
  } else {
    const { children, ...propsWithoutChildren } = props;
    return new Element(
      type,
      Object.fromEntries(
        Object.entries(propsWithoutChildren).flatMap(
          ([key, value]) => {
            if (value === true || typeof value === "string") {
              return [[key, value]];
            } else if (
              value === undefined || value === null || value === false
            ) {
              return [];
            } else {
              return [[key, String(value)]];
            }
          },
        ),
      ),
      children?.flat(Infinity)?.flatMap(
        (child): ReadonlyArray<string | Element> => {
          if (child instanceof Element) {
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
  props: { children: Array<Element | string> },
): Element {
  return new Element(undefined, {}, props.children ?? []);
}

export const jsxDEV = jsx;
export const jsxsDEV = jsxs;
