import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function HomeTabs({setTab,isSigned,setPag}) {
    return <Tabs defaultValue="fy" className={"flex justify-center sticky top-0 w-full bg-background border-b-2 z-999 p-1 "} >
        <TabsList variant="default" className={"flex gap-16 bg-background"}>
            <TabsTrigger onClick={() => {setTab("fy"),setPag(0)}} value="fy" className={"border-3 border-foreground hover:cursor-pointer"}>
                For You
            </TabsTrigger>
            {isSigned && <TabsTrigger onClick={() => {setTab("following");setPag(0)}} value="following" className={"border-3 border-foreground hover:cursor-pointer"}>
                Following
            </TabsTrigger>}
        </TabsList>
    </Tabs>
}