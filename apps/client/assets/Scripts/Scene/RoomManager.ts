import { Room } from './../../../../server/src/Biz/Room';
import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
import { NetworkManager } from '../Global/NetworkManager';
import { ApiMsgEnum, IMsgRoom, IMsgRoomStart } from '../Common';
import { PlayerManager } from '../UI/PlayerManager';
import DataManager from '../Global/DataManager';
import EventManager from '../Global/EventManager';
import { EventEnum, SceneEnum } from '../Enum';
import { deepClone } from '../Utils';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
    @property(Node)
    PlayerList: Node = null;
    @property(Prefab)
    PlayerPrefab: Prefab = null
    onLoad(): void {
        NetworkManager.Instance.listenMsg(ApiMsgEnum.MsgRoomStart, this.handleStart, this)
        NetworkManager.Instance.listenMsg(ApiMsgEnum.MsgRoom, this.renderPlayer, this)

    }
    start(): void {
        this.renderPlayer(
            { Room: DataManager.Instance.roomInfo }
        )
    }
    protected onDestroy(): void {
        NetworkManager.Instance.unListenMsg(ApiMsgEnum.MsgRoom, this.renderPlayer, this)
        NetworkManager.Instance.unListenMsg(ApiMsgEnum.MsgRoomStart, this.handleStart, this)
    }

    renderPlayer({ Room: { players: Players } }: IMsgRoom) {
        for (const c of this.PlayerList.children) {
            c.active = false;
        }


        while (this.PlayerList.children.length < Players.length) {
            const c = instantiate(this.PlayerPrefab);
            c.active = false;
            c.parent = this.PlayerList;
        }

        for (let i = 0; i < Players.length; i++) {
            const data = Players[i];
            const node = this.PlayerList.children[i]
            node.getComponent(PlayerManager).init(data)
        }

    }

    async handleLeaveRoom() {
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiRoomLeave, {});
        if (!success) {
            DataManager.Instance.roomInfo = null
            console.log("退出房间成功", res);
            director.loadScene(SceneEnum.Hall)
        } else {
            console.log("退出房间失败", error);
        }
    }
    async handleStartGame() {
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiRoomStart, {});
        if (!success) {
            console.log("开始游戏成功", res);
        } else {
            console.log("开始游戏失败", error);
        }
    }
    handleStart({ state }: IMsgRoomStart) {
        DataManager.Instance.state = state;
        DataManager.Instance.lasteState = deepClone(state)
        director.loadScene(SceneEnum.Battle)
    }
}


