import { Link } from "react-router";
import { XeniaAvatar } from "../customUI/XeniaAvatar";

export function User ({user}) {
    return <Link to={`/${user.username}`} className="gap-1 border-b last:border-0 p-1 flex items-center pr-4 pl-4">
        <XeniaAvatar size="lg" name={user.name} imageSrc={user.avatarUrl}/>
        <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-muted-foreground">@{user.username}</span>
        </div>
    </Link>
}