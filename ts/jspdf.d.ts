interface Annotation {
    type: "text" | "freetext" | "link";
    title?: string;
    bounds: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    contents: string;
    open?: boolean;
    color?: string;
    name?: string;
    top?: number;
    pageNumber?: number;
}

interface TextWithLinkOptions {
    pageNumber?: number;
    magFactor?: "Fit" | "FitH" | "FitV" | "XYZ";
    zoom?: number;
}

//jsPDF plugin:AutoPrint

interface AutoPrintInput {
    variant: "non-conform" | "javascript";
}

//jsPDF plugn: HTML
interface Html2CanvasOptions {
    /** Whether to parse and render the element asynchronously */
    async?: boolean;

    /** Whether to allow cross-origin images to taint the canvas */
    allowTaint?: boolean;

    /** Canvas background color, if none is specified in DOM. Set null for transparent */
    backgroundColor?: string | null;

    /** Existing canvas element to use as a base for drawing on */
    canvas?: any;

    /** Whether to use ForeignObject rendering if the browser supports it */
    foreignObjectRendering?: boolean;

    /** Predicate function which removes the matching elements from the render. */
    ignoreElements?: (element: HTMLElement) => boolean;

    /** Timeout for loading images, in milliseconds. Setting it to 0 will result in no timeout. */
    imageTimeout?: number;

    /** Whether to render each letter seperately. Necessary if letter-spacing is used. */
    letterRendering?: boolean;

    /** Whether to log events in the console. */
    logging?: boolean;

    /** Callback function which is called when the Document has been cloned for rendering, can be used to modify the contents that will be rendered without affecting the original source document. */
    onclone?: { (doc: HTMLDocument): void };

    /** Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won't be loaded. */
    proxy?: string;

    /** Whether to cleanup the cloned DOM elements html2canvas creates temporarily */
    removeContainer?: boolean;

    /** The scale to use for rendering. Defaults to the browsers device pixel ratio. */
    scale?: number;

    /** Use svg powered rendering where available (FF11+). */
    svgRendering?: boolean;

    /** Whether to test each image if it taints the canvas before drawing them */
    taintTest?: boolean;

    /** Whether to attempt to load cross-origin images as CORS served, before reverting back to proxy. */
    useCORS?: boolean;

    /** Define the width of the canvas in pixels. If null, renders with full width of the window. */
    width?: number;

    /** Define the heigt of the canvas in pixels. If null, renders with full height of the window. */
    height?: number;

    /** Crop canvas x-coordinate */
    x?: number;

    /** Crop canvas y-coordinate */
    y?: number;

    /** The x-scroll position to used when rendering element, (for example if the Element uses position: fixed ) */
    scrollX?: number;

    /** The y-scroll position to used when rendering element, (for example if the Element uses position: fixed ) */
    scrollY?: number;

    /** Window width to use when rendering Element, which may affect things like Media queries */
    windowWidth?: number;

    /** Window height to use when rendering Element, which may affect things like Media queries */
    windowHeight?: number;
}

interface HTMLWorkerProgress extends Promise<any> {
    val: number;
    n: number;
    ratio: number;
    state: any;
    stack: Function[];
}

interface HTMLWorker extends Promise<any> {
    from(
        src: HTMLElement | string,
        type: "container" | "canvas" | "img" | "pdf" | "context2d"
    ): HTMLWorker;
    progress: HTMLWorkerProgress;
    error(msg: string): void;
    save(filename: string): Promise<void>;
    set(opt: HTMLOptions): HTMLWorker;
    get(key: "string"): HTMLWorker;
    get(key: "string", cbk: (value: string) => void): string;
    doCallback(): Promise<void>;
    outputImg(
        type: "img" | "datauristring" | "dataurlstring" | "datauri" | "dataurl"
    ): Promise<string>;
    outputPdf: jsPDF["output"];
}

interface HTMLOptionImage {
    type: "jpeg" | "png" | "webp";
    quality: number;
}

interface HTMLFontFace {
    family: string;
    style?: "italic" | "oblique" | "normal";
    stretch?:
        | "ultra-condensed"
        | "extra-condensed"
        | "condensed"
        | "semi-condensed"
        | "normal"
        | "semi-expanded"
        | "expanded"
        | "extra-expanded"
        | "ultra-expanded";
    weight?:
        | "normal"
        | "bold"
        | 100
        | 200
        | 300
        | 400
        | 500
        | 600
        | 700
        | 800
        | 900
        | "100"
        | "200"
        | "300"
        | "400"
        | "500"
        | "600"
        | "700"
        | "800"
        | "900";
    src: Array<{
        url: string;
        format: "truetype";
    }>;
}

