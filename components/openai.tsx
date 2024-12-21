import React, { useContext } from "react";
import IconOpenAI from "react:~/assets/openai.svg";
import Tooltip from "./tooltip";
import { ReaderContext, SummaryType } from "~provider/reader";

function OpenAI () {
    const { chatOn, setChatOn, setSummaryType } = useContext(ReaderContext);

    const handleOpenaiButtonClick = function () {
        setSummaryType(SummaryType.Paragraph);
        setChatOn(!chatOn);
        const openai = document.querySelectorAll("plasmo-csui")[0]
            .shadowRoot
            .querySelector<HTMLElement>("#rs-chat-container");

        openai.style.display = !chatOn ? "block" : "none";
    };

    return (
        <div className={"setting select-none"}>
            <Tooltip message={"OpenAI"}>
                <button className={"outline-none"} onClick={handleOpenaiButtonClick}>
                    <IconOpenAI />
                </button>
            </Tooltip>
        </div>
    );
}

export default React.memo(OpenAI);
