import { assertEquals } from "jsr:@std/assert";
import { Element } from "../src/element.ts";

const P = ({ children }: {
  children?: 2;
  n: number;
}) => {
  return <p>{children}</p>;
};

Deno.test(function test() {
  assertEquals(
    (
      <>
        <P n={2}>
          hello world
        </P>

        <P n={3}>
          {[2, 3, 4]}

          <b s="string">test</b>
        </P>

        <P n={5}></P>

        <P n={6}>
          <P n={7}>a</P>
          <P n={8}>b</P>
        </P>
      </>
    ).toString(),
    `<p>hello world</p><p>234<b s=string>test</b></p><p></p><p><p>a</p><p>b</p></p>`,
  );
});

Deno.test(function test() {
  assertEquals(
    (<p
      true
      false={false}
      number={2}
      bigint={3n}
      string="string"
      two-piece="one two three"
      twos-piece="one's two's three"
      two-pieces='ones "two" three'
      null={null}
      undefined={undefined}
    >
      {2}
      {{ this: "is not type-checked I guess?" }}
      <a href="/">Hello, world!</a>
    </p>).toString(),
    `<p true number=2 bigint=3 string=string two-piece="one two three" twos-piece="one's two's three" two-pieces='ones "two" three'>2[object Object]<a href=/>Hello, world!</a></p>`,
  );
});
