

import Singleton from "../Base/Singleton";
import { EntityTypeEnum } from "../Common";
import { EventEnum } from "../Enum";
import { instantiate, Node } from "cc";
import DataManager from "./DataManager";
export default class ObjectPoolManager extends Singleton {
    static get Instance() {
        return super.GetInstance<ObjectPoolManager>();
    }

    private ObjectPool: Node
    private map: Map<EntityTypeEnum, Node[]> = new Map();

    get(type: EntityTypeEnum) {
        if (!this.ObjectPool) {
            this.ObjectPool = new Node("ObjectPool")
            this.ObjectPool.setParent(DataManager.Instance.stage)
        }
        if (!this.map.has(type)) {
            this.map.set(type, [])
            const container = new Node(type + 'Pool')
            container.setParent(this.ObjectPool)
        }
        const nodes = this.map.get(type)
        if (!nodes.length) {
            const prefab = DataManager.Instance.prefabMap.get(type)
            const node = instantiate(prefab)
            node.name = type;
            node.active = true
            node.setParent(this.ObjectPool.getChildByName(type + 'Pool'))
            return node
        } else {
            const node = nodes.pop()
            node.active = true
            return node
        }

    }
    ret(node: Node) {
        node.active = false;
        this.map.get(node.name as EntityTypeEnum).push(node)
    }
}
