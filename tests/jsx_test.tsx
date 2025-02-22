import { assertEquals } from "jsr:@std/assert";
import { Jsx } from "@jeb/jsx";

const P = ({ children }: {
  children?: Jsx;
  n: number;
}) => {
  return <p>{children}</p>;
};

Deno.test(function test() {
  const _instrinicText = <b>hello, world!</b>;
  const _fragmentText = <>hello,world!</>;

  const instrinicP = (
    <p
      true
      false={false}
      number={2}
      bigint={3n}
      string="string"
      null={null}
      undefined={undefined}
    >
      <a href="/">Hello, world!</a>
    </p>
  );

  const ourP = (
    <>
      <P n={2}>
        hello world
      </P>

      <P n={3}>
        {[2, 3, 4]}

        <b>test</b>
      </P>

      <P n={5}></P>

      <P n={6}>
        <P n={7}>a</P>
        <P n={8}>b</P>
      </P>
    </>
  );

  assertEquals(ourP.toString(), "<b>hello, world!</b>");
});
