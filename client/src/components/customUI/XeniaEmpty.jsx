import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function XeniaEmpty({HeaderIcon,title,description=""}) {
  return (
    <Empty className="h-full bg-background">
      <EmptyHeader>
        <EmptyMedia className="bg-background" variant="icon">
          {HeaderIcon}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
            {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
