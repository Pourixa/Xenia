import { XeniaAvatar } from "../customUI/XeniaAvatar";

export function User ({user}) {
    return <div>
        <XeniaAvatar/>
        <div>
            <span>{user.name}</span>
            <span>@{user.username}</span>
        </div>
    </div>
}