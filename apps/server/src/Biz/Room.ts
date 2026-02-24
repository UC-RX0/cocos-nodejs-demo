
import { Connection } from './../Core/Connection';
import { ApiMsgEnum, clientInput, EntityTypeEnum, IMsgClientSync, InputTypeEnum, toFix } from "../Common";
import { Player } from "./Player";
import { PlayerManager } from './PlayerManager';
import { RoomManager } from "./RoomManager";


export class Room {

    id: number;
    players: Set<Player> = new Set();
    pendingInputs: clientInput[] = [];
    lastTime: number
    lastPlayerFrameMap: Map<number, number> = new Map();
    constructor(rid: number) {
        this.id = rid;
    }
    join(playerID: number) {
        const player = PlayerManager.Instance.idMapPlayer.get(playerID);
        if (player) {
            player.rid = this.id
            this.players.add(player);
        }
    }
    leave(playerID: number) {
        const player = PlayerManager.Instance.idMapPlayer.get(playerID);
        if (player) {
            player.rid = undefined
            this.players.delete(player);
            if (!this.players.size) {
                RoomManager.Instance.removeRoom(this.id);
            }
        }
    }
    start() {
        const state = {
            actor: [...this.players].map((player, index) => ({
                id: player.id,
                nickname: player.nickname,
                position: {
                    x: -150 + index * 300,
                    y: -150 + index * 300
                },
                direction: { x: 1, y: 0 },
                Type: EntityTypeEnum.Actor1,
                weaponType: EntityTypeEnum.Weapon1,
                bulletType: EntityTypeEnum.Bullet2,
                hp: 100
            })),
            bullets: [],
            nextBulletID: 1,
        }

        for (const player of this.players) {
            player.connection.sentMsg(ApiMsgEnum.MsgRoomStart, {
                state,
            })
            player.connection.listenMsg(ApiMsgEnum.MsgClientSync, this.getClientMsg, this)
        }
        const time1 = setInterval(() => {
            this.sendServerMsg()
        }, 100)
        const time2 = setInterval(() => {
            this.timePast()
        }, 16)
    }
    getClientMsg(connection: Connection, { input, frameId }: IMsgClientSync) {
        this.pendingInputs.push(input)
        this.lastPlayerFrameMap.set(connection.playerID, frameId);
    }
    sendServerMsg() {
        const inputs = this.pendingInputs;
        this.pendingInputs = [];
        for (const player of this.players) {
            player.connection.sentMsg(ApiMsgEnum.MsgServerSync, {
                inputs,
                lastFrameId: this.lastPlayerFrameMap.get(player.id) ?? 0,
            })
        }
    }
    close() {
        this.players.clear();
    }
    sync() {
        for (const player of this.players) {
            player.connection.sentMsg(ApiMsgEnum.MsgRoom, {
                Room: RoomManager.Instance.getRoomView(this),
            })
        }
    }
    timePast() {
        const now = process.uptime();
        const dt = now - (this.lastTime ?? now);
        this.pendingInputs.push({
            type: InputTypeEnum.TimePast,
            dt
        })
        this.lastTime = now;
    }
}