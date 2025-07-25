import { element } from "./dom";
import ExportButton from "./ExportButton";
import Resume from "./Resume";
import Ripple from "./Ripple";
import { effect, LocalStorageState } from "./state";
function toScale(t) {
    return Math.pow(10, t);
}
function clamp(min, value, max) {
    return Math.max(min, Math.min(value, max));
}
function Scaler(state) {
    const add = (v) => {
        state.update((a) => clamp(-0.6, a + v, 0.6));
    };
    const dec = element("button", {
        class: "button",
        text: "-",
        events: {
            click() {
                add(-0.1);
            },
        },
    });
    const scaleText = element("span", { class: "text" });
    const val = element("button", {
        class: "value",
        events: {
            click() {
                state.update(() => 0);
            },
        },
    }, [scaleText]);
    const inc = element("button", {
        class: "button",
        text: "+",
        events: {
            click() {
                add(0.1);
            },
        },
    });
    effect(() => {
        scaleText.textContent =
            (toScale(state.value) * 100).toFixed(0) + "%";
        dec.disabled = state.value <= -0.6;
        inc.disabled = state.value >= 0.6;
    }, { deps: [state], immediate: true });
    return element("div", { id: "scaler" }, [
        Ripple(dec),
        Ripple(val),
        Ripple(inc),
    ]);
}
function Controls(scale) {
    return element("div", { id: "resume-controls" }, [
        element("div", { class: "left" }, [Scaler(scale)]),
        element("div", { class: "right" }, [ExportButton()]),
    ]);
}
export default function Preview(resume) {
    const scale = new LocalStorageState("resume-scale", 0);
    let resumeElement = Resume(resume.value);
    const transform = element("div", { class: "transform" }, [resumeElement]);
    effect(() => (transform.style.scale = toScale(scale.value).toString()), {
        deps: [scale],
        immediate: true,
    });
    const updateResume = (newResume) => {
        const newElement = Resume(newResume);
        resumeElement.replaceWith(newElement);
        resumeElement = newElement;
    };
    resume.listen(() => updateResume(resume.value));
    return element("div", { id: "preview" }, [
        Controls(scale),
        element("div", { id: "resume-container" }, [transform]),
    ]);
}
