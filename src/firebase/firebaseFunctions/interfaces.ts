export default interface IUser {
    id?: string,
    name: string,
    email: string,
    hasVoted? : boolean,
    points : number
}

