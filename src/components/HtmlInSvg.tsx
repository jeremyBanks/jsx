import type { JSX } from "@jeb/jsx/jsx-runtime";

export default (
  { children, ...props }: JSX.IntrinsicElements["foreignObject"],
): JSX.Element => (
  <foreignObject {...props}>
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      children={children}
    />
  </foreignObject>
);
