import Configurator from "./Configurator";
import { element } from "./dom";
import Preview from "./Preview";
import { initRippleEffect } from "./Ripple";
import State, { LocalStorageState } from "./state";

export default function App() {
    const resume = new LocalStorageState<IResume>("resume", {
        picture: "",
        name: "",
        job: "",
        languages: [],
        experience: [],
        tools: [],
        education: [],
        intrests: [],
        email: "",
    });

    const app = element("div", { id: "app" }, [
        Configurator(resume),
        Preview(resume),
    ]);
    window.addEventListener("DOMContentLoaded", (e) => {
        initRippleEffect(document.body);
    });
    return app;
}
