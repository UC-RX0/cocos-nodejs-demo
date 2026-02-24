
// import { nodeClsMap } from './../../../extensions/Behavior Eden/src/runtime/core/decorator';
export enum InputTypeEnum {
    ActorMove = 'ActorMove',
    WeaponShoot = 'WeaponShoot',
    TimePast = 'TimePast',
}
export enum EntityTypeEnum {
    Map = 'Map',
    Actor1 = 'Actor1',
    Weapon1 = 'Weapon1',
    Bullet1 = 'Bullet1',
    Bullet2 = 'Bullet2',
    Explosion = 'Explosion',
}
export enum ApiMsgEnum {
    ApiPlayerJoin = 'ApiPlayerJoin',
    MsgClientSync = 'MsgClientSync',
    MsgServerSync = 'MsgServerSync',
    ApiPlayerList = 'ApiPlayerList',
    MsgPlayerList = 'MsgPlayerList',
    MsgRoom = 'MsgRoom',
    ApiRoomLeave = 'ApiRoomLeave',
    ApiRoomCreate = 'ApiRoomCreate',
    ApiRoomList = 'ApiRoomList',
    ApiRoomJoin = 'ApiRoomJoin',
    MsgRoomList = 'MsgRoomList',
    ApiRoomStart = 'ApiRoomStart',
    MsgRoomStart = 'MsgRoomStart',
}
