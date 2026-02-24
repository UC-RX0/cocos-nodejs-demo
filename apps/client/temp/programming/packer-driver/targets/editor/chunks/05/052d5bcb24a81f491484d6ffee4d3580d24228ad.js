System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, instantiate, Node, Prefab, NetworkManager, ApiMsgEnum, PlayerManager, DataManager, SceneEnum, deepClone, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, RoomManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfNetworkManager(extras) {
    _reporterNs.report("NetworkManager", "../Global/NetworkManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfApiMsgEnum(extras) {
    _reporterNs.report("ApiMsgEnum", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMsgRoom(extras) {
    _reporterNs.report("IMsgRoom", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIMsgRoomStart(extras) {
    _reporterNs.report("IMsgRoomStart", "../Common", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPlayerManager(extras) {
    _reporterNs.report("PlayerManager", "../UI/PlayerManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSceneEnum(extras) {
    _reporterNs.report("SceneEnum", "../Enum", _context.meta, extras);
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
      director = _cc.director;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      NetworkManager = _unresolved_2.NetworkManager;
    }, function (_unresolved_3) {
      ApiMsgEnum = _unresolved_3.ApiMsgEnum;
    }, function (_unresolved_4) {
      PlayerManager = _unresolved_4.PlayerManager;
    }, function (_unresolved_5) {
      DataManager = _unresolved_5.default;
    }, function (_unresolved_6) {
      SceneEnum = _unresolved_6.SceneEnum;
    }, function (_unresolved_7) {
      deepClone = _unresolved_7.deepClone;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7785dj9yPpAV7OGQ9gY6l5q", "RoomManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'instantiate', 'Node', 'Prefab']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("RoomManager", RoomManager = (_dec = ccclass('RoomManager'), _dec2 = property(Node), _dec3 = property(Prefab), _dec(_class = (_class2 = class RoomManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "PlayerList", _descriptor, this);

          _initializerDefineProperty(this, "PlayerPrefab", _descriptor2, this);
        }

        onLoad() {
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.listenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgRoomStart, this.handleStart, this);
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.listenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgRoom, this.renderPlayer, this);
        }

        start() {
          this.renderPlayer({
            Room: (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.roomInfo
          });
        }

        onDestroy() {
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.unListenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgRoom, this.renderPlayer, this);
          (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.unListenMsg((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).MsgRoomStart, this.handleStart, this);
        }

        renderPlayer({
          Room: {
            players: Players
          }
        }) {
          for (const c of this.PlayerList.children) {
            c.active = false;
          }

          while (this.PlayerList.children.length < Players.length) {
            const c = instantiate(this.PlayerPrefab);
            c.active = false;
            c.parent = this.PlayerList;
          }

          for (let i = 0; i < Players.length; i++) {
            const data = Players[i];
            const node = this.PlayerList.children[i];
            node.getComponent(_crd && PlayerManager === void 0 ? (_reportPossibleCrUseOfPlayerManager({
              error: Error()
            }), PlayerManager) : PlayerManager).init(data);
          }
        }

        async handleLeaveRoom() {
          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiRoomLeave, {});

          if (!success) {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.roomInfo = null;
            console.log("退出房间成功", res);
            director.loadScene((_crd && SceneEnum === void 0 ? (_reportPossibleCrUseOfSceneEnum({
              error: Error()
            }), SceneEnum) : SceneEnum).Hall);
          } else {
            console.log("退出房间失败", error);
          }
        }

        async handleStartGame() {
          const {
            success,
            error,
            res
          } = await (_crd && NetworkManager === void 0 ? (_reportPossibleCrUseOfNetworkManager({
            error: Error()
          }), NetworkManager) : NetworkManager).Instance.callApi((_crd && ApiMsgEnum === void 0 ? (_reportPossibleCrUseOfApiMsgEnum({
            error: Error()
          }), ApiMsgEnum) : ApiMsgEnum).ApiRoomStart, {});

          if (!success) {
            console.log("开始游戏成功", res);
          } else {
            console.log("开始游戏失败", error);
          }
        }

        handleStart({
          state
        }) {
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state = state;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.lasteState = (_crd && deepClone === void 0 ? (_reportPossibleCrUseOfdeepClone({
            error: Error()
          }), deepClone) : deepClone)(state);
          director.loadScene((_crd && SceneEnum === void 0 ? (_reportPossibleCrUseOfSceneEnum({
            error: Error()
          }), SceneEnum) : SceneEnum).Battle);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PlayerList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "PlayerPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=052d5bcb24a81f491484d6ffee4d3580d24228ad.js.map