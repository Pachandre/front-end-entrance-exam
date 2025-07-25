type ILanguage = {
    id: string;
    name: string;
    level: number;
};

type IDateOrRange =
    | {
          type: "date";
          value: string;
      }
    | {
          type: "range";
          value: [string, string];
      };

type IExperience = {
    id: string;
    date: IDateOrRange;
    title: string;
    subitle: string;
    description: string[];
};

type IToolset = {
    id: string;
    title: string;
    icons: string[];
};

type IEducation = {
    id: string;
    date: IDateOrRange;
    title: string;
    tags: string[];
    place: string;
};

type IResume = {
    picture: string;
    name: string;
    job: string;
    languages: ILanguage[];
    experience: IExperience[];
    tools: IToolset[];
    education: IEducation[];
    intrests: string[];
    email: string;
};

type IOpenSections = {
    picture: boolean;
    about: boolean;
    languages: boolean;
    experience: boolean;
    toolsets: boolean;
    education: boolean;
    intrests: boolean;
    final: boolean;
};

type EmptyFunction = () => void;
type Iid = { id: string };
type Form<T extends Iid> = [HTMLElement, FormGetter<T>];
type FormGetter<T extends Iid> = () => Omit<T, "id">;
type FormCreator<T extends Iid> = (t: T) => Form<T>;
type FormSaver<T extends IId> = (newT: Omit<T, "id">) => void;
type CleanerFunction = EmptyFunction;