interface HTMLOptions {
    callback?: (doc: jsPDF) => void;
    margin?: number | number[];
    autoPaging?: boolean | "slice" | "text";
    filename?: string;
    image?: HTMLOptionImage;
    html2canvas?: Html2CanvasOptions;
    jsPDF?: jsPDF;
    x?: number;
    y?: number;
    width?: number;
    windowWidth?: number;
    fontFaces?: HTMLFontFace[];
}

//jsPDF plugin: viewerPreferences

interface ViewerPreferencesInput {
    HideToolbar?: boolean;
    HideMenubar?: boolean;
    HideWindowUI?: boolean;
    FitWindow?: boolean;
    CenterWindow?: boolean;
    DisplayDocTitle?: boolean;
    NonFullScreenPageMode?: "UseNone" | "UseOutlines" | "UseThumbs" | "UseOC";
    Direction?: "L2R" | "R2L";
    ViewArea?: "MediaBox" | "CropBox" | "TrimBox" | "BleedBox" | "ArtBox";
    ViewClip?: "MediaBox" | "CropBox" | "TrimBox" | "BleedBox" | "ArtBox";
    PrintArea?: "MediaBox" | "CropBox" | "TrimBox" | "BleedBox" | "ArtBox";
    PrintClip?: "MediaBox" | "CropBox" | "TrimBox" | "BleedBox" | "ArtBox";
    PrintScaling?: "AppDefault" | "None";
    Duplex?: "Simplex" | "DuplexFlipShortEdge" | "DuplexFlipLongEdge" | "none";
    PickTrayByPDFSize?: boolean;
    PrintPageRange?: number[][];
    NumCopies?: number;
}

//jsPDF plugin: Outline

interface Outline {
    add(parent: any, title: string, options: OutlineOptions): OutlineItem;
}
interface OutlineItem {
    title: string;
    options: any;
    children: any[];
}
interface OutlineOptions {
    pageNumber: number;
}
// jsPDF plugin: AcroForm
abstract class AcroFormField {}
interface AcroFormField {
    constructor(): AcroFormField;
    showWhenPrinted: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    fieldName: string;
    fontName: string;
    fontStyle: string;
    fontSize: number;
    maxFontSize: number;
    color: string;
    defaultValue: string;
    value: string;
    hasAnnotation: boolean;
    readOnly: boolean;
    required: boolean;
    noExport: boolean;
    textAlign: "left" | "center" | "right";
}

class AcroFormChoiceField {}
interface AcroFormChoiceField extends AcroFormField {
    topIndex: number;
    getOptions(): string[];
    setOptions(value: string[]): void;
    addOption(value: string): void;
    removeOption(value: string, allEntries: boolean): void;
    combo: boolean;
    edit: boolean;
    sort: boolean;
    multiSelect: boolean;
    doNotSpellCheck: boolean;
    commitOnSelChange: boolean;
}

class AcroFormListBox {}
interface AcroFormListBox extends AcroFormChoiceField {}

class AcroFormComboBox {}
interface AcroFormComboBox extends AcroFormListBox {}

class AcroFormEditBox {}
interface AcroFormEditBox extends AcroFormComboBox {}

class AcroFormButton {}
interface AcroFormButton extends AcroFormField {
    noToggleToOff: boolean;
    radio: boolean;
    pushButton: boolean;
    radioIsUnison: boolean;
    caption: string;
    appearanceState: any;
}

class AcroFormPushButton {}
interface AcroFormPushButton extends AcroFormButton {}

class AcroFormChildClass {}
interface AcroFormChildClass extends AcroFormField {
    Parent: any;
    optionName: string;
    caption: string;
    appearanceState: "On" | "Off";
}

class AcroFormRadioButton {}
interface AcroFormRadioButton extends AcroFormButton {
    setAppearance(appearance: string): void;
    createOption(name: string): AcroFormChildClass;
}

class AcroFormCheckBox {}
interface AcroFormCheckBox extends AcroFormButton {
    appearanceState: "On" | "Off";
}

