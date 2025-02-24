import type { Element } from "@jeb/jsx";
import AutoDarkMode from "./AutoDarkMode.tsx";

export default (): Element => (
  <>
    <AutoDarkMode />

    <style children="
      :where(:root) {
        font-family: system-ui, sans-serif;
      }
    " />
  </>
);
