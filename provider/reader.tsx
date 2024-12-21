import type { ReactNode } from "react";
import { createContext, useState } from "react";

export class Article {
    title: string
    constructor (title: string) {
        this.title = title
    }
}

export enum SummaryType {
    Paragraph = "paragraph",
    FullArticle = "full_article"
}

interface TypeReaderContext {
    settingStatus: boolean
    setSettingStatus: (value: boolean) => void

    article: Article

    setArticle: (article: Article) => void

    translateOn: boolean

    setTranslateOn: (on: boolean) => void

    chatOn: boolean

    setChatOn: (on: boolean) => void

    summaryType: SummaryType
    setSummaryType: (type: SummaryType) => void
}

export const ReaderContext = createContext({} as TypeReaderContext)

export function ReaderProvider ({
    children,
    article
}: {
    children: ReactNode
    article: Article
}) {
    const [settingStatus, setSettingStatus] = useState(false)
    const [_article, setArticle] = useState(article)
    const [translateOn, setTranslateOn] = useState(false)
    const [chatOn, setChatOn] = useState(false)
    const [summaryType, setSummaryType] = useState<SummaryType>(SummaryType.Paragraph)

    return (
        <ReaderContext.Provider
            value={{
                settingStatus,
                setSettingStatus,
                article: _article,
                setArticle,
                translateOn,
                setTranslateOn,
                chatOn,
                setChatOn,
                summaryType,
                setSummaryType,
            }}>
            {children}
        </ReaderContext.Provider>
    );
}
