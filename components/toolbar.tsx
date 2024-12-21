import React from "react";
import Translate from "~components/translate";
import { DownloadMarkdown } from "~components/download";
import { BasicSetting } from "~components/setting";
import OpenAI from "~components/openai";
import FullArticleSummary from "~components/full_article_summary";

function Toolbar () {
    return (
        <div className="fixed select-none right-[2%] top-[30px]">
            <div className="flex justify-end">
                <OpenAI />
                <FullArticleSummary />
                <Translate />
                <DownloadMarkdown />
                <BasicSetting />
            </div>
        </div>
    );
}

export default Toolbar;
