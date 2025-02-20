import { assertEquals } from "jsr:@std/assert";

Deno.test(function test() {
  assertEquals((<b>hello,  world!</b>).toString(), "<b>hello, world!</b>");
});

