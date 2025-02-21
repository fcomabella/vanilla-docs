export type ElementConstructor<
  Props extends object = Record<string, never>,
  Element extends HTMLElement = HTMLElement,
> = (props: Props) => Element;