class AcroFormTextField {}
interface AcroFormTextField extends AcroFormField {
    multiline: boolean;
    fileSelect: boolean;
    doNotSpellCheck: boolean;
    doNotScroll: boolean;
    comb: boolean;
    richText: boolean;
    maxLength: number;
    hasAppearanceStream: boolean;
}

class AcroFormPasswordField {}
interface AcroFormPasswordField extends AcroFormTextField {}
// jsPDF plugin: Context2D

interface Gradient {
    addColorStop(position: number, color: string): void;
    getColor(): string;
}

interface Context2d {
    autoPaging: boolean;
    margin: number[];
    fillStyle: string | Gradient;
    filter: string;
    font: string;
    globalAlpha: number;
    globalCompositeOperation: "source-over";
    imageSmoothingEnabled: boolean;
    imageSmoothingQuality: "low" | "high";
    ignoreClearRect: boolean;
    lastBreak: number;
    lineCap: "butt" | "round" | "square";
    lineDashOffset: number;
    lineJoin: "bevel" | "round" | "miter";
    lineWidth: number;
    miterLimit: number;
    pageBreaks: number[];
    pageWrapXEnabled: boolean;
    pageWrapYEnabled: boolean;
    posX: number;
    posY: number;
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    strokeStyle: string | Gradient;
    textAlign: "right" | "end" | "center" | "left" | "start";
    textBaseline:
        | "alphabetic"
        | "bottom"
        | "top"
        | "hanging"
        | "middle"
        | "ideographic";
    arc(
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
        counterclockwise: boolean
    ): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    beginPath(): void;
    bezierCurveTo(
        cp1x: number,
        cp1y: number,
        cp2x: number,
        cp2y: number,
        x: number,
        y: number
    ): void;
    clearRect(x: number, y: number, w: number, h: number): void;
    clip(): jsPDF;
    clipEvenOdd(): jsPDF;
    closePath(): void;
    createLinearGradient(
        x0: number,
        y0: number,
        x1: number,
        y1: number
    ): Gradient;
    createPattern(): Gradient;
    createRadialGradient(): Gradient;
    drawImage(
        img: string,
        x: number,
        y: number,
        width: number,
        height: number
    ): void;
    drawImage(
        img: string,
        sx: number,
        sy: number,
        swidth: number,
        sheight: number,
        x: number,
        y: number,
        width: number,
        height: number
    ): void;
    fill(): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    lineTo(x: number, y: number): void;
    measureText(text: string): number;
    moveTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
    restore(): void;
    rotate(angle: number): void;
    save(): void;
    scale(scalewidth: number, scaleheight: number): void;
    setTransform(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number
    ): void;
    stroke(): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    transform(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number
    ): void;
    translate(x: number, y: number): void;
}

type ImageCompression = "NONE" | "FAST" | "MEDIUM" | "SLOW";
type ColorSpace =
    | "DeviceRGB"
    | "DeviceGray"
    | "DeviceCMYK"
    | "CalGray"
    | "CalRGB"
    | "Lab"
    | "ICCBased"
    | "Indexed"
    | "Pattern"
    | "Separation"
    | "DeviceN";

type ImageFormat =
    | "RGBA"
    | "UNKNOWN"
    | "PNG"
    | "TIFF"
    | "JPG"
    | "JPEG"
    | "JPEG2000"
    | "GIF87a"
    | "GIF89a"
    | "WEBP"
    | "BMP";

interface ImageOptions {
    imageData:
        | string
        | HTMLImageElement
        | HTMLCanvasElement
        | Uint8Array
        | RGBAData;
    x: number;
    y: number;
    width: number;
    height: number;
    alias?: string;
    compression?: ImageCompression;
    rotation?: number;
    format?: ImageFormat;
}
interface ImageProperties {
    alias: number;
    width: number;
    height: number;
    colorSpace: ColorSpace;
    bitsPerComponent: number;
    filter: string;
    decodeParameters?: string;
    transparency?: any;
    palette?: any;
    sMask?: any;
    predictor?: number;
    index: number;
    data: string;
    fileType: ImageFormat;
}

