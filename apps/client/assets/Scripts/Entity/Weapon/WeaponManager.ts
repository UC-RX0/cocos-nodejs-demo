import { _decorator, director, Node, UITransform, Vec2 } from 'cc';
import DataManager from '../../Global/DataManager';
import { IActor, InputTypeEnum, toFix } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';
import { EntityStateEnum, EventEnum, ParamsNameEnum, PrefabPathEnum } from '../../Enum';
import { WeaponStateMachine } from './WeaponStateMachine';
import EventManager from '../../Global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('WeaponManager')
/** 
 * @description 武器管理器 
 * 
*/
export class WeaponManager extends EntityManager {
    private body: Node
    private anchor: Node
    private point: Node
    private owner: number
    /**
     * @description 初始化武器信息
     * @param data 
     */
    init(data: IActor) {
        this.owner = data.id;
        this.body = this.node.getChildByName('Body');
        this.anchor = this.body.getChildByName('Anchor');
        this.point = this.anchor.getChildByName('Point');
        this.fsm = this.body.addComponent(WeaponStateMachine);//添加状态机组件 多态
        this.fsm.init(data.weaponType);//初始化状态机
        this.state = EntityStateEnum.Idle;//设置初始状态
        EventManager.Instance.on(EventEnum.WeaponShoot, this.handleShoot, this);
        EventManager.Instance.on(EventEnum.BulletBorn, this.handleBulletBorn, this);
    }
    handleBulletBorn(owner: number) {
        if (owner !== this.owner) return
        this.state = EntityStateEnum.Attack;
    }
    handleShoot() {
        if (this.owner !== DataManager.Instance.playerID) return;//不是当前玩家 不处理
        //将point 的世界坐标位置转化到Stage节点坐标 对其生成位置
        const pointPos = this.point.worldPosition;
        const stagePos = DataManager.Instance.stage.getComponent(UITransform).convertToNodeSpaceAR(pointPos);
        const anchorPos = this.anchor.worldPosition;
        const direction = new Vec2(pointPos.x - anchorPos.x, pointPos.y - anchorPos.y);
        EventManager.Instance.emit(EventEnum.ClientSync,
            {
                owner: this.owner,
                type: InputTypeEnum.WeaponShoot,
                position: {
                    x: stagePos.x,
                    y: stagePos.y
                },
                direction: direction.normalize(),
            }
        )
        console.log(DataManager.Instance.state.bullets)
    }
    onDestroy(): void {
        EventManager.Instance.off(EventEnum.WeaponShoot, this.handleShoot, this);
        EventManager.Instance.off(EventEnum.BulletBorn, this.handleBulletBorn, this);
    }
}


