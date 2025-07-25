import { element } from "./dom";

function findAndInitRipple(node: Node) {
    if (node instanceof HTMLElement && node.classList.contains("ripple")) {
        initRipple(node);
    }
    node.childNodes.forEach((node) => findAndInitRipple(node));
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(findAndInitRipple);
    });
});

function createRippleCircle(el: HTMLElement, e: MouseEvent) {
    const ripple = element("div", { class: "ripple-bg" });
    ripple.style.width = 50 + "px";
    ripple.style.height = 50 + "px";
    const { top, left, width, height } = el.getBoundingClientRect();
    const r = Math.sqrt(width * width + height * height) * 2;
    ripple.style.width = r + "px";
    ripple.style.height = r + "px";
    const x = e.clientX - left;
    const y = e.clientY - top;
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    el.append(ripple);
    return ripple;
}

function initRipple(el: HTMLElement) {
    el.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        const ripple = createRippleCircle(el, e);
        let pointerdown = true;
        let grown = false;

        const disappear = () => {
            ripple.removeEventListener("animationend", onGrown);
            ripple.classList.add("fade-out");
            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        };

        const onGrown = () => {
            grown = true;
            if (!pointerdown) disappear();
        };

        const onPointerUp = () => {
            pointerdown = false;
            if (grown) disappear();
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
        };

        ripple.addEventListener("animationend", onGrown);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
    });
}

export function initRippleEffect(root: HTMLElement) {
    root.querySelectorAll(".ripple").forEach((el) => {
        if (el instanceof HTMLElement) initRipple(el);
    });
    observer.observe(root, {
        subtree: true,
        childList: true,
    });
}

export default function Ripple<T extends HTMLElement>(el: T): T {
    el.classList.add("ripple");
    return el;
}
