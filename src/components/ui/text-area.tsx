import * as React from "react"

import {cn} from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, ...props}, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-16 w-full rounded-md border border-black border-opacity-10 bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
TextArea.displayName = "TextArea"

export default TextArea
