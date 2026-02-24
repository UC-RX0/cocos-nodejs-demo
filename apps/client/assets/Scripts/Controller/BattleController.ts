import { Prefab, SpriteFrame } from "cc";
import DataManager from "../Global/DataManager";
import { ResourceManager } from "../Global/ResourceManager";
import { JoyStickManager } from "../UI/JoyStickManager";
import { ActorManager } from "../Entity/Actor/ActorManager";
import { EntityTypeEnum, IActor, IBullet } from "../Common";
import { PrefabPathEnum, TexturePathEnum } from "../Enum";
import { BulletManager } from "../Entity/Bullet/BulletManager";



export interface renderActorData {
    data: IActor;
    prefab: Prefab;
}
export interface renderBulletData {
    data: IBullet;
    prefab: Prefab;
}

export class BattleController {
    static setJoyStickData(joyStickData: JoyStickManager) {
        DataManager.Instance.jm = joyStickData;
    }
    static renderActor(): renderActorData {
        for (const data of DataManager.Instance.state.actor) {
            const { id, Type } = data;
            const actor = DataManager.Instance.actorMap.get(id);
            if (!actor) {
                const actorPrefab = DataManager.Instance.prefabMap.get(Type);
                if (actorPrefab) {
                    const render: renderActorData = {
                        data: data,
                        prefab: actorPrefab
                    }
                    return render;
                }
            }
            else {
                actor.render(data);
            }
        }
        return null
    }

    static renderBullet(): renderBulletData | null {
        for (const data of DataManager.Instance.state.bullets) {
            const { id, bulletType } = data;
            const bullet = DataManager.Instance.bulletMap.get(id);
            if (!bullet) {
                const bulletPrefab = DataManager.Instance.prefabMap.get(bulletType);
                if (bulletPrefab) {
                    const render: renderBulletData = {
                        data: data,
                        prefab: bulletPrefab
                    }
                    return render;
                }
            }
            else {
                bullet.render(data);
            }
        }
        return null;
    }
    static initMap(): Prefab {
        //地图初始化
        const mapPrefab = DataManager.Instance.prefabMap.get(EntityTypeEnum.Map);
        if (!mapPrefab) {
            console.error("Map prefab not found! EntityTypeEnum.Map:", EntityTypeEnum.Map);
            // 可以返回一个默认值或者抛出明确错误
            throw new Error(`Map prefab not found for type: ${EntityTypeEnum.Map}`);
        }
        return mapPrefab;
    }
    //加载资源
    static loadRes() {
        const list = []
        for (const type in EntityTypeEnum) {
            const p = ResourceManager.Instance.loadRes(PrefabPathEnum[type], Prefab).then((res) => DataManager.Instance.setprefabMap(type, res));
            list.push(p);
        }
        for (const type in TexturePathEnum) {
            const p = ResourceManager.Instance.loadDir(TexturePathEnum[type], SpriteFrame).then((res) => DataManager.Instance.setTextureMap(type, res));
            list.push(p);
        }
        return list
    }
    static setActorManager(id: number, actor: ActorManager) {
        DataManager.Instance.setActorManager(id, actor);
    }
    static setBulletManager(id: number, bullet: BulletManager) {
        DataManager.Instance.setBulletManager(id, bullet);
    }
}