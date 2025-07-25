import { element } from "./dom";
function dateToString(date) {
    return date.type === "date"
        ? `${date.value}`
        : `${date.value[0]} - ${date.value[1]}`;
}
function Section(id, children) {
    return element("section", { id, class: "section" }, children);
}
function SectionTitle(text) {
    return element("h1", { text, class: "title" });
}
function Language(lang) {
    return element("div", { class: "language" }, [
        element("span", { text: lang.name, class: "name" }),
        element("div", { class: "level" }, [
            element("div", {
                class: "progress",
                style: {
                    width: (lang.level / 5) * 100 + "%",
                },
            }),
        ]),
    ]);
}
function Toolset(tool) {
    return element("div", { class: "toolset" }, [
        element("h2", { class: "title", text: tool.title }),
        ...tool.icons.map((icn) => element("img", { class: "icon", attrs: { src: icn } })),
    ]);
}
function Experience(exp, mostRecent) {
    const dateContainer = element("div", { class: "date-container" }, [
        element("span", {
            text: dateToString(exp.date),
            class: "date",
        }),
    ]);
    if (mostRecent)
        dateContainer.append(element("span", { class: "badge", text: "most recent" }));
    const el = element("div", { class: "experience" }, [
        dateContainer,
        element("div", { class: "text-container" }, [
            element("div", { class: "left" }, [
                element("h3", { text: exp.title, class: "title" }),
                element("h4", { text: exp.subitle, class: "subtitle" }),
            ]),
            element("div", { class: "right" }, [
                element("ul", { class: "description" }, exp.description.map((line) => element("li", { text: line }))),
            ]),
        ]),
    ]);
    if (mostRecent)
        el.classList.add("most-recent");
    return el;
}
function Education(edu, mostRecent) {
    const dateContainer = element("div", { class: "date-container" }, [
        element("span", {
            text: dateToString(edu.date),
            class: "date",
        }),
    ]);
    if (mostRecent)
        dateContainer.append(element("img", {
            class: "heart",
            attrs: { src: "/heart.svg" },
        }));
    const el = element("div", { class: "education" }, [
        dateContainer,
        element("div", { class: "main-container" }, [
            element("h3", { text: edu.title, class: "title" }),
            element("div", { class: "tags" }, edu.tags.map((tag) => element("span", { text: `#${tag}` }))),
        ]),
        element("span", { text: edu.place, class: "place" }),
    ]);
    if (mostRecent)
        el.classList.add("most-recent");
    return el;
}
function Intrests(intrests) {
    return element("div", { class: "intrests" }, intrests.map((int) => element("span", { class: "intrest", text: int })));
}
export default function Resume(resume) {
    const picture = element("section", { id: "picture" });
    {
        const img = element("img", { class: "image" });
        if (resume.picture !== "")
            img.src = resume.picture;
        picture.append(img);
    }
    const about = Section("about", [
        element("span", { text: "Hello 👋 I'm" }),
        element("div", { class: "container" }, [
            element("span", { class: "title", text: resume.name }),
            element("span", { class: "subtitle", text: resume.job }),
        ]),
    ]);
    const languages = Section("languages", [
        SectionTitle("Languages"),
        element("div", { class: "container" }, resume.languages.map((lang) => Language(lang))),
    ]);
    const experience = Section("experience", [
        SectionTitle("Experience"),
        element("div", { class: "container" }, resume.experience.map((exp, idx) => Experience(exp, idx === 0))),
    ]);
    const tools = Section("tools", [
        SectionTitle("Tools"),
        element("div", { class: "container" }, resume.tools.map((toolset) => Toolset(toolset))),
    ]);
    const education = Section("education", [
        SectionTitle("Education"),
        element("div", { class: "container" }, resume.education.map((edu, idx) => Education(edu, idx === 0))),
    ]);
    const intrests = Section("intrests", [
        SectionTitle("Intrests"),
        Intrests(resume.intrests),
    ]);
    const final = Section("final", [
        SectionTitle("Let´s chat! I´m ready to work on excinting projects"),
        element("span", { text: resume.email, class: "text" }),
    ]);
    return element("div", { id: "resume" }, [
        picture,
        about,
        languages,
        experience,
        tools,
        education,
        intrests,
        final,
    ]);
}
