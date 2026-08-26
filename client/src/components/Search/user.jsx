import { XeniaAvatar } from "../customUI/XeniaAvatar";

export function User ({user}) {
    return <div className="gap-1 border-b last:border-0 p-1 flex items-center">
        <XeniaAvatar size="lg" name={user.name} imageSrc={user.avatarUrl}/>
        <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-muted-foreground">@{user.username}</span>
        </div>
    </div>
}