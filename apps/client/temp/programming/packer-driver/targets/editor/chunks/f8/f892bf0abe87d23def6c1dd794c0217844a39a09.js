System.register(["cc", "__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, JsonAsset, Node, director, CCBoolean, NodeStatus, BehaviorEditor, BehaviorManager, BehaviorSource, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, ccclass, property, requireComponent, BehaviorTreeEvent, BehaviorTree;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      JsonAsset = _cc.JsonAsset;
      Node = _cc.Node;
      director = _cc.director;
      CCBoolean = _cc.CCBoolean;
    }, function (_unresolved_) {
      NodeStatus = _unresolved_.NodeStatus;
    }, function (_unresolved_2) {
      BehaviorEditor = _unresolved_2.BehaviorEditor;
    }, function (_unresolved_3) {
      BehaviorManager = _unresolved_3.BehaviorManager;
    }, function (_unresolved_4) {
      BehaviorSource = _unresolved_4.BehaviorSource;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "38f09FxgVVNk6MmAtCrkZQI", "BehaviorTree", undefined);

      __checkObsolete__(['_decorator', 'Component', 'JsonAsset', 'Node', 'director', 'CCBoolean']);

      ({
        ccclass,
        property,
        requireComponent
      } = _decorator);

      _export("BehaviorTreeEvent", BehaviorTreeEvent = /*#__PURE__*/function (BehaviorTreeEvent) {
        BehaviorTreeEvent[BehaviorTreeEvent["BehaviorTreeStart"] = 0] = "BehaviorTreeStart";
        BehaviorTreeEvent[BehaviorTreeEvent["BehaviorTreeEnd"] = 1] = "BehaviorTreeEnd";
        return BehaviorTreeEvent;
      }({}));
      /***
       * 用户真正使用的组件，用来设置单个行为树的运行参数
       */


      _export("BehaviorTree", BehaviorTree = (_dec = ccclass("BehaviorTree"), _dec2 = requireComponent(BehaviorEditor), _dec3 = property(JsonAsset), _dec4 = property(CCBoolean), _dec5 = property(CCBoolean), _dec6 = property(CCBoolean), _dec7 = property(CCBoolean), _dec(_class = _dec2(_class = (_class2 = class BehaviorTree extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "asset", _descriptor, this);

          _initializerDefineProperty(this, "restartWhenComplete", _descriptor2, this);

          _initializerDefineProperty(this, "startWhenEnabled", _descriptor3, this);

          /***
           * true：节点失活的时候，行为树会保留，仅暂停运行
           * false：节点失活的时候，行为树直接删除
           */
          _initializerDefineProperty(this, "pauseWhenDisabled", _descriptor4, this);

          _initializerDefineProperty(this, "logNodeChange", _descriptor5, this);

          // 是否被暂停运行了（未开始执行的行为树或者被删除的树都不属于暂停）
          this.isPaused = false;
          // 是否执行完start生成周期，防止start和onEnable重复执行enableBehavior
          this.isInit = false;
          this.behaviorSource = new BehaviorSource();
          this.map = new Map();
          // 当前行为树状态
          this.status = NodeStatus.Inactive;
        }

        onLoad() {
          // 解析json文件
          this.behaviorSource.parse(this.asset.json);
        }
        /***
         * 仅enableBehavior和disableBehavior属于供用户在自定义脚本中管理单个行为树的方法
         * 其他方法请勿使用
         */


        enableBehavior() {
          this.createBehaviorManager();

          if (BehaviorManager.instance) {
            BehaviorManager.instance.enableBehavior(this);
          }
        }

        disableBehavior(pause = this.pauseWhenDisabled) {
          if (BehaviorManager.instance) {
            BehaviorManager.instance.disableBehavior(this, pause);
            this.isPaused = pause;
          }
        }

        start() {
          if (this.startWhenEnabled) {
            this.enableBehavior();
          }

          this.isInit = true;
        }

        onEnable() {
          if (!this.isInit) {
            return;
          } // 运行被暂停或者startWhenEnabled的树


          if (this.isPaused || this.startWhenEnabled) {
            this.enableBehavior();
            this.isPaused = false;
          }
        }

        onDisable() {
          this.disableBehavior();
        }

        createBehaviorManager() {
          if (!BehaviorManager.instance) {
            const node = new Node("BehaviorManager");
            BehaviorManager.instance = node.addComponent(BehaviorManager);
            director.getScene().addChild(node);
          }
        }
        /***
         * 发布订阅
         */


        on(event, cb, ctx) {
          if (this.map.has(event)) {
            this.map.get(event).push({
              cb,
              ctx
            });
          } else {
            this.map.set(event, [{
              cb,
              ctx
            }]);
          }
        }

        off(event, cb, ctx) {
          if (this.map.has(event)) {
            const index = this.map.get(event).findIndex(i => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(event).splice(index, 1);
          }
        }

        emit(event, ...params) {
          if (this.map.has(event)) {
            this.map.get(event).forEach(({
              cb,
              ctx
            }) => {
              cb.apply(ctx, params);
            });
          }
        }

        clear() {
          this.map.clear();
        }
        /***
         * 插件面板初始化时调用
         */


        async getAssetUrl() {
          if (!this.asset) {
            return;
          }

          const uuid = this.asset._uuid; // 获取当前json的url

          const url = await Editor.Message.request("asset-db", "query-url", uuid);
          return url;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "asset", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "restartWhenComplete", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "startWhenEnabled", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pauseWhenDisabled", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "logNodeChange", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=f892bf0abe87d23def6c1dd794c0217844a39a09.js.map