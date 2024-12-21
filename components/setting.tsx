import type { ReactNode } from "react";
import React, { useContext } from "react";
import { SettingContext } from "~provider/setting";
import { Popover } from "@headlessui/react";
import ReactSlider from "react-slider";
import FontSizeLeft from "data-base64:~assets/font-size-left.svg";
import FontSizeRight from "data-base64:~assets/font-size-right.svg";
import PageWidthLeft from "data-base64:~assets/page-width-left.svg";
import PageWidthRight from "data-base64:~assets/page-width-right.svg";
import IconSetting from "react:~/assets/setting-config.svg";
import Tooltip from "~components/tooltip";

export enum EnumLineSpacing {
    Small = "1.4em",
    Medium = "1.8em",
    Large = "2.4em"
}

export const Fonts = [
    "Default",
    "Arial",
    "Arial Black",
    "Athelas",
    "Bookerly",
    "Chakra Petch",
    "Comic Sans",
    "Comic Sans MS",
    "Constantia",
    "Courier New",
    "Courier",
    "Didot",
    "Fira Code",
    "Georgia",
    "Gill Sans",
    "IBM Plex Sans",
    "Impact",
    "Iowan Old Style",
    "Palatino",
    "Optima",
    "Sans-serif",
    "Seravek",
    "Serif",
    "Sitka Text",
    "Times New Roman",
    "Trebuchet MS"
];

export enum EnumTranslateServices {
    GoogleTranslate = "google_translate",
    TencentTranslate = "tencent_translate",
    OpenaiTranslate = "openai_translate"
}

function SettingItem ({ label, children }: { label: string, children: ReactNode }) {
    return <div className={"flex items-center"}>
        <div className={"w-[120px]"}>
            {label}
        </div>
        <div className={"flex-1"}>
            {children}
        </div>
    </div>;
}

function VGap ({ size = 0 }: { size: number }) {
    return <div className={"w-full"} style={{ height: `${Math.max(size, 0)}px` }} />;
}

function LineSpacing () {
    const { settingObject: { lineSpacing }, setSetting } = useContext(SettingContext);

    return <div className={"lineSpacingRadioGroup"}>
        {
            Object.keys(EnumLineSpacing).map(item => {
                return <div className={"lineSpacingRadio"}
                    onClick={async () => {
                        await setSetting({ lineSpacing: EnumLineSpacing[item] });
                    }}
                    key={item}>
                    <span className={`circle ${lineSpacing === EnumLineSpacing[item] ? "selected" : ""}`} /> {item}
                </div>;
            })
        }
    </div>;
}

function FontSelect () {
    const { settingObject: { fontFamily }, setSetting } = useContext(SettingContext);

    const selectFontChange = function (e: React.ChangeEvent<HTMLSelectElement>) {
        void setSetting({ fontFamily: e.target.value });
    };

    return (
        <select onChange={selectFontChange} value={fontFamily}
            className={"text-[var(--setting-foreground)] text-[12px] outline-none p-[4px] bg-[white]"} name="fonts"
            id="fonts">
            {
                Fonts.map(item => <option key={item} value={item}>{item}</option>)
            }
        </select>
    );
}

function TranslateServiceSelect () {
    const { settingObject: { translateService }, setSetting } = useContext(SettingContext);

    const selectTranslateServiceChange = function (e: React.ChangeEvent<HTMLSelectElement>) {
        void setSetting({ translateService: e.target.value });
    };

    const parseKeys = (key: string) => {
        return key.replace(/([a-z])([A-Z])/g, "$1 $2");
    };

    return (
        <select onChange={selectTranslateServiceChange} value={translateService}
            className={"text-[var(--setting-foreground)] text-[12px] outline-none p-[4px] bg-[white]"}
            name="translateServices"
            id="translateServices">
            {
                Object.keys(EnumTranslateServices)
                    .map(item => <option key={parseKeys(item)} value={EnumTranslateServices[item]}>{parseKeys(item)}</option>)
            }
        </select>
    );
}

function OpenAIKeyInput () {
    const { settingObject, setSetting } = useContext(SettingContext);

    return (
        <SettingItem label="OpenAI Key">
            <input
                type="text"
                className="w-full px-2 py-1 border rounded"
                value={settingObject.openaiKey}
                onChange={async (e) => {
                    await setSetting({ openaiKey: e.target.value });
                }}
            />
        </SettingItem>
    );
}

