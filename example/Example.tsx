import type { Element } from "@jeb/jsx";
import CommonStyles from "./components/CommonStyles.tsx";
import HtmlInSvg from "../src/components/HtmlInSvg.tsx";

export const Circle = (_props: { children?: [] }): Element => (
  <svg
    width="100"
    height="100"
  >
    <rect
      x={25}
      y={25n}
      width="50"
      height="50"
      stroke="#123"
      stroke-width={8}
      fill="#FED"
    />
    <CommonStyles />
    <text x={50} y={50}>
      hello, world!
    </text>
    <foreignObject x="0" y="0" width="100" height="100">
      <p xmlns="http://www.w3.org/1999/xhtml">
        This is
        <hr />
        <b>html</b>.
      </p>
    </foreignObject>
  </svg>
);

const Example = (_props: { children?: [] }): Element => (
  <div class="example-root-div">
    <CommonStyles />
    <style children="
      .example-content:after {
        content: 'hello! <![CDATA[</style>]]>';
      }
    " />
    <script type="module">
      document.querySelector(".example-content").textContent = "hello, world!
      {" "}
      {">_<\\\"'/\\\\<![CDATA[</script>]]>"}
      ";
    </script>

    <div>
      <h1>Hello, world!</h1>
      <p style="font-style: italic;">
        This is an example of JSX in TypeScript.
      </p>
      <p>
        {`<![CDATA[<script>]]>`}
        <span class="example-content"></span>
      </p>
      <script type="module">console.log("hello, ]]{">"} world");</script>
      <script type="module">{`console.log("hello, ]]> </script>");`}</script>
    </div>
    <div>
      <Circle />
    </div>
    <div>
      <a href="https://validator.w3.org/nu/#textarea">validator</a>
      {" and "}
      <a href="https://validator.w3.org/#validate_by_input">validator</a>
    </div>
  </div>
);
export default Example;
