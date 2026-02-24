import { Room } from './Room';
import { Connection } from './../Core/Connection';

import Singleton from "../Base/Singleton";
import { Player } from "./Player";
import { ApiMsgEnum, IApiPlayerJoinReq } from '../Common';
import { PlayerManager } from './PlayerManager';

export class RoomManager extends Singleton {



    static get Instance() {
        return super.GetInstance<RoomManager>();
    }
    nextRoomId: number = 1;
    Rooms: Set<Room> = new Set();
    idMapRoom: Map<number, Room> = new Map();

    createRoom() {
        const room = new Room(this.nextRoomId++);
        this.Rooms.add(room);
        this.idMapRoom.set(room.id, room);
        return room;
    }
    joinRoom(id: number, playerID: number) {
        const room = this.idMapRoom.get(id);
        if (room) {
            room.join(playerID);
            return room
        }
    }
    leaveRoom(id: number, playerID: number) {
        const room = this.idMapRoom.get(id);
        if (room) {
            room.leave(playerID);
        }
    }
    removeRoom(id: number) {
        const room = this.idMapRoom.get(id);
        if (room) {
            this.Rooms.delete(room);
            this.idMapRoom.delete(room.id);
            room.close();
        }
    }
    // removePlayer(pid: number) {
    //     const player = this.idMapPlayer.get(pid);
    //     if (player) {
    //         this.players.delete(player);
    //         this.idMapPlayer.delete(player.id);
    //     }
    // }
    syncRooms() {
        for (const player of PlayerManager.Instance.players) {
            player.connection.sentMsg(ApiMsgEnum.MsgRoomList, {
                Rooms: this.getRoomsView(),
            });
        }
    }
    syncRoom(rid: number) {
        const room = this.idMapRoom.get(rid);
        if (room) {
            room.sync()
        }
    }
    getRoomsView(rooms: Set<Room> = this.Rooms) {
        return [...rooms].map((p) => this.getRoomView(p));
    }
    getRoomView({ id, players }: Room) {
        return {
            id,
            players: PlayerManager.Instance.getPlayersView(players),
        }
    }
    startGame(id: number) {
        const room = this.idMapRoom.get(id);
        if (room) {
            room.start();
        }
    }

}
