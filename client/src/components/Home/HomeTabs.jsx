import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export function HomeTabs({ setPosts, setTab, isSigned, setPag }) {
  return (
    <Tabs
      defaultValue="fy"
      className={
        "flex justify-center sticky top-0 w-full bg-background border-b-2 z-999 p-1 "
      }
    >
      <TabsList variant="default" className={"flex gap-16 bg-background"}>
        <TabsTrigger
          onClick={() => {
            setTab((prev) => {
              if (prev != "fy") {
                setPosts([]);
                setPag(0);
                return "fy";
              } else return prev;
            });
          }}
          value="fy"
          className={"border-3 border-foreground hover:cursor-pointer"}
        >
          For You
        </TabsTrigger>
        {isSigned && (
          <TabsTrigger
            onClick={() => {
              setTab((prev) => {
                if (prev != "following") {
                  setPosts([]);
                  setPag(0);
                  return "following";
                } else return prev;
              });
            }}
            value="following"
            className={"border-3 border-foreground hover:cursor-pointer"}
          >
            Following
          </TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  );
}
