import { Element } from "@jeb/jsx";

export function AutoDarkMode(): Element {
  return (
    <style children="
      @media (prefers-color-scheme: dark) {
        :root {
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
}
