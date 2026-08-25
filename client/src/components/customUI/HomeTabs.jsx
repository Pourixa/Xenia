import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function HomeTabs({setTab}) {
    return <Tabs defaultValue="fy" className={"flex justify-center sticky top-0 w-full bg-background border-b-2 z-999 p-1"} >
        <TabsList variant="default" className={"flex gap-16 bg-background"}>
            <TabsTrigger onClick={() => {setTab("fy")}} value="fy" className={"border-3 border-foreground"}>
                For You
            </TabsTrigger>
            <TabsTrigger onClick={() => {setTab("following")}} value="following" className={"border-3 border-foreground"}>
                Following
            </TabsTrigger>
        </TabsList>
    </Tabs>
}