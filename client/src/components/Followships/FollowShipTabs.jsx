import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function FollowShipTabs({def,setUsers ,setTab,setPag}) {
    return <Tabs defaultValue={def} className={"flex justify-center sticky top-0 w-full bg-background border-b-2 z-999 p-1 "} >
        <TabsList variant="default" className={"flex gap-16 bg-background"}>
            <TabsTrigger onClick={() => {setTab("followers");setPag(0);setUsers([])}} value="followers" className={"border-3 border-foreground hover:cursor-pointer"}>
                Followers
            </TabsTrigger>
            <TabsTrigger onClick={() => {setTab("followings");setPag(0);setUsers([])}} value="followings" className={"border-3 border-foreground hover:cursor-pointer"}>
                Followings
            </TabsTrigger>
        </TabsList>
    </Tabs>
}