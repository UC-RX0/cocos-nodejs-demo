export interface Iplayer {
    id: number,
    nickname: string,
    rid: number
}
export interface Iroom {
    id: number,
    players: Iplayer[],
}

export interface IApiPlayerJoinReq {
    nickname: string,
}
export interface IApiPlayerJoinRes {
    player: Iplayer,
}
export interface IApiPlayerListReq { }
export interface IApiPlayerListRes {
    Players: Iplayer[],
}

export interface IApiRoomCreateReq {
}
export interface IApiRoomCreateRes {
    room: Iroom,
}

export interface IApiRoomListReq { }
export interface IApiRoomListRes {
    Rooms: Iroom[],
}
export interface IApiRoomJoinReq {
    rid: number,
}
export interface IApiRoomJoinRes {
    room: Iroom,
}
export interface IApiRoomLeaveReq {
}
export interface IApiRoomLeaveRes {
}
export interface IApiRoomStartReq {
}
export interface IApiRoomStartRes {
}