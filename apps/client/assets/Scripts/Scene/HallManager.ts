import { _decorator, Component, director, instantiate, Label, Node, Prefab } from 'cc';
import { NetworkManager } from '../Global/NetworkManager';
import { ApiMsgEnum, IApiPlayerListRes, IApiRoomListRes } from '../Common';
import { PlayerManager } from '../UI/PlayerManager';
import DataManager from '../Global/DataManager';
import { EventEnum, SceneEnum } from '../Enum';
import { RoomManager } from '../UI/RoomManager';
import EventManager from '../Global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('HallManager')
export class HallManager extends Component {
    @property(Node)
    PlayerList: Node = null;
    @property(Prefab)
    PlayerPrefab: Prefab = null
    @property(Node)
    RoomList: Node = null;
    @property(Prefab)
    RoomPrefab: Prefab = null
    onLoad(): void {
        NetworkManager.Instance.listenMsg(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this)
        NetworkManager.Instance.listenMsg(ApiMsgEnum.MsgRoomList, this.renderRoom, this)
        EventManager.Instance.on(EventEnum.JoinRoom, this.handleJoinRoom, this)

    }
    start(): void {
        this.RoomList.removeAllChildren();
        this.PlayerList.removeAllChildren();
        this.getPlayers()
        this.getRooms()
    }
    protected onDestroy(): void {
        NetworkManager.Instance.unListenMsg(ApiMsgEnum.MsgPlayerList, this.renderPlayer, this)
        NetworkManager.Instance.unListenMsg(ApiMsgEnum.MsgRoomList, this.renderRoom, this)
        EventManager.Instance.off(EventEnum.JoinRoom, this.handleJoinRoom, this)
    }
    async getPlayers() {
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiPlayerList, {});
        if (!success) {
            console.log("加入失败", error);
            return;
        }
        this.renderPlayer(res)
    }
    async getRooms() {
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiRoomList, {});
        if (!success) {
            console.log("加入失败", error);
            return;
        }
        this.renderRoom(res)
    }
    renderRoom({ Rooms }: IApiRoomListRes) {
        for (const c of this.RoomList.children) {
            c.active = false;
        }


        while (this.RoomList.children.length < Rooms.length) {
            const c = instantiate(this.RoomPrefab);
            c.active = false;
            c.parent = this.RoomList;
        }

        for (let i = 0; i < Rooms.length; i++) {
            const data = Rooms[i];
            const node = this.RoomList.children[i]
            node.getComponent(RoomManager).init(data)
        }
    }
    async handleJoinRoom(rid: number) {
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiRoomJoin, {
            rid,
        });
        if (!success) {
            console.log("加入失败", error);
            return;
        }
        DataManager.Instance.roomInfo = res.room;
        console.log("创建房间成功", res);
        director.loadScene(SceneEnum.Room)
    }
    renderPlayer({ Players }: IApiPlayerListRes) {
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

    async handleCreateRoom() {
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiRoomCreate, {});
        if (!success) {
            console.log("加入失败", error);
            return;
        }
        DataManager.Instance.roomInfo = res.room;
        console.log("创建房间成功", res);
        director.loadScene(SceneEnum.Room)
    }

}