interface TextOptionsLight {
    align?: "left" | "center" | "right" | "justify";
    angle?: number | Matrix;
    baseline?:
        | "alphabetic"
        | "ideographic"
        | "bottom"
        | "top"
        | "middle"
        | "hanging";
    flags?: {
        noBOM: boolean;
        autoencode: boolean;
    };
    rotationDirection?: 0 | 1;
    charSpace?: number;
    horizontalScale?: number;
    lineHeightFactor?: number;
    maxWidth?: number;
    renderingMode?:
        | "fill"
        | "stroke"
        | "fillThenStroke"
        | "invisible"
        | "fillAndAddForClipping"
        | "strokeAndAddPathForClipping"
        | "fillThenStrokeAndAddToPathForClipping"
        | "addToPathForClipping";
    isInputVisual?: boolean;
    isOutputVisual?: boolean;
    isInputRtl?: boolean;
    isOutputRtl?: boolean;
    isSymmetricSwapping?: boolean;
}
interface TextOptions extends TextOptionsLight {
    text: string | string[];
    x: number;
    y: number;
}

interface TableRowData {
    row?: number;
    data?: any[];
}

interface TableCellData {
    row?: number;
    col?: number;
    data?: any;
}

interface TableConfig {
    printHeaders?: boolean;
    autoSize?: boolean;
    margins?: number;
    fontSize?: number;
    padding?: number;
    headerBackgroundColor?: string;
    headerTextColor?: string;
    rowStart?: (e: TableRowData, doc: jsPDF) => void;
    cellStart?: (e: TableCellData, doc: jsPDF) => void;
    css?: {
        "font-size": number;
    };
}

interface CellConfig {
    name: string;
    prompt: string;
    align: "left" | "center" | "right";
    padding: number;
    width: number;
}

interface EncryptionOptions {
    userPassword?: string;
    ownerPassword?: string;
    userPermissions?: ("print" | "modify" | "copy" | "annot-forms")[];
}

interface jsPDFOptions {
    orientation?: "p" | "portrait" | "l" | "landscape";
    unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
    format?: string | number[];
    compress?: boolean;
    precision?: number;
    filters?: string[];
    userUnit?: number;
    encryption?: EncryptionOptions;
    putOnlyUsedFonts?: boolean;
    hotfixes?: string[];
    floatPrecision?: number | "smart";
}

interface Point {
    x: number;
    y: number;
}

interface Rectangle extends Point {
    w: number;
    h: number;
}

interface PageInfo {
    objId: number;
    pageNumber: number;
    pageContext: any;
}

interface Font {
    id: number;
    encoding: string;
    fontName: string;
    fontStyle: string;
    isStandardFont: boolean;
    metadata: any;
    objectNumber: number;
    postScriptName: string;
}

interface DocumentProperties {
    title?: string;
    subject?: string;
    author?: string;
    keywords?: string;
    creator?: string;
}

interface PatternData {
    key: string;
    matrix?: Matrix;
    boundingBox?: number[];
    xStep?: number;
    yStep?: number;
}

// Single dimensional array of RGBA values. For example from canvas getImageData.
interface RGBAData {
    data: Uint8ClampedArray;
    width: number;
    height: number;
}

interface PubSub {
    subscribe(
        topic: string,
        callback: (...args: any[]) => void,
        once?: boolean
    ): string;
    unsubscribe(token: string): boolean;
    publish(topic: string, ...args: any[]): void;
    getTopics(): Record<
        string,
        Record<string, [(...args: any[]) => void, boolean]>
    >;
}

class jsPDF {
    constructor(options?: jsPDFOptions);
    constructor(
        orientation?: "p" | "portrait" | "l" | "landscape",
        unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
        format?: string | number[],
        compressPdf?: boolean
    );

    CapJoinStyles: any;
    version: string;

    compatAPI(body?: (pdf: jsPDF) => void): void;
    advancedAPI(body?: (pdf: jsPDF) => void): void;
    isAdvancedAPI(): boolean;

