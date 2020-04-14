
interface ILink {
    href?: string,
    isActive: boolean,
    children?: any,
    cb?: (e: MouseEvent<any>) =>  any
}