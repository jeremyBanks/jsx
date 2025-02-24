import type { Element } from "@jeb/jsx";

export default (): Element => (
  <style children="
    :where(:root) {
      background-color: white;
    }
    @media (prefers-color-scheme: dark) {
      :where(:root) {
        background-color: black;

        & > * {
          filter: invert(1) hue-rotate(0.5turn);

          & img, & video {
            filter: invert(1) hue-rotate(0.5turn);
          }
        }
      }
    }
  " />
);
