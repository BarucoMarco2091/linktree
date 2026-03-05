// criamos componentes para não precisar criar varias vezes

import type { ReactNode } from "react"
// criar  a tipagem
interface SocialProps {
    url: string;
    children: ReactNode;
}

export function Social({ url, children }: SocialProps) {
    return (
        <a href={url}
            rel="noopener noreferrer"
            target="_blank"
        >
            {children}
        </a>
    )
}