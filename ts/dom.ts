type CSSKey =
    | {
          [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends
              | string
              | number
              ? K
              : never;
      }[keyof CSSStyleDeclaration];

export function addEventListeners(
    element: Element,
    listeners: Partial<{
        [key in keyof HTMLElementEventMap]: (
            event: HTMLElementEventMap[key]
        ) => void;
    }>
) {
    for (const key in listeners) {
        element.addEventListener(
            key,
            listeners[key as keyof HTMLElementEventMap] as EventListener
        );
    }
}

export function element<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    options?: {
        id?: string;
        class?: string | string[];
        text?: string;
        style?: Partial<Pick<CSSStyleDeclaration, CSSKey>>;
        attrs?: { [key: string]: string };
        events?: Partial<{
            [key in keyof HTMLElementEventMap]: (
                event: HTMLElementEventMap[key]
            ) => void;
        }>;
    },
    children?: Element[]
) {
    const el = document.createElement(tag);
    if (options) {
        if (options.id) el.id = options.id;
        if (options.class)
            if (typeof options.class === "string")
                el.classList.add(options.class);
            else el.classList.add(...options.class);
        if (options.text) el.textContent = options.text;
        if (options.attrs)
            for (const key in options.attrs)
                el.setAttribute(key, options.attrs[key]);
        if (options.events)
            for (const key in options.events) {
                el.addEventListener(
                    key,
                    options.events[
                        key as keyof HTMLElementEventMap
                    ] as EventListener
                );
            }
        if (options.style)
            for (const key in options.style) {
                const value = options.style[key];
                if (value !== undefined) el.style[key] = value;
            }
    }
    if (children) el.append(...children);
    return el;
}
