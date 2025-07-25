import { element } from "./dom";
import State from "./state";

function Tag(tag: string, remove: (el: HTMLElement) => void) {
    const el = element("button", {
        class: "tag",
        text: tag,
        events: {
            click() {
                remove(el);
            },
        },
    });
    return el;
}

export default function TagView(tags: State<string[]>) {
    const input = element("input", {
        class: "input",
        attrs: { placeholder: "Press Enter to add" },
    });
    const form = element(
        "form",
        {
            style: {
                display: "contents",
            },
            events: {
                submit(e) {
                    e.preventDefault();
                    addTagFromInput();
                },
            },
        },
        [input]
    );
    const removeTag = (tag: string) => (el: HTMLElement) => {
        el.remove();
        tags.update((val) => val.toSpliced(val.indexOf(tag), 1));
    };
    const addTag = (tag: string) => {
        if (tags.value.includes(tag)) return;
        tags.update((val) => [...val, tag]);
        tagContainer.append(Tag(tag, removeTag(tag)));
    };
    const addTagFromInput = () => {
        const tag = input.value.trim();
        if (tag === "") return;
        addTag(tag);
        input.value = "";
    };
    const tagContainer = element("div", { class: "container" });
    tagContainer.append(...tags.value.map((tag) => Tag(tag, removeTag(tag))));
    input.addEventListener("keydown", (e) => {
        if (e.code != "Enter") return;
        e.preventDefault();
        addTagFromInput();
    });

    return element("div", { class: "tag-view" }, [form, tagContainer]);
}
