
import { ExplosionManager } from './../Explosion/ExplosionManager';
import { buildTree } from './../../../../extensions/Behavior Eden/src/runtime/core/utils';
import { _decorator, instantiate, IVec2, input, Vec3, Tween, Node } from 'cc';
import DataManager from '../../Global/DataManager';
import { EntityTypeEnum, IActor, IBullet, InputTypeEnum } from '../../Common';
import { EntityManager } from '../../Base/EntityManager';

import { EntityStateEnum, EventEnum, PrefabPathEnum } from '../../Enum';
import { WeaponManager } from '../Weapon/WeaponManager';
import { rad2Angle } from '../../Utils';
import { BulletStateMachine } from './BulletStateMachine';
import EventManager from '../../Global/EventManager';
import ObjectPoolManager from '../../Global/ObjectPoolManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
/** 
 * @description 子弹管理器 
 * 
*/
export class BulletManager extends EntityManager {
    bulletType: EntityTypeEnum
    id: number
    private targetPos: Vec3 = undefined
    private tw: Tween<Node>;
    /**
     * @description 初始化玩家信息
     * @param data 
     */
    init(data: IBullet) {
        this.bulletType = data.bulletType;
        this.id = data.id;
        this.fsm = this.addComponent(BulletStateMachine);//添加状态机组件 多态
        this.fsm.init(data.bulletType);//初始化状态机
        this.state = EntityStateEnum.Idle;//设置初始状态
        this.node.active = false
        EventManager.Instance.on(EventEnum.ExplosionBorn, this.handleExplosionBorn, this);
    }
    handleExplosionBorn(id: number, { x, y }: IVec2) {
        if (id !== this.id) return; //确定子弹的ID是唯一的 逻辑上是 如果前面的子弹不销毁时 后续子弹不会对未销毁的子弹有影响 确保唯一性
        const explosion = ObjectPoolManager.Instance.get(EntityTypeEnum.Explosion)
        const em = explosion.getComponent(ExplosionManager) || explosion.addComponent(ExplosionManager)
        em.init(EntityTypeEnum.Explosion, { x, y })
        DataManager.Instance.bulletMap.delete(this.id);
        EventManager.Instance.off(EventEnum.ExplosionBorn, this.handleExplosionBorn, this)
        ObjectPoolManager.Instance.ret(this.node)
    }


    tick(dt): void {
        //todo
    }
    /**
     * @description 渲染子弹信息
     * @param data 
     */
    render(data: IBullet) {
        this.renderPos(data)
        this.renderAngle(data)

    }
    renderPos(data: IBullet) {
        const { position } = data
        const newPos = new Vec3(position.x, position.y);
        if (!this.targetPos) {
            this.node.active = true;
            this.node.setPosition(newPos);
            this.targetPos = new Vec3(newPos);
        } else if (!this.targetPos.equals(newPos)) {
            this.tw?.stop();
            this.node.setPosition(this.targetPos);
            this.targetPos.set(newPos);
            this.tw = new Tween(this.node)
                .to(0.1, { position: this.targetPos })
                .start();
        }
    }
    renderAngle(data: IBullet) {
        const { direction } = data
        const side = Math.sign(direction.x ** 2 + direction.y ** 2);
        const angle = direction.x > 0 ? rad2Angle(Math.asin(direction.y / side)) : rad2Angle(Math.asin(-direction.y / side)) + 180;
        this.node.setRotationFromEuler(0, 0, angle);
    }
}