function ModelInput () {
    const { settingObject, setSetting } = useContext(SettingContext);

    return (
        <SettingItem label="OpenAI Model">
            <input
                type="text"
                className="w-full px-2 py-1 border rounded"
                value={settingObject.model}
                onChange={async (e) => {
                    await setSetting({ model: e.target.value });
                }}
            />
        </SettingItem>
    );
}

function SummaryPromptInput () {
    const { settingObject, setSetting } = useContext(SettingContext);

    return (
        <SettingItem label="AI总结提示词">
            <textarea
                className="w-full px-2 py-1 border rounded resize-y min-h-[100px]"
                value={settingObject.summaryPrompt}
                placeholder={`你是一个专业的文章总结助手。请对以下文章内容进行全面的总结，包括以下几个方面：
1. 主要观点和论述
2. 重要的论据和数据支持
3. 文章的结构和逻辑
4. 作者的结论或建议

请用清晰的结构和简洁的语言进行总结。`}
                onChange={async (e) => {
                    await setSetting({ summaryPrompt: e.target.value });
                }}
            />
        </SettingItem>
    );
}

export function BasicSetting () {
    const { settingObject: { fontSize, pageWidth }, setSetting } = useContext(SettingContext);

    //
    return <div className={"setting select-none"}>
        <div>
            <Popover>
                <Tooltip message={"Settings"}>
                    <div>
                        <Popover.Button data-tooltip-id="my-tooltip"
                            className={"outline-none"}><IconSetting /></Popover.Button>
                    </div>
                </Tooltip>
                <Popover.Panel className="fixed right-[20px] top-[60px]">
                    {
                        <div
                            className="rounded-[4px] bg-[var(--setting-background)] text-[var(--setting-foreground)] w-[360px] p-[18px] ">
                            <SettingItem label={"Font"}>
                                <FontSelect />
                            </SettingItem>
                            <VGap size={14} />
                            <SettingItem label={"Font size"}>
                                <div className={"flex items-center"}>
                                    <img className={"h-[20px] mr-[6px]"} src={FontSizeLeft} alt="" />
                                    <div className={"h-[18px] flex-1 items-center"}>
                                        {/*@ts-ignore*/}
                                        <ReactSlider max={40} min={12} defaultValue={fontSize}
                                            className="horizontal-slider mt-[2px] setting-font-size"
                                            thumbClassName="thumb"
                                            trackClassName="track"
                                            onChange={async (value) => {
                                                await setSetting({ fontSize: value });
                                            }}
                                            renderThumb={(props, state) =>
                                                <div {...props}>{state.valueNow}</div>}
                                        />
                                    </div>
                                    <img className={"h-[20px] ml-[6px]"} src={FontSizeRight} alt="" />
                                </div>
                            </SettingItem>
                            <VGap size={14} />
                            <SettingItem label={"Line spacing"}>
                                <LineSpacing />
                            </SettingItem>
                            <VGap size={14} />
                            <SettingItem label={"Page width"}>
                                <div className={"flex items-center"}>
                                    <img src={PageWidthLeft} className={"h-[18px] mr-[6px]"} alt="" />
                                    <div className={"h-[18px] flex-1  items-center"}>
                                        {/*@ts-ignore*/}
                                        <ReactSlider defaultValue={pageWidth}
                                            max={1900} min={400}
                                            className="horizontal-slider mt-[2px] w-full setting-font-size"
                                            thumbClassName="thumb"
                                            trackClassName="track"
                                            step={10}
                                            onChange={async (value) => {
                                                await setSetting({ pageWidth: value });
                                            }}
                                            renderThumb={(props, state) =>
                                                <div {...props}>{state.valueNow}</div>}
                                        />
                                    </div>
                                    <img src={PageWidthRight} className={"h-[18px] ml-[6px]"} alt="" />
                                </div>
                            </SettingItem>
                            <VGap size={14} />
                            <OpenAIKeyInput />
                            <VGap size={10} />
                            <ModelInput />
                            <VGap size={10} />
                            <SummaryPromptInput />
                            <VGap size={10} />
                            <TranslateServiceSelect />
                        </div>
                    }
                </Popover.Panel>
            </Popover>
        </div>
    </div>;
}
