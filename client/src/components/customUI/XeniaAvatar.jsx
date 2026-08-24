import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function XeniaAvatar({size="default",imageSrc=null,alt="",fallback="A"}) {
    return <Avatar size={size}>
        <AvatarImage
        src={imageSrc}
        alt={alt}
        >
        <AvatarFallback>
            {fallback}
        </AvatarFallback>
        </AvatarImage>
    </Avatar>
}