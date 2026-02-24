import { Connection } from './../Core/Connection';

import Singleton from "../Base/Singleton";
import { Player } from "./Player";
import { ApiMsgEnum, IApiPlayerJoinReq } from '../Common';
import { RoomManager } from './RoomManager';

export class PlayerManager extends Singleton {

    static get Instance() {
        return super.GetInstance<PlayerManager>();
    }
    nextPlayerId: number = 1;
    players: Set<Player> = new Set();
    idMapPlayer: Map<number, Player> = new Map();

    createPlayer({ nickname, connection }: IApiPlayerJoinReq & { connection: Connection }) {
        const player = new Player({
            id: this.nextPlayerId++,
            nickname,
            connection,
        });
        this.players.add(player);
        this.idMapPlayer.set(player.id, player);
        return player;
    }

    removePlayer(pid: number) {
        const player = this.idMapPlayer.get(pid);
        if (player) {
            if (player.rid) {
                RoomManager.Instance.leaveRoom(player.rid, player.id);
                RoomManager.Instance.syncRooms()
                RoomManager.Instance.syncRoom(player.rid)
            }
            this.players.delete(player);
            this.idMapPlayer.delete(player.id);
        }
    }
    syncPlayer() {
        for (const player of this.players) {
            player.connection.sentMsg(ApiMsgEnum.MsgPlayerList, {
                Players: this.getPlayersView(),
            });
        }
    }
    getPlayersView(player: Set<Player> = this.players) {
        return [...player].map((p) => this.getPlayerView(p));
    }
    getPlayerView(player: Player) {
        return {
            id: player.id,
            nickname: player.nickname,
            rid: player.rid,
        }
    }

}
