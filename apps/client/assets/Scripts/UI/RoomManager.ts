import { _decorator, Component, Label, Node } from 'cc';
import { Iroom } from '../Common';
import EventManager from '../Global/EventManager';
import { EventEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('RoomManager')
export class RoomManager extends Component {
    id: number
    @property(Label)
    NicknameLabel: Label = null;
    init({ id, players }: Iroom) {
        this.id = id
        this.NicknameLabel.string = "房间ID:" + id
        this.node.active = true;
    }
    handleClick() {
        EventManager.Instance.emit(EventEnum.JoinRoom, this.id)
    }
}