    addFont(
        postScriptName: string,
        id: string,
        fontStyle: string,
        fontWeight?: string | number,
        encoding?:
            | "StandardEncoding"
            | "MacRomanEncoding"
            | "Identity-H"
            | "WinAnsiEncoding",
        isStandardFont?: boolean
    ): string;
    addFont(
        url: URL,
        id: string,
        fontStyle: string,
        fontWeight?: string | number,
        encoding?:
            | "StandardEncoding"
            | "MacRomanEncoding"
            | "Identity-H"
            | "WinAnsiEncoding"
    ): string;
    addGState(key: string, gState: GState): jsPDF;
    addPage(
        format?: string | number[],
        orientation?: "p" | "portrait" | "l" | "landscape"
    ): jsPDF;
    beginFormObject(
        x: number,
        y: number,
        width: number,
        height: number,
        matrix: any
    ): jsPDF;
    circle(x: number, y: number, r: number, style?: string | null): jsPDF;
    clip(rule?: "evenodd"): jsPDF;
    discardPath(): jsPDF;
    deletePage(targetPage: number): jsPDF;
    doFormObject(key: any, matrix: any): jsPDF;
    ellipse(
        x: number,
        y: number,
        rx: number,
        ry: number,
        style?: string | null
    ): jsPDF;
    endFormObject(key: any): jsPDF;
    f2(number: number): string;
    f3(number: number): string;
    getCharSpace(): number;
    getCreationDate(type: string): Date;
    getCurrentPageInfo(): PageInfo;
    getDrawColor(): string;
    getFileId(): string;
    getFillColor(): string;
    getFont(): Font;
    getFontList(): { [key: string]: string[] };
    getFontSize(): number;
    getFormObject(key: any): any;
    getLineHeight(): number;
    getLineHeightFactor(): number;
    getLineWidth(): number;
    getNumberOfPages(): number;
    getPageInfo(pageNumberOneBased: number): PageInfo;
    getR2L(): boolean;
    getStyle(style: string): string;
    getTextColor(): string;
    insertPage(beforePage: number): jsPDF;
    line(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        style?: string | null
    ): jsPDF;
    lines(
        lines: any[],
        x: any,
        y: any,
        scale?: any,
        style?: string | null,
        closed?: boolean
    ): jsPDF;
    clipEvenOdd(): jsPDF;
    close(): jsPDF;
    stroke(): jsPDF;
    fill(pattern?: PatternData): jsPDF;
    fillEvenOdd(pattern?: PatternData): jsPDF;
    fillStroke(pattern?: PatternData): jsPDF;
    fillStrokeEvenOdd(pattern?: PatternData): jsPDF;
    moveTo(x: number, y: number): jsPDF;
    lineTo(x: number, y: number): jsPDF;
    curveTo(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number
    ): jsPDF;
    movePage(targetPage: number, beforePage: number): jsPDF;
    output(): string;
    output(type: "arraybuffer"): ArrayBuffer;
    output(type: "blob"): Blob;
    output(type: "bloburi" | "bloburl"): URL;
    output(
        type: "datauristring" | "dataurlstring",
        options?: { filename?: string }
    ): string;
    output(
        type: "pdfobjectnewwindow" | "pdfjsnewwindow" | "dataurlnewwindow",
        options?: { filename?: string }
    ): Window;
    output(
        type: "dataurl" | "datauri",
        options?: { filename?: string }
    ): boolean;
    pdfEscape(text: string, flags: any): string;
    path(lines?: any[], style?: string): jsPDF;
    rect(
        x: number,
        y: number,
        w: number,
        h: number,
        style?: string | null
    ): jsPDF;
    restoreGraphicsState(): jsPDF;
    roundedRect(
        x: number,
        y: number,
        w: number,
        h: number,
        rx: number,
        ry: number,
        style?: string | null
    ): jsPDF;
    save(filename: string, options: { returnPromise: true }): Promise<void>;
    save(filename?: string): jsPDF;
    saveGraphicsState(): jsPDF;
    setCharSpace(charSpace: number): jsPDF;
    setCreationDate(date?: Date | string): jsPDF;
    setCurrentTransformationMatrix(matrix: Matrix): jsPDF;
    setDisplayMode(
        zoom:
            | undefined
            | null
            | number
            | "fullheight"
            | "fullwidth"
            | "fullpage"
            | "original"
            | string,
        layout?:
            | undefined
            | null
            | "continuous"
            | "single"
            | "twoleft"
            | "tworight"
            | "two",
        pmode?: undefined | null | "UseOutlines" | "UseThumbs" | "FullScreen"
    ): jsPDF;
    setDocumentProperties(properties: DocumentProperties): jsPDF;
    setProperties(properties: DocumentProperties): jsPDF;
    setDrawColor(ch1: string): jsPDF;
    setDrawColor(ch1: number): jsPDF;
    setDrawColor(ch1: number, ch2: number, ch3: number, ch4?: number): jsPDF;
    setFileId(value: string): jsPDF;
    setFillColor(ch1: string): jsPDF;
    setFillColor(ch1: number, ch2: number, ch3: number, ch4?: number): jsPDF;
    setFont(
        fontName: string,
        fontStyle?: string,
        fontWeight?: string | number
    ): jsPDF;
    setFontSize(size: number): jsPDF;
    setGState(gState: any): jsPDF;
    setLineCap(style: string | number): jsPDF;
    setLineDashPattern(dashArray: number[], dashPhase: number): jsPDF;
    setLineHeightFactor(value: number): jsPDF;
    setLineJoin(style: string | number): jsPDF;
    setLineMiterLimit(length: number): jsPDF;
    setLineWidth(width: number): jsPDF;
    setPage(pageNumber: number): jsPDF;
    setR2L(value: boolean): jsPDF;
    setTextColor(ch1: string): jsPDF;
    setTextColor(ch1: number): jsPDF;
    setTextColor(ch1: number, ch2: number, ch3: number, ch4?: number): jsPDF;
    text(
        text: string | string[],
        x: number,
        y: number,
        options?: TextOptionsLight,
        transform?: number | any
    ): jsPDF;
    triangle(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        style?: string | null
    ): jsPDF;
    getHorizontalCoordinateString(value: number): number;
    getVerticalCoordinateString(value: number): number;

