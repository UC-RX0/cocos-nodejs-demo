System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, DataManager, JoyStickManager, BattleController, ActorManager, BulletManager, ApiMsgEnum, InputTypeEnum, ObjectPoolManager, NetworkManager, EventManager, EventEnum, deepClone, _dec, _class, _crd, ccclass, property, BattleManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJoyStickManager(extras) {
    _reporterNs.report("JoyStickManager", "../UI/JoyStickManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBattleController(extras) {
    _reporterNs.report("BattleController", "../Controller/BattleController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActorManager(extras) {
    _reporterNs.report("ActorManager", "../Entity/Actor/ActorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBulletManager(extras) {
    _reporterNs.report("BulletManager", "../Entity/Bullet/BulletManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfApiMsgEnum(extras) {
    _reporterNs.report("ApiMsgEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclientInput(extras) {
    _reporterNs.report("clientInput", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMsgClientSync(extras) {
    _reporterNs.report("IMsgClientSync", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMsgServerSync(extras) {
    _reporterNs.report("IMsgServerSync", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputTypeEnum(extras) {
    _reporterNs.report("InputTypeEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectPoolManager(extras) {
    _reporterNs.report("ObjectPoolManager", "../Global/ObjectPoolManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfNetworkManager(extras) {
    _reporterNs.report("NetworkManager", "../Global/NetworkManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../Global/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfdeepClone(extras) {
    _reporterNs.report("deepClone", "../Utils", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      JoyStickManager = _unresolved_3.JoyStickManager;
    }, function (_unresolved_4) {
      BattleController = _unresolved_4.BattleController;
    }, function (_unresolved_5) {
      ActorManager = _unresolved_5.ActorManager;
    }, function (_unresolved_6) {
      BulletManager = _unresolved_6.BulletManager;
    }, function (_unresolved_7) {
      ApiMsgEnum = _unresolved_7.ApiMsgEnum;
      InputTypeEnum = _unresolved_7.InputTypeEnum;
    }, function (_unresolved_8) {
      ObjectPoolManager = _unresolved_8.default;
    }, function (_unresolved_9) {
      NetworkManager = _unresolved_9.NetworkManager;
    }, function (_unresolved_10) {
      EventManager = _unresolved_10.default;
    }, function (_unresolved_11) {
      EventEnum = _unresolved_11.EventEnum;
    }, function (_unresolved_12) {
      deepClone = _unresolved_12.deepClone;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0cf3cO10QJHw6OzqQhSAQs8", "BattleManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventTouch', 'input', 'Input', 'instantiate', 'Node', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BattleManager", BattleManager = (_dec = ccclass('BattleManager'), _dec(_class = class BattleManager extends Component {
        constructor(...args) {
          super(...args);
          this.stage = null;
          this.ui = null;
          this._JoyStickData = null;
          this.pendingInputs = [];
          this.isFinish = false;
        }

        async start() {
          this.clearGame(); //网络模块
          //游戏模块

          const list = (_crd && BattleController === void 0 ? (_reportPossibleCrUseOfBattleController({
            error: Error()
          }), BattleController) : BattleController).loadRes();
          await Promise.all([...list, this.connectServer()]);
          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiPlayerJoin, {
            nickname: "player1"
          });

          if (!success) {
            console.error(error);
            return;
          }

          console.log('ApiPlayerJoin', res);
          this.initGame();
        }

        clearGame() {
          var _this$node, _this$node2;

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.stage = this.stage = (_this$node = this.node) == null ? void 0 : _this$node.getChildByName("Stage");
          this.ui = (_this$node2 = this.node) == null ? void 0 : _this$node2.getChildByName("UI");
          this.stage.destroyAllChildren();
        }

        initGame() {
          this._JoyStickData = this.ui.getComponentInChildren(_crd && JoyStickManager === void 0 ? (_reportPossibleCrUseOfJoyStickManager({
            error: Error()
          }), JoyStickManager) : JoyStickManager);
          (_crd && BattleController === void 0 ? (_reportPossibleCrUseOfBattleController({
            error: Error()
          }), BattleController) : BattleController).setJoyStickData(this._JoyStickData);
          this.initMap();
          this.isFinish = true;
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.on((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).ClientSync, this.handleClientSync, this);
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.listenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgServerSync, this.handleServerSync, this);
        }

        onDestroy() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.off((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).ClientSync, this.handleClientSync, this);
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.unListenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgServerSync, this.handleServerSync, this);
        }

        async connectServer() {
          //连接服务器
          if (!(await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.connect().catch(() => false))) {
            await new Promise(resolve => setTimeout(resolve, 1000)); //等待1秒

            await this.connectServer();
          }
        }

        initMap() {
          //地图初始化
          const mapPrefab = (_crd && BattleController === void 0 ? (_reportPossibleCrUseOfBattleController({
            error: Error()
          }), BattleController) : BattleController).initMap();
          const map = instantiate(mapPrefab);
          this.stage.addChild(map);
        }

        update(dt) {
          if (!this.isFinish) return;
          this.renderActor();
          this.renderBullet();
          this.tick(dt);
        }

        tick(dt) {
          this.tickActor(dt); // DataManager.Instance.applyInput({
          //     type: InputTypeEnum.TimePast,
          //     dt
          // });
        }
        /**
         * @description 从state中获取已经在游戏中的玩家信息,然后触发他们的tick(更新玩家信息)
         * @param dt 
         */


        tickActor(dt) {
          for (const data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.actor) {
            const actor = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.actorMap.get(data.id);

            if (actor) {
              actor.tick(dt);
            }
          }
        }

        renderActor() {
          const renderActorData = (_crd && BattleController === void 0 ? (_reportPossibleCrUseOfBattleController({
            error: Error()
          }), BattleController) : BattleController).renderActor(); // const renderBulletData = BattleController.renderBullet();
          //如若为空，代表actorMap已经存在键值对(代表已经存在了该actor),则由Controller直接触发渲染,不需要Manager渲染

          if (!renderActorData) return;
          const {
            data,
            prefab
          } = renderActorData;
          const actor = instantiate(prefab);
          this.stage.addChild(actor);
          const am = actor.addComponent(_crd && ActorManager === void 0 ? (_reportPossibleCrUseOfActorManager({
            error: Error()
          }), ActorManager) : ActorManager);
          (_crd && BattleController === void 0 ? (_reportPossibleCrUseOfBattleController({
            error: Error()
          }), BattleController) : BattleController).setActorManager(data.id, am);
          am.init(data); // console.log('here1');
        }
        /**
        * @description 渲染游戏中所有子弹的方法
        * 负责子弹的创建、初始化和状态更新
        */


        renderBullet() {
          const renderBulletData = (_crd && BattleController === void 0 ? (_reportPossibleCrUseOfBattleController({
            error: Error()
          }), BattleController) : BattleController).renderBullet(); // 如果为空，代表bulletMap已经存在键值对(代表已经存在了该bullet),则由Controller直接触发渲染,不需要Manager渲染

          if (!renderBulletData) return;
          const {
            data
          } = renderBulletData;
          const bullet = (_crd && ObjectPoolManager === void 0 ? (_reportPossibleCrUseOfObjectPoolManager({
            error: Error()
          }), ObjectPoolManager) : ObjectPoolManager).Instance.get(data.bulletType);
          const bm = bullet.addComponent(_crd && BulletManager === void 0 ? (_reportPossibleCrUseOfBulletManager({
            error: Error()
          }), BulletManager) : BulletManager);
          (_crd && BattleController === void 0 ? (_reportPossibleCrUseOfBattleController({
            error: Error()
          }), BattleController) : BattleController).setBulletManager(data.id, bm);
          bm.init(data);
        }
        /**
         * @description 处理服务器同步的actor数据
         * @param data 服务器同步的actor数据
         */


        handleClientSync(input) {
          const msg = {
            input,
            frameId: (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.frameID++
          };
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.sentMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgClientSync, msg);

          if (input.type === (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
            error: Error()
          }), InputTypeEnum) : InputTypeEnum).ActorMove) {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.applyInput(input);
            this.pendingInputs.push(msg);
          }
        }

        handleServerSync({
          inputs,
          lastFrameId
        }) {
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.lasteState;

          for (const input of inputs) {
            // 应用服务器输入 有Bug 移动出现问题
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.applyInput(input);
          }

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.lasteState = (_crd && deepClone === void 0 ? (_reportPossibleCrUseOfdeepClone({
            error: Error()
          }), deepClone) : deepClone)((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state);
          this.pendingInputs = this.pendingInputs.filter(item => item.frameId > lastFrameId);

          for (const item of this.pendingInputs) {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.applyInput(item.input);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=438870a8705d9305583264a58c656042c779bb0b.js.map