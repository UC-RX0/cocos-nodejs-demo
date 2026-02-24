import { IApiPlayerJoinReq, IApiPlayerJoinRes, IApiPlayerListReq, IApiPlayerListRes, IApiRoomCreateReq, IApiRoomCreateRes, IApiRoomJoinReq, IApiRoomJoinRes, IApiRoomLeaveReq, IApiRoomLeaveRes, IApiRoomListReq, IApiRoomListRes, IApiRoomStartReq, IApiRoomStartRes } from "./Api";
import { ApiMsgEnum } from "./Enum";
import { IMsgClientSync, IMsgPlayerList, IMsgRoom, IMsgRoomList, IMsgRoomStart, IMsgServerSync } from "./Msg";

export interface IModel {
    api: {
        [ApiMsgEnum.ApiPlayerJoin]: {
            req: IApiPlayerJoinReq,
            res: IApiPlayerJoinRes,
        },
        [ApiMsgEnum.ApiPlayerList]: {
            req: IApiPlayerListReq,
            res: IApiPlayerListRes,
        },
        [ApiMsgEnum.ApiRoomCreate]: {
            req: IApiRoomCreateReq,
            res: IApiRoomCreateRes,
        },
        [ApiMsgEnum.ApiRoomList]: {
            req: IApiRoomListReq,
            res: IApiRoomListRes,
        },
        [ApiMsgEnum.ApiRoomJoin]: {
            req: IApiRoomJoinReq,
            res: IApiRoomJoinRes,
        },
        [ApiMsgEnum.ApiRoomLeave]: {
            req: IApiRoomLeaveReq,
            res: IApiRoomLeaveRes,
        },
        [ApiMsgEnum.ApiRoomStart]: {
            req: IApiRoomStartReq,
            res: IApiRoomStartRes,
        },
    },
    msg: {
        [ApiMsgEnum.MsgPlayerList]: IMsgPlayerList,
        [ApiMsgEnum.MsgClientSync]: IMsgClientSync,
        [ApiMsgEnum.MsgServerSync]: IMsgServerSync,
        [ApiMsgEnum.MsgRoomList]: IMsgRoomList,
        [ApiMsgEnum.MsgRoom]: IMsgRoom,
        [ApiMsgEnum.MsgRoomStart]: IMsgRoomStart,
    }
}