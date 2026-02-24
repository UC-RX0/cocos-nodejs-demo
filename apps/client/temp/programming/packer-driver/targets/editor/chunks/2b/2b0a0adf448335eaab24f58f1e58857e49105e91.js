System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Singleton, instantiate, Node, DataManager, ObjectPoolManager, _crd;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "./DataManager", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }, function (_unresolved_3) {
      DataManager = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3876frSf9BGPZ1ym103Ngz4", "ObjectPoolManager", undefined);

      __checkObsolete__(['instantiate', 'Node']);

      _export("default", ObjectPoolManager = class ObjectPoolManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
          this.ObjectPool = void 0;
          this.map = new Map();
        }

        static get Instance() {
          return super.GetInstance();
        }

        get(type) {
          if (!this.ObjectPool) {
            this.ObjectPool = new Node("ObjectPool");
            this.ObjectPool.setParent((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.stage);
          }

          if (!this.map.has(type)) {
            this.map.set(type, []);
            const container = new Node(type + 'Pool');
            container.setParent(this.ObjectPool);
          }

          const nodes = this.map.get(type);

          if (!nodes.length) {
            const prefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.prefabMap.get(type);
            const node = instantiate(prefab);
            node.name = type;
            node.active = true;
            node.setParent(this.ObjectPool.getChildByName(type + 'Pool'));
            return node;
          } else {
            const node = nodes.pop();
            node.active = true;
            return node;
          }
        }

        ret(node) {
          node.active = false;
          this.map.get(node.name).push(node);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2b0a0adf448335eaab24f58f1e58857e49105e91.js.map