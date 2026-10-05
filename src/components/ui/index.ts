/**
 * Component barrel exports
 * ─────────────────────────────────────────────────────────────
 * Import from "@/components/ui" instead of deep paths.
 *
 * Example:
 *   import { Button, Card, Badge } from "@/components/ui";
 */

export { Button }         from "./Button";
export type { ButtonProps } from "./Button";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "./Card";
export type { CardProps } from "./Card";

export { Badge }          from "./Badge";
export type { BadgeProps } from "./Badge";

export { Section }        from "./Section";
export type { SectionProps } from "./Section";

export { Divider }        from "./Divider";
export type { DividerProps } from "./Divider";

export { LottiePlayer }   from "./LottiePlayer";
export type { LottiePlayerProps } from "./LottiePlayer";

export {
  Heading,
  Text,
  Label,
  Mono,
} from "./Typography";
export type { HeadingProps, TextProps, LabelProps } from "./Typography";
