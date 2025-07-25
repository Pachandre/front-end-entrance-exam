import { element } from "./dom";
import Ripple from "./Ripple";
import { InnerState, LocalStorageState } from "./state";
import StateTagView from "./TagView";
import { uuidV4 } from "./utils";
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}
function Section(opened, name, title, children) {
    const el = element("details", {
        class: ["section", name],
        events: {
            toggle() {
                opened.update(() => el.open);
            },
        },
    }, [
        element("summary", { class: "title", text: title }),
        element("div", { class: "container" }, children),
    ]);
    el.open = opened.value;
    return el;
}
function Input(state, options) {
    const el = element("input", {
        class: "input",
        attrs: { type: options.type ?? "text" },
    });
    if (options.placeholder)
        el.placeholder = options.placeholder;
    el.value = state.value;
    el.addEventListener("input", (e) => {
        state.update(() => el.value);
    });
    return el;
}
const MAX_PICTURE_SIZE = 5000000;
const MAX_PICTURE_SIZE_HUMAN = "5mb";
const MAX_ICON_SIZE = 1000000;
const MAX_ICON_SIZE_HUMAN = "1mb";
function ImageInput(state, id) {
    const loadFile = (file) => {
        if (!file.type.startsWith("image/")) {
            input.value = "";
            state.update(() => "");
            return;
        }
        if (file.size > MAX_PICTURE_SIZE) {
            alert(`Maximum allowed picture size: ${MAX_PICTURE_SIZE_HUMAN}`);
            return;
        }
        fileToBase64(file).then((str) => {
            state.update(() => str);
        });
    };
    const input = element("input", {
        class: "input",
        id,
        attrs: { type: "file" },
        events: {
            change() {
                const files = input.files;
                if (files === null)
                    return;
                loadFile(files[0]);
            },
        },
    });
    const label = element("label", { class: "label", attrs: { for: id } }, [
        input,
        element("span", { class: "text" }, [
            element("button", {
                class: "select",
                text: "Select",
                events: {
                    click() {
                        input.click();
                    },
                },
            }),
            element("span", { text: " or drop" }),
        ]),
    ]);
    const preview = element("img", {
        class: "preview",
    });
    if (state.value !== "")
        preview.src = state.value;
    state.listen((val) => val !== "" ? (preview.src = val) : preview.removeAttribute("src"));
    const view = element("div", { class: "image-view" }, [label, preview]);
    let drag = 0;
    window.addEventListener("dragenter", (e) => {
        e.preventDefault();
        ++drag;
        view.classList.toggle("dropping", true);
    });
    window.addEventListener("dragleave", (e) => {
        e.preventDefault();
        --drag;
        if (drag === 0)
            view.classList.toggle("dropping", false);
    });
    window.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (drag === 0)
            view.classList.toggle("dropping", false);
    });
    label.addEventListener("drop", (e) => {
        e.preventDefault();
        view.classList.toggle("dropping", false);
        drag = 0;
        const dt = e.dataTransfer;
        console.log(dt);
        if (dt === null)
            return;
        const files = dt.files;
        if (files.length === 1) {
            loadFile(files[0]);
        }
        else if (dt.items[0].kind === "string" &&
            dt.items[0].type.toLowerCase().includes("url")) {
            dt.items[0].getAsString((str) => {
                state.update(() => str);
            });
        }
    });
    return view;
}
function Listed(name, state, itemFactory, elementFactory, form) {
    const list = element("ul", { class: "list" });
    const createElement = (t) => {
        const [inner, cleanElement] = elementFactory(t);
        const remove = element("button", {
            class: "remove-btn",
            text: "-",
            events: {
                click() {
                    if (cleanElement)
                        cleanElement();
                    state.update((s) => s.filter((v) => v.id !== t.id));
                    li.remove();
                },
            },
        });
        inner.classList.add("inner");
        const li = element("li", { class: "item" }, [Ripple(remove), inner]);
        return li;
    };
    const addItem = () => {
        const t = itemFactory();
        state.update((s) => [...s, t]);
        list.append(createElement(t));
        return t;
    };
    const addButton = element("button", {
        class: "add-btn",
        text: "+",
        events: {
            click() {
                const t = addItem();
                if (form?.creator)
                    openDialog(t, form.creator, form.saverFactory(t));
            },
        },
    });
    list.append(...state.value.map(createElement));
    return element("div", { class: ["list-view", name] }, [
        list,
        Ripple(addButton),
    ]);
}
function openDialog(t, creator, save) {
    const [form, get] = creator(t);
    const closeDialog = () => {
        overlay.remove();
        form.innerHTML = "";
    };
    const saveButton = element("button", {
        class: "save-btn",
        text: "Save",
        events: {
            click() {
                save(get());
                closeDialog();
            },
        },
    });
    const closeButton = element("button", {
        class: "close-btn",
        text: "Close",
        events: { click: closeDialog },
    });
    const buttons = element("div", { class: "buttons" }, [
        Ripple(closeButton),
        Ripple(saveButton),
    ]);
    const dialog = element("div", { class: "dialog" }, [form, buttons]);
    const overlay = element("div", { id: "overlay" }, [dialog]);
    document.body.append(overlay);
}
function EditButton(state, id, creator) {
    return Ripple(element("button", {
        class: "edit-btn",
        events: {
            click() {
                openDialog(state.value.find((t) => t.id === id), creator, (newT) => {
                    state.update((s) => s.map((v) => v.id === id
                        ? {
                            ...v,
                            ...newT,
                        }
                        : v));
                });
            },
        },
    }, [element("img", { attrs: { src: "/edit.svg" } })]));
}
const Languages = (state) => Listed("languages", state, () => ({
    id: uuidV4(),
    level: 1,
    name: "",
}), (t) => {
    const select = element("select", {
        class: "level",
        events: {
            change() {
                state.update((v) => {
                    const idx = parseInt(select.value);
                    return v.map((l) => l.id === t.id ? { ...l, level: idx } : l);
                });
            },
        },
        attrs: { value: t.level.toString() },
    }, Array.from({ length: 5 }, (_, idx) => {
        const opt = element("option", {
            text: `${idx + 1}`,
            attrs: { value: (idx + 1).toString() },
        });
        if (t.level === idx + 1)
            opt.selected = true;
        return opt;
    }));
    const input = element("input", {
        class: "name",
        attrs: { type: "text", value: t.name },
        events: {
            input() {
                state.update((langs) => langs.map((l) => l.id === t.id ? { ...l, name: input.value } : l));
            },
        },
    });
    return [element("div", { class: "language" }, [input, select])];
});
const ListedEditables = (name, state, itemFactory, mainKey, creator) => Listed(name, state, itemFactory, (t) => {
    const span = element("span", {
        class: "title",
        text: state.value.find((v) => v.id === t.id)[mainKey],
    });
    const listener = (s) => {
        console.log("bebra");
        span.textContent = s.find((v) => v.id === t.id)[mainKey];
    };
    state.listen(listener);
    const cleaner = () => state.unlisten(listener);
    return [
        element("div", {}, [span, EditButton(state, t.id, creator)]),
        cleaner,
    ];
}, {
    creator,
    saverFactory: (t) => (newT) => {
        state.update((s) => s.map((v) => (v.id === t.id ? { ...v, ...newT } : v)));
    },
});
function TextInput(_class, value) {
    const el = element("input", {
        class: ["input", _class],
        attrs: { type: "text" },
    });
    if (value)
        el.value = value;
    return el;
}
function Titled(title, ...children) {
    return element("div", { class: "titled-input" }, [
        element("span", {
            class: "title",
            text: title,
        }),
        element("div", { class: "inner" }, children),
    ]);
}
function DateView(d) {
    const type = element("select", { class: ["select", "input"] }, [
        element("option", {
            text: "Date",
            attrs: { value: "date", selected: "" },
        }),
        element("option", { text: "Range", attrs: { value: "range" } }),
    ]);
    type.value = d.type;
    const from = TextInput("date-from", d.type === "date" ? d.value : d.value[0]);
    const to = TextInput("date-to", d.type === "date" ? "" : d.value[1]);
    to.classList.toggle("hidden", type.value === "date");
    type.addEventListener("change", (e) => to.classList.toggle("hidden", type.value === "date"));
    const get = () => {
        const t = type.value === "range" ? "range" : "date";
        const date = t === "date"
            ? {
                type: "date",
                value: from.value,
            }
            : {
                type: "range",
                value: [from.value, to.value],
            };
        return date;
    };
    const titled = Titled("Date", type, from, to);
    titled.classList.add("date-view");
    return [titled, get];
}
function Tag(tag, remove) {
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
function TagView(_tags) {
    const input = element("input", {
        class: "input",
        attrs: { placeholder: "Press Enter to add" },
    });
    const form = element("form", {
        style: { display: "contents" },
        events: {
            submit(e) {
                e.preventDefault();
                addTagFromInput();
            },
        },
    }, [input]);
    const tags = new Set(_tags);
    const removeTag = (tag) => (el) => {
        el.remove();
        tags.delete(tag);
    };
    const addTag = (tag) => {
        if (tags.has(tag))
            return;
        tags.add(tag);
        tagContainer.append(Tag(tag, removeTag(tag)));
    };
    const addTagFromInput = () => {
        const tag = input.value.trim();
        if (tag === "")
            return;
        addTag(tag);
        input.value = "";
    };
    const tagContainer = element("div", { class: "container" });
    tagContainer.append(..._tags.map((tag) => Tag(tag, removeTag(tag))));
    input.addEventListener("keydown", (e) => {
        if (e.code != "Enter")
            return;
        e.preventDefault();
        addTagFromInput();
    });
    return [
        element("div", { class: "tag-view" }, [form, tagContainer]),
        () => Array.from(tags),
    ];
}
function ExperienceForm(t) {
    const [date, getDate] = DateView(t.date);
    const titleInput = TextInput("title", t.title);
    const title = Titled("Title", titleInput);
    const subtitleInput = TextInput("subtitle", t.subitle);
    const subtitle = Titled("Subtitle", subtitleInput);
    const [descriptionView, getDescription] = TagView(t.description);
    const description = Titled("About", descriptionView);
    const get = () => {
        const experience = {
            date: getDate(),
            title: titleInput.value,
            subitle: subtitleInput.value,
            description: getDescription(),
        };
        return experience;
    };
    const form = element("div", { class: ["form", "experience"] }, [
        date,
        title,
        subtitle,
        description,
    ]);
    return [form, get];
}
const Experience = (state) => ListedEditables("experience", state, () => ({
    id: uuidV4(),
    date: {
        type: "date",
        value: "",
    },
    title: "",
    subitle: "",
    description: [],
}), "title", (t) => ExperienceForm(t));
function IconsView(_icons) {
    const iconsContainer = element("div", { class: "container" });
    const icons = new Set();
    const add = (src) => {
        if (icons.has(src))
            return;
        icons.add(src);
        iconsContainer.append(element("img", { class: "icon", attrs: { src } }));
    };
    _icons.forEach(add);
    const fileInput = element("input", {
        class: "input",
        attrs: { type: "file", accept: "image/*" },
        events: {
            change() {
                const files = fileInput.files;
                if (!files)
                    return;
                for (let i = 0; i < files.length; ++i) {
                    const file = files[i];
                    console.log(file.name, file.type);
                    if (!file.type.startsWith("image/"))
                        continue;
                    if (file.size > MAX_ICON_SIZE) {
                        alert(`Maximum allowed icon size: ${MAX_ICON_SIZE_HUMAN}`);
                        continue;
                    }
                    fileToBase64(file).then(add);
                }
            },
        },
    });
    fileInput.multiple = true;
    const addIcon = Ripple(element("button", {
        text: "+",
        class: "add-btn",
        events: {
            click() {
                fileInput.click();
            },
        },
    }, [fileInput]));
    const get = () => Array.from(iconsContainer.querySelectorAll("img")).map((img) => img.src);
    return [
        element("div", { class: "icons-view" }, [iconsContainer, addIcon]),
        get,
    ];
}
function ToolsetForm(t) {
    const titleInput = TextInput("title", t.title);
    const title = Titled("Title", titleInput);
    const [iconsView, getIcons] = IconsView(t.icons);
    const icons = Titled("Icons", iconsView);
    const get = () => {
        return {
            title: titleInput.value,
            icons: getIcons(),
        };
    };
    const form = element("div", { class: ["form", "toolset"] }, [title, icons]);
    return [form, get];
}
const Toolsets = (state) => ListedEditables("toolsets", state, () => ({
    id: uuidV4(),
    title: "",
    icons: [],
}), "title", (t) => ToolsetForm(t));
function EducationForm(t) {
    const [date, getDate] = DateView(t.date);
    const titleInput = TextInput("title", t.title);
    const title = Titled("Title", titleInput);
    const placeInput = TextInput("place", t.place);
    const place = Titled("Place", placeInput);
    const tagsContainer = element("div", {
        class: "tags-container",
    });
    const addTag = (s) => {
        tagsContainer.append(TextInput("line", s));
    };
    t.tags.forEach(addTag);
    const [tagView, getTags] = TagView(t.tags);
    const tags = Titled("Tags", tagView);
    const form = element("div", { class: ["form", "education"] }, [
        date,
        title,
        place,
        tags,
    ]);
    const get = () => {
        const education = {
            date: getDate(),
            title: titleInput.value,
            tags: getTags(),
            place: placeInput.value,
        };
        return education;
    };
    return [form, get];
}
const Education = (state) => ListedEditables("education", state, () => ({
    id: uuidV4(),
    date: {
        type: "date",
        value: "",
    },
    title: "",
    tags: [],
    place: "",
}), "title", (t) => EducationForm(t));
export default function Configurator(resume) {
    const openState = new LocalStorageState("open-sections", {
        picture: false,
        about: false,
        languages: false,
        experience: false,
        toolsets: false,
        education: false,
        intrests: false,
        final: false,
    });
    const picture = new InnerState(resume, "picture");
    const name = new InnerState(resume, "name");
    const job = new InnerState(resume, "job");
    const languages = new InnerState(resume, "languages");
    const experience = new InnerState(resume, "experience");
    const toolsets = new InnerState(resume, "tools");
    const education = new InnerState(resume, "education");
    const intrests = new InnerState(resume, "intrests");
    const email = new InnerState(resume, "email");
    return element("aside", { id: "configurator" }, [
        element("h1", { class: "title", text: "Your resume" }),
        Section(new InnerState(openState, "picture"), "picture", "Picture", [
            ImageInput(picture, "avatar"),
        ]),
        Section(new InnerState(openState, "about"), "about", "About you", [
            Input(name, { placeholder: "Your name" }),
            Input(job, { placeholder: "Your position" }),
        ]),
        Section(new InnerState(openState, "languages"), "languages", "Languages", [Languages(languages)]),
        Section(new InnerState(openState, "experience"), "experience", "Experience", [Experience(experience)]),
        Section(new InnerState(openState, "toolsets"), "toolsets", "Tools", [
            Toolsets(toolsets),
        ]),
        Section(new InnerState(openState, "education"), "education", "Education", [Education(education)]),
        Section(new InnerState(openState, "intrests"), "intrests", "Intrests", [
            StateTagView(intrests),
        ]),
        Section(new InnerState(openState, "final"), "final", "Email", [
            Input(email, { type: "email", placeholder: "Your email" }),
        ]),
    ]);
}
