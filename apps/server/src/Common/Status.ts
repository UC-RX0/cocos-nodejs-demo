
import { EntityTypeEnum, InputTypeEnum } from "./Enum"
export interface IBullet {
    id: number,
    owner: number,
    position: IVec2,
    direction: IVec2,
    bulletType: EntityTypeEnum
}

export interface IActor {
    id: number,
    position: IVec2,
    direction: IVec2,
    Type: EntityTypeEnum
    weaponType: EntityTypeEnum
    bulletType: EntityTypeEnum
    hp: number
}
export interface IVec2 {
    x: number,
    y: number
}
export type clientInput = IActorMove | IWeaponShoot | ITimePast
//ActorManager用于封装的数据集
export interface IActorMove {
    id: number,
    type: InputTypeEnum.ActorMove,
    direction: IVec2,
    dt: number
}
//WeaponManager用于封装的数据集
export interface IWeaponShoot {
    owner: number,
    type: InputTypeEnum.WeaponShoot,
    position: IVec2,
    direction: IVec2,
}

export interface ITimePast {
    type: InputTypeEnum.TimePast,
    dt: number
}


//DataManager用于封装的数据集
export interface Istate {
    actor: IActor[]
    bullets: IBullet[]
    nextBulletID: number
}
