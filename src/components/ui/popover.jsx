
import * as React from "react"

import as Popover Primitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = Popover Primitive.Root

const Popover Trigger Popover Primitive.Trigger

const Popover Anchor Popover Primitive.Anchor

const PopoverContent = React.forwardRef (({ className, align="center", sideOffset = 4, props, ref) => (

<PopoverPrimitive.Portal>

<Popover Primitive.Content

ref={ref}

align={align}

side0ffset={sideOffset}

className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
))

className

)}

{...props} />

</PopoverPrimitive. Portal>

Popover Content.displayName = Popover Primitive.Content.displayName

export { Popover, Popover Trigger, Popover Content, Popover Anchor }