    internal: {
        events: PubSub;
        scaleFactor: number;
        pageSize: {
            width: number;
            getWidth: () => number;
            height: number;
            getHeight: () => number;
        };
        pages: number[];
        getEncryptor(objectId: number): (data: string) => string;
    };

    /**
     * jsPDF plugins below:
     *
     *  - AcroForm
     *  - AddImage
     *  - Annotations
     *  - AutoPrint
     *  - Canvas
     *  - Cell
     *  - Context2D
     *  - fileloading
     *  - html
     *  - JavaScript
     *  - split_text_to_size
     *  - SVG
     *  - total_pages
     *  - utf8
     *  - vfs
     *  - xmp_metadata
     */

    // jsPDF plugin: addImage
    addImage(
        imageData:
            | string
            | HTMLImageElement
            | HTMLCanvasElement
            | Uint8Array
            | RGBAData,
        format: string,
        x: number,
        y: number,
        w: number,
        h: number,
        alias?: string,
        compression?: ImageCompression,
        rotation?: number
    ): jsPDF;
    addImage(
        imageData:
            | string
            | HTMLImageElement
            | HTMLCanvasElement
            | Uint8Array
            | RGBAData,
        x: number,
        y: number,
        w: number,
        h: number,
        alias?: string,
        compression?: ImageCompression,
        rotation?: number
    ): jsPDF;
    addImage(options: ImageOptions): jsPDF;
    getImageProperties(
        imageData: string | HTMLImageElement | HTMLCanvasElement | Uint8Array
    ): ImageProperties;

    // jsPDF plugin: arabic
    processArabic(text: string): string;

    // jsPDF plugin: Annotations
    createAnnotation(options: Annotation): void;
    link(x: number, y: number, w: number, h: number, options: any): void;
    textWithLink(text: string, x: number, y: number, options: any): number;
    getTextWidth(text: string): number;

    // jsPDF plugin: AutoPrint
    autoPrint(options?: AutoPrintInput): jsPDF;

    // jsPDF plugin: AcroForm
    addField(field: AcroFormField): jsPDF;

    AcroForm: {
        ChoiceField(): AcroFormChoiceField;
        ListBox(): AcroFormListBox;
        ComboBox(): AcroFormComboBox;
        EditBox(): AcroFormEditBox;
        Button(): AcroFormButton;
        PushButton(): AcroFormPushButton;
        RadioButton(): AcroFormRadioButton;
        CheckBox(): AcroFormCheckBox;
        TextField(): AcroFormTextField;
        PasswordField(): AcroFormPasswordField;
        Appearance(): any;
    };

    // jsPDF plugin: Canvas
    canvas: {
        pdf: jsPDF;
        width: number;
        height: number;
        getContext(type?: string): Context2d;
        style: any;
    };

    // jsPDF plugin: Cell
    setHeaderFunction(
        func: (jsPDFInstance: jsPDF, pages: number) => number[]
    ): jsPDF;
    getTextDimensions(
        text: string,
        options?: {
            font?: string;
            fontSize?: number;
            maxWidth?: number;
            scaleFactor?: number;
        }
    ): { w: number; h: number };

