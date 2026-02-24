
import { Iplayer, Iroom } from "./Api"
import { clientInput, Istate } from "./Status"

export interface IMsgClientSync {
    input: clientInput
    frameId: number
}
export interface IMsgServerSync {
    inputs: clientInput[]
    lastFrameId: number
}
export interface IMsgPlayerList {
    Players: Iplayer[]
}
export interface IMsgRoomList {
    Rooms: Iroom[]
}
export interface IMsgRoom {
    Room: Iroom
}
export interface IMsgRoomStart {
    state: Istate
}



