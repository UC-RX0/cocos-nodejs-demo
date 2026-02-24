import { nodeClsMap } from './../../../extensions/Behavior Eden/src/runtime/core/decorator';
import { Prefab } from 'cc';
export enum FsmParamTypeEnum {
  Number = "Number",
  Trigger = "Trigger",
}

export enum ParamsNameEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum EventEnum {
  WeaponShoot = "WeaponShoot",
  ExplosionBorn = "ExplosionBorn",
  BulletBorn = 'BulletBorn',
  ClientSync = "ClientSync",
  JoinRoom = 'JoinRoom',
}

export enum PrefabPathEnum {
  Map = 'Prefab/Map',
  Actor1 = 'Prefab/Actor',
  Weapon1 = 'Prefab/Weapon1',
  Bullet1 = 'Prefab/Bullet1',
  Bullet2 = 'Prefab/Bullet2',
  Explosion = 'Prefab/Explosion',
}
export enum TexturePathEnum {
  Actor1Idle = 'texture/actor/actor1/idle',
  Actor1Run = 'texture/actor/actor1/run',
  Weapon1Idle = 'texture/weapon/weapon1/idle',
  Weapon1Attack = 'texture/weapon/weapon1/attack',
  Bullet1Idle = 'texture/bullet/bullet1',
  Bullet2Idle = 'texture/bullet/bullet2',
  ExplosionIdle = 'texture/explosion',
}
export enum EntityStateEnum {
  Idle = "Idle",
  Run = "Run",
  Attack = "Attack",
}

export enum SceneEnum {
  Login = "Login",
  Battle = "Battle",
  Hall = "Hall",
  Room = 'Room',
}