export type ElementConstructor<
  Props extends object,
  Element extends HTMLElement = HTMLElement,
> = (props: Props) => Element;
