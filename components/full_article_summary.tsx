import React, { useContext } from "react";
import IconSummary from "react:~/assets/summary.svg";
import Tooltip from "./tooltip";
import { ReaderContext, SummaryType } from "~provider/reader";
import { SettingContext } from "~provider/setting";
import { ChatMessageContext } from "~provider/chat";
import type { ChatMessage } from "~provider/chat";

function FullArticleSummary() {
    const { settingObject: { summaryPrompt } } = useContext(SettingContext);
    const { chatOn, setChatOn, setSummaryType } = useContext(ReaderContext);
    const context = useContext(ChatMessageContext);

    const handleSummarize = async () => {
        setSummaryType(SummaryType.FullArticle);
        setChatOn(!chatOn);
        
        // Get article content
        const article = document.querySelectorAll("plasmo-csui")[0]
            .shadowRoot
            .querySelector(".page")
            ?.textContent;

        if (!article) {
            console.error("No article content found");
            return;
        }

        // Initialize messages with system prompt
        const systemMessage: ChatMessage = {
            role: "system",
            content: summaryPrompt || `你是一个专业的文章总结助手。请对以下文章内容进行全面的总结，包括以下几个方面：
1. 主要观点和论述
2. 重要的论据和数据支持
3. 文章的结构和逻辑
4. 作者的结论或建议

请用清晰的结构和简洁的语言进行总结。`
        };

        const userMessage: ChatMessage = {
            role: "user",
            content: article
        };

        const messages = context.messages
        context.setMessages([...messages, systemMessage, userMessage]);
    };

    return (
        <div className={"setting select-none"}>
            <Tooltip message={"AI总结全文"}>
                <button 
                    className={"outline-none"} 
                    onClick={handleSummarize}
                >
                    <IconSummary />
                </button>
            </Tooltip>
        </div>
    );
}

export default React.memo(FullArticleSummary);
