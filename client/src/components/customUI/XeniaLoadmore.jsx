import { Button } from "../ui/button"

export function XeniaLoadMore({pag,list,setPag}) {
  return (
        pag != null && list.length > 0 && <Button className={"m-2 "} onClick={() => {
      setPag(prev => prev + 1)
    }}>Load More</Button>
  )
}