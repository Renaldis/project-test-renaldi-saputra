declare module "react-parallax" {
  import type { ReactNode } from "react";

  interface ParallaxProps {
    bgImage?: string;
    strength?: number;
    bgImageAlt?: string;
    bgClassName?: string;
    className?: string;
    contentClassName?: string;
    children?: ReactNode;
  }

  export function Parallax(props: ParallaxProps): JSX.Element;
}