    cellAddPage(): jsPDF;
    cell(
        x: number,
        y: number,
        w: number,
        h: number,
        txt: string,
        ln: number,
        align: string
    ): jsPDF;
    table(
        x: number,
        y: number,
        data: { [key: string]: string }[],
        headers: string[] | CellConfig[],
        config: TableConfig
    ): jsPDF;
    calculateLineHeight(
        headerNames: string[],
        columnWidths: number[],
        model: any[]
    ): number;
    setTableHeaderRow(config: CellConfig[]): void;
    printHeaderRow(lineNumber: number, new_page?: boolean): void;

    context2d: Context2d;

    //jsPDF plugin: Outline
    outline: Outline;
    // jsPDF plugin: fileloading
    loadFile(url: string, sync?: true): string;
    loadFile(
        url: string,
        sync: false,
        callback: (data: string) => string
    ): void;

    // jsPDF plugin: html
    html(src: string | HTMLElement, options?: HTMLOptions): HTMLWorker;

    // jsPDF plugin: JavaScript
    addJS(javascript: string): jsPDF;

    // jsPDF plugin: split_text_to_size
    getCharWidthsArray(text: string, options?: any): any[];
    getStringUnitWidth(text: string, options?: any): number;
    splitTextToSize(text: string, maxlen: number, options?: any): any;

    // jsPDF plugin: SVG
    addSvgAsImage(
        svg: string,
        x: number,
        y: number,
        w: number,
        h: number,
        alias?: string,
        compression?: boolean,
        rotation?: number
    ): jsPDF;
    // jsPDF plugin: setlanguage
    setLanguage(
        langCode:
            | "af"
            | "sq"
            | "ar"
            | "ar-DZ"
            | "ar-BH"
            | "ar-EG"
            | "ar-IQ"
            | "ar-JO"
            | "ar-KW"
            | "ar-LB"
            | "ar-LY"
            | "ar-MA"
            | "ar-OM"
            | "ar-QA"
            | "ar-SA"
            | "ar-SY"
            | "ar-TN"
            | "ar-AE"
            | "ar-YE"
            | "an"
            | "hy"
            | "as"
            | "ast"
            | "az"
            | "eu"
            | "be"
            | "bn"
            | "bs"
            | "br"
            | "bg"
            | "my"
            | "ca"
            | "ch"
            | "ce"
            | "zh"
            | "zh-HK"
            | "zh-CN"
            | "zh-SG"
            | "zh-TW"
            | "cv"
            | "co"
            | "cr"
            | "hr"
            | "cs"
            | "da"
            | "nl"
            | "nl-BE"
            | "en"
            | "en-AU"
            | "en-BZ"
            | "en-CA"
            | "en-IE"
            | "en-JM"
            | "en-NZ"
            | "en-PH"
            | "en-ZA"
            | "en-TT"
            | "en-GB"
            | "en-US"
            | "en-ZW"
            | "eo"
            | "et"
            | "fo"
            | "fj"
            | "fi"
            | "fr"
            | "fr-BE"
            | "fr-CA"
            | "fr-FR"
            | "fr-LU"
            | "fr-MC"
            | "fr-CH"
            | "fy"
            | "fur"
            | "gd"
            | "gd-IE"
            | "gl"
            | "ka"
            | "de"
            | "de-AT"
            | "de-DE"
            | "de-LI"
            | "de-LU"
            | "de-CH"
            | "el"
            | "gu"
            | "ht"
            | "he"
            | "hi"
            | "hu"
            | "is"
            | "id"
            | "iu"
            | "ga"
            | "it"
            | "it-CH"
            | "ja"
            | "kn"
            | "ks"
            | "kk"
            | "km"
            | "ky"
            | "tlh"
            | "ko"
            | "ko-KP"
            | "ko-KR"
            | "la"
            | "lv"
            | "lt"
            | "lb"
            | "mk"
            | "ms"
            | "ml"
            | "mt"
            | "mi"
            | "mr"
            | "mo"
            | "nv"
            | "ng"
            | "ne"
            | "no"
            | "nb"
            | "nn"
            | "oc"
            | "or"
            | "om"
            | "fa"
            | "fa-IR"
            | "pl"
            | "pt"
            | "pt-BR"
            | "pa"
            | "pa-IN"
            | "pa-PK"
            | "qu"
            | "rm"
            | "ro"
            | "ro-MO"
            | "ru"
            | "ru-MO"
            | "sz"
            | "sg"
            | "sa"
            | "sc"
            | "sd"
            | "si"
            | "sr"
            | "sk"
            | "sl"
            | "so"
            | "sb"
            | "es"
            | "es-AR"
            | "es-BO"
            | "es-CL"
            | "es-CO"
            | "es-CR"
            | "es-DO"
            | "es-EC"
            | "es-SV"
            | "es-GT"
            | "es-HN"
            | "es-MX"
            | "es-NI"
            | "es-PA"
            | "es-PY"
            | "es-PE"
            | "es-PR"
            | "es-ES"
            | "es-UY"
            | "es-VE"
            | "sx"
            | "sw"
            | "sv"
            | "sv-FI"
            | "sv-SV"
            | "ta"
            | "tt"
            | "te"
            | "th"
            | "tig"
            | "ts"
            | "tn"
            | "tr"
            | "tk"
            | "uk"
            | "hsb"
            | "ur"
            | "ve"
            | "vi"
            | "vo"
            | "wa"
            | "cy"
            | "xh"
            | "ji"
            | "zu"
    ): jsPDF;

