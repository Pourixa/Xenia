import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "./Home";
import { Input } from "@/components/ui/input";
import { SearchIcon, SearchX } from "lucide-react";
import { postRequest } from "@/lib/requests";
import { User } from "@/components/Search/user";
import { XeniaEmpty } from "@/components/customUI/XeniaEmpty";
import { useSearchParams } from "react-router";
import { XeniaLoadMore } from "@/components/customUI/XeniaLoadmore";
import { MAX_SEARCH } from "@/lib/utils";

export function Search() {
  const { setSelected } = useContext(SelectedContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("s");

  const [text, setText] = useState(q ? q : "");
  const [result, setResult] = useState([]);
  const [pag, setPag] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelected("search");
  }, [setSelected]);

  useEffect(() => {
    setResult([]);
    setPag(0);
    setHasMore(true);
  }, [text]);
  useEffect(() => {
    if (!text.length || !hasMore) return;

    setLoading(true);

    postRequest("/user/search", {
      q: text,
      p: pag
    })
      .then(r => r.json())
      .then(j => {
        if (j.length < MAX_SEARCH) {
          setHasMore(false);
        }

        setResult(prev =>
          pag === 0
            ? j
            : [...prev, ...j]
        );
      })
      .finally(() => {
        setLoading(false);
      });

  }, [pag, text, hasMore]);

  return (
    <main className="grow overflow-auto flex flex-col">

      <div className="z-999 bg-background p-4 border-b sticky top-0">
        <div className="flex border items-center p-1 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">

          <Input
            onChange={e => {
              const value = e.target.value;

              setText(value);
              setSearchParams({ s: value });
            }}
            value={text}
            className="border-0 focus-visible:ring-0"
            placeholder="Type to search..."
          />

          <span>
            <SearchIcon />
          </span>

        </div>
      </div>

      <div>
        {console.log(result)}
        {loading ? (
          <div className="p-4">
            Loading...
          </div>
        ) : result.length > 0 ? (
          result.map(user => (
            <User
              user={user}
              key={user.username}
            />
          ))
        ) : text.length > 0 ? (
          <XeniaEmpty
            HeaderIcon={<SearchX />}
            title="No results found"
          />
        ) : null}
      </div>

      <XeniaLoadMore
        pag={hasMore ? pag : null}
        setPag={setPag}
        list={result}
      />

    </main>
  );
}