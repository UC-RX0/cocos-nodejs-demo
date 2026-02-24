import { _decorator, Component, Label, } from 'cc';
import { Iplayer } from '../Common';
const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {
    @property(Label)
    NicknameLabel: Label = null;
    init({ id, nickname, rid }: Iplayer) {
        this.NicknameLabel.string = nickname;
        this.node.active = true;
    }
}