    // jsPDF plugin: total_pages
    putTotalPages(pageExpression: string): jsPDF;

    // jsPDF plugin: viewerpreferences
    viewerPreferences(
        options: ViewerPreferencesInput,
        doReset?: boolean
    ): jsPDF;
    viewerPreferences(arg: "reset"): jsPDF;

    // jsPDF plugin: vfs
    existsFileInVFS(filename: string): boolean;
    addFileToVFS(filename: string, filecontent: string): jsPDF;
    getFileFromVFS(filename: string): string;

    // jsPDF plugin: xmp_metadata
    addMetadata(metadata: string, namespaceuri?: string): jsPDF;

    Matrix(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number
    ): Matrix;
    matrixMult(m1: Matrix, m2: Matrix): Matrix;
    unitMatrix: Matrix;

    GState(parameters: GState): GState;

    ShadingPattern(
        type: ShadingPatternType,
        coords: number[],
        colors: ShadingPatterStop[],
        gState?: GState,
        matrix?: Matrix
    ): ShadingPattern;
    TilingPattern(
        boundingBox: number[],
        xStep: number,
        yStep: number,
        gState?: GState,
        matrix?: Matrix
    ): TilingPattern;

    addShadingPattern(key: string, pattern: ShadingPattern): jsPDF;
    beginTilingPattern(pattern: TilingPattern): void;
    endTilingPattern(key: string, pattern: TilingPattern): void;

    static API: jsPDFAPI;
    static version: string;
}

class GState {
    constructor(parameters: GState);
}

interface GState {
    opacity?: number;
    "stroke-opacity"?: number;
}

interface Matrix {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;

    sx: number;
    shy: number;
    shx: number;
    sy: number;
    tx: number;
    ty: number;

    join(separator?: string): string;
    multiply(matrix: Matrix): Matrix;
    decompose(): {
        scale: Matrix;
        translate: Matrix;
        rotate: Matrix;
        skew: Matrix;
    };
    toString(): string;
    inversed(): Matrix;
    applyToPoint(point: Point): Point;
    applyToRectangle(rect: Rectangle): Rectangle;
    clone(): Matrix;
}

interface Pattern {
    gState?: GState;
    matrix?: Matrix;
}

interface ShadingPatterStop {
    offset: number;
    color: number[];
}

type ShadingPatternType = "axial" | "radial";

class ShadingPattern {
    constructor(
        type: ShadingPatternType,
        coords: number[],
        colors: ShadingPatterStop[],
        gState?: GState,
        matrix?: Matrix
    );
}
interface ShadingPattern extends Pattern {
    coords: number[];
    colors: ShadingPatterStop[];
}

class TilingPattern {
    constructor(
        boundingBox: number[],
        xStep: number,
        yStep: number,
        gState?: GState,
        matrix?: Matrix
    );
}

interface TilingPattern extends Pattern {
    boundingBox: number[];
    xStep: number;
    yStep: number;
}

interface jsPDFAPI {
    events: any[];
}
