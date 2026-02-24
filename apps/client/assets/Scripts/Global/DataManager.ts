import { input, director, Prefab, SpriteFrame, Node } from 'cc';

import Singleton from "../Base/Singleton";
import { clientInput, EntityTypeEnum, IActorMove, IBullet, InputTypeEnum, Iroom, Istate } from "../Common";
import { JoyStickManager } from '../UI/JoyStickManager';
import { ActorManager } from '../Entity/Actor/ActorManager';
import { BulletManager } from '../Entity/Bullet/BulletManager';
import EventManager from './EventManager';
import { EventEnum } from '../Enum';

const MOVE_SPEED = 150;
const BULLET_SPEED = 600;

const MAP_WIDTH = 960;
const MAP_HEIGHT = 640;

const PLAYER_RADIUS = 60;
const BULLET_RADIUS = 10;

const ATTACK = 5
export const MAX_HP = 100;
export default class DataManager extends Singleton {
  static DataManager: any;
  static get Instance() {
    return super.GetInstance<DataManager>();
  }
  frameID: number = 1;
  roomInfo: Iroom;
  lasteState: Istate
  private _stage: Node = null;
  private _actorMap: Map<number, ActorManager> = new Map();// key:actorID value:ActorManager实例
  private _prefabMap: Map<string, Prefab> = new Map();// key:资源路径 value:Prefab实例
  private _textureMap: Map<string, SpriteFrame[]> = new Map();// key:资源路径 value:SpriteFrame实例数组
  private _bulletMap: Map<number, BulletManager> = new Map();// key:bulletID value:BulletManager实例
  playerID: number = 1;//当前玩家ID
  public get bulletMap(): Map<number, BulletManager> {
    return this._bulletMap;
  }
  public setBulletManager(key: number, value: BulletManager) {
    this._bulletMap.set(key, value);
  }
  public get stage(): Node {
    return this._stage;
  }
  public set stage(value: Node) {
    this._stage = value;
  }
  public get textureMap(): Map<string, SpriteFrame[]> {
    return this._textureMap;
  }
  public setTextureMap(key: string, value: SpriteFrame[]) {
    this._textureMap.set(key, value);
  }
  public get prefabMap(): Map<string, Prefab> {
    return this._prefabMap;
  }
  public setprefabMap(key: string, value: Prefab) {
    this._prefabMap.set(key, value);
  }
  private _jm: JoyStickManager;
  public get jm(): JoyStickManager {
    return this._jm;
  }
  public set jm(value: JoyStickManager) {
    this._jm = value;
  }
  public get actorMap(): Map<number, ActorManager> {
    return this._actorMap;
  }
  public setActorManager(id: number, actor: ActorManager) {
    this._actorMap.set(id, actor);
  }
  //记录当前游戏中的所有玩家信息
  state: Istate = {
    actor: [
      // {
      //   id: 1,
      //   position: { x: -150, y: -150 },
      //   direction: { x: 1, y: 0 },
      //   Type: EntityTypeEnum.Actor1,
      //   weaponType: EntityTypeEnum.Weapon1,
      //   bulletType: EntityTypeEnum.Bullet2,
      //   hp: 100
      // },
      // {
      //   id: 2,
      //   position: { x: 150, y: 150 },
      //   direction: { x: -1, y: 0 },
      //   Type: EntityTypeEnum.Actor1,
      //   weaponType: EntityTypeEnum.Weapon1,
      //   bulletType: EntityTypeEnum.Bullet2,
      //   hp: 100
      // },
    ],
    bullets: [],
    nextBulletID: 1,
  }
  /**
   * @description 
   * @param input 
   */
  applyInput(input: clientInput) {
    switch (input.type) {
      case InputTypeEnum.ActorMove: {
        const {
          id,
          direction: { x, y },
          dt
        } = input
        //找到包里的需要修改的玩家ID 然后修改位置和方向
        const actor = this.state.actor.find(v => v.id === id);
        if (actor) {
          actor.direction.x = x;
          actor.direction.y = y;
          const length = Math.sqrt(x * x + y * y);
          if (length > 0) {
            actor.position.x += (x / length) * MOVE_SPEED * dt;
            actor.position.y += (y / length) * MOVE_SPEED * dt;
          }
        }
        break;
      }
      case InputTypeEnum.WeaponShoot: {

        const { owner, position: { x, y }, direction: { x: dx, y: dy } } = input
        const bullet: IBullet = {
          id: this.state.nextBulletID++,
          owner,
          position: { x, y },
          direction: { x: dx, y: dy },
          bulletType: this.actorMap.get(owner)?.bulletType,
        }
        EventManager.Instance.emit(EventEnum.BulletBorn, owner);
        this.state.bullets.push(bullet);
        break;
      }
      case InputTypeEnum.TimePast: {
        const { dt } = input;

        for (const bullet of this.state.bullets) {
          bullet.position.x += bullet.direction.x * BULLET_SPEED * dt;
          bullet.position.y += bullet.direction.y * BULLET_SPEED * dt;
          //碰撞检测 子弹是否有与物体接触
          // 遍历所有玩家 检查是否与玩家碰撞
          for (const actor of this.state.actor) {
            if (actor.id === bullet.owner) continue; // 跳过自己
            const distance = Math.sqrt((bullet.position.x - actor.position.x) ** 2 + (bullet.position.y - actor.position.y) ** 2);
            if (distance < PLAYER_RADIUS + BULLET_RADIUS) {
              // 碰撞检测成功 销毁子弹 激活爆炸特效 TODO玩家扣血功能
              this.state.bullets.splice(this.state.bullets.indexOf(bullet), 1);
              EventManager.Instance.emit(EventEnum.ExplosionBorn, bullet.id, { x: bullet.position.x, y: bullet.position.y });
              actor.hp -= ATTACK;//玩家扣血 计算公式要*一个攻击系数
              break;
            }
          }
          //判断是否超出地图边界 超出则销毁 
          if (Math.abs(bullet.position.x) > MAP_WIDTH / 2 || Math.abs(bullet.position.y) > MAP_HEIGHT / 2) {
            this.state.bullets.splice(this.state.bullets.indexOf(bullet), 1);
            EventManager.Instance.emit(EventEnum.ExplosionBorn, bullet.id, { x: bullet.position.x, y: bullet.position.y });
          }
        }
      }
      default:
        break;
    }
  }

}
