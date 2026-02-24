import { dirname } from 'path';

import { symlinkCommon } from "./Utils";

import { ApiMsgEnum, IApiPlayerJoinReq, IApiPlayerJoinRes, IApiPlayerListReq, IApiPlayerListRes, IApiRoomCreateReq, IApiRoomCreateRes, IApiRoomJoinReq, IApiRoomJoinRes, IApiRoomLeaveReq, IApiRoomLeaveRes, IApiRoomListReq, IApiRoomListRes, IApiRoomStartReq, IApiRoomStartRes } from './Common';
import { Myserver } from "./Core";
import { Connection } from './Core/Connection';
import { PlayerManager } from './Biz/PlayerManager';
import { RoomManager } from './Biz/RoomManager';
import { Room } from './Biz/Room';
symlinkCommon();

const server = new Myserver(
    { port: 9876 }
);

declare module "./Core/Connection" {
    interface Connection {
        playerID: number;
    }
}
server.on("connection", (conn: Connection) => {
    console.log("连接成功");
})
server.on("disconnect", (conn: Connection) => {
    if (conn.playerID) {
        PlayerManager.Instance.removePlayer(conn.playerID);
    }
    PlayerManager.Instance.syncPlayer();
    console.log("断开连接");
})
server.setApi(ApiMsgEnum.ApiPlayerJoin, (connection: Connection, data: IApiPlayerJoinReq): IApiPlayerJoinRes => {
    const { nickname } = data;
    const player = PlayerManager.Instance.createPlayer({ nickname, connection });
    connection.playerID = player.id;
    PlayerManager.Instance.syncPlayer();
    return {
        player: PlayerManager.Instance.getPlayerView(player),
    }
})
server.setApi(ApiMsgEnum.ApiPlayerList, (connection: Connection, data: IApiPlayerListReq): IApiPlayerListRes => {
    return {
        Players: PlayerManager.Instance.getPlayersView(),
    }
})
server.setApi(ApiMsgEnum.ApiRoomList, (connection: Connection, data: IApiRoomListReq): IApiRoomListRes => {
    return {
        Rooms: RoomManager.Instance.getRoomsView(),
    }
})
server.setApi(ApiMsgEnum.ApiRoomCreate, (connection: Connection, data: IApiRoomCreateReq): IApiRoomCreateRes => {

    if (connection.playerID) {
        const newRoom = RoomManager.Instance.createRoom();
        const room = RoomManager.Instance.joinRoom(newRoom.id, connection.playerID);
        if (room) {
            RoomManager.Instance.syncRooms()
            PlayerManager.Instance.syncPlayer()
            return {
                room: RoomManager.Instance.getRoomView(room),
            }
        } else {
            throw new Error("加入房间失败")
        }
    } else {
        throw new Error("玩家未加入房间")
    }

})
server.setApi(ApiMsgEnum.ApiRoomJoin, (connection: Connection, data: IApiRoomJoinReq): IApiRoomJoinRes => {
    const { rid } = data;
    if (connection.playerID) {
        const room = RoomManager.Instance.joinRoom(rid, connection.playerID);
        if (room) {
            RoomManager.Instance.syncRooms()
            PlayerManager.Instance.syncPlayer()
            RoomManager.Instance.syncRoom(rid)
            return {
                room: RoomManager.Instance.getRoomView(room),
            }
        } else {
            throw new Error("加入房间失败")
        }
    } else {
        throw new Error("玩家未加入房间")
    }
})
server.setApi(ApiMsgEnum.ApiRoomLeave, (connection: Connection, data: IApiRoomLeaveReq): IApiRoomLeaveRes => {
    if (connection.playerID) {
        const player = PlayerManager.Instance.idMapPlayer.get(connection.playerID);
        if (player) {
            const rid = player.rid
            if (rid) {
                RoomManager.Instance.leaveRoom(rid, player.id);
                RoomManager.Instance.syncRooms()
                PlayerManager.Instance.syncPlayer()
                RoomManager.Instance.syncRoom(rid)
                return {
                    room: RoomManager.Instance.getRoomView(RoomManager.Instance.idMapRoom.get(rid)),
                }
            } else {
                throw new Error("玩家未加入房间")
            }
        } else {
            throw new Error("没有该玩家")
        }
    } else {
        throw new Error("玩家未加入房间")
    }
})
server.setApi(ApiMsgEnum.ApiRoomStart, (connection: Connection, data: IApiRoomStartReq): IApiRoomStartRes => {
    if (connection.playerID) {
        const player = PlayerManager.Instance.idMapPlayer.get(connection.playerID);
        if (player) {
            const rid = player.rid
            if (rid) {
                RoomManager.Instance.startGame(rid);
                RoomManager.Instance.syncRooms()
                PlayerManager.Instance.syncPlayer()
                RoomManager.Instance.syncRoom(rid)
                return {
                    room: RoomManager.Instance.getRoomView(RoomManager.Instance.idMapRoom.get(rid)),
                }
            } else {
                throw new Error("玩家未加入房间")
            }
        } else {
            throw new Error("没有该玩家")
        }
    } else {
        throw new Error("玩家未加入房间")
    }
})
server.start().
    then(() => {
        console.log("服务启动");
    }).catch((e) => { console.log(e) })
//帧同步原理 只做数据打包和分发 存储客户端发送的输入  服务器端每100ms 发送一次数组  客户端收到数组后  应用输入  实现帧同步
/**
 * 其本质就是订阅发布模式 由客户端订阅 交由客户端中转站NetWorkManager接收后端的信息并注册到Map数组中完成订阅 服务端与
 * 中转站中的wss通信 根据规定好的ip port 由onmessage分发至对应的客户端所订阅的事件中去  客户端收到数组后  应用输入  实现帧同步
 * 整个服务端只做打包和分发功能
 */


// wsServer.on("connection", (socket) => {
//     let inputs = []
//     //获取客户端发送的消息
//     socket.on("message", (buffer) => {
//         const str = buffer.toString();
//         try {
//             const { name, data } = JSON.parse(str);
//             const { input, frameID } = data;
//             inputs.push(input)
//         } catch (error) {
//             console.log("解析消息错误", error);
//         }
//     });
//     // 每100ms 发送一次数组  数组中包含客户端发送的输入
//     setInterval(() => {
//         const temp = inputs
//         inputs = []
//         const msg = {
//             name: ApiMsgEnum.MsgServerSync,
//             data: {
//                 inputs: temp,
//             }
//         }
//         socket.send(JSON.stringify(msg));//发送消息
//     }, 100)

// });

// wsServer.on("listening", () => {
//     console.log("服务启动");
// });
