import { cn } from "cn"
import { Loader2Icon } from "lucide-react"

function Spinner({
  className,
  ...props
}) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin justify-self-center self-center h-full w-8", className)}
      {...props} />
  );
}

export { Spinner }
