import { Player } from './../../../../server/src/Biz/Player';
import { _decorator, Component, director, EditBox, Node, Scene } from 'cc';
import { NetworkManager } from '../Global/NetworkManager';
import { ApiMsgEnum } from '../Common';
import DataManager from '../Global/DataManager';
import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('LoginManager')
export class LoginManager extends Component {
    editBox: EditBox
    onLoad(): void {
        this.editBox = this.getComponentInChildren(EditBox);
        director.preloadScene(SceneEnum.Hall)
    }
    async start() {
        await NetworkManager.Instance.connect();
    }
    async handleClick() {
        const nickname = this.editBox.string;
        if (!NetworkManager.Instance.inConnection) {
            console.log("未连接");
            await NetworkManager.Instance.connect();
            return;
        }
        if (nickname.length === 0) {
            console.log("请输入昵称");
            return;
        }
        const { success, error, res } = await NetworkManager.Instance.callApi(ApiMsgEnum.ApiPlayerJoin, {
            nickname
        });
        if (!success) {
            console.log("加入失败", error);
            return;
        }


        DataManager.Instance.playerID = res.player.id
        console.log("加入成功", res.player.id);
        director.loadScene(SceneEnum.Hall)
    }


}