System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Singleton, NetworkManager, _crd;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIModel(extras) {
    _reporterNs.report("IModel", "../Common", _context.meta, extras);
  }

  _export("NetworkManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1d80dQOL6lH07pycx5uZLKL", "NetworkManager", undefined);

      __checkObsolete__(['_decorator', 'resources', 'Asset']);

      _export("NetworkManager", NetworkManager = class NetworkManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          this.port = 9876;
          this.socket = void 0;
          //统一通信管道
          this.map = new Map();
          this.inConnection = false;
        }

        static get Instance() {
          return super.GetInstance();
        }

        connect() {
          return new Promise((resolve, reject) => {
            if (this.inConnection) {
              resolve(true);
              return;
            }

            this.socket = new WebSocket("ws://localhost:" + this.port);

            this.socket.onopen = () => {
              this.inConnection = true;
              console.log("连接成功");
              resolve(this.socket);
            };

            this.socket.onclose = event => {
              this.inConnection = false;
              console.log("连接关闭", event);
              reject(event);
            };

            this.socket.onerror = event => {
              this.inConnection = false;
              console.log("连接错误", event);
              reject(event);
            };

            this.socket.onmessage = event => {
              try {
                // console.log("收到消息", event.data);
                var {
                  name,
                  data
                } = JSON.parse(event.data);

                if (this.map.has(name)) {
                  this.map.get(name).forEach(_ref => {
                    var {
                      cb,
                      ctx
                    } = _ref;
                    cb.call(ctx, data);
                  });
                }
              } catch (error) {
                console.log("解析消息错误", error);
              }
            };
          });
        }
        /**
         * @description 调用接口
         * @param name 接口名称
         * @param data 接口参数
         * @returns 
         */


        callApi(name, data) {
          return new Promise(resolve => {
            try {
              var time = setTimeout(() => {
                resolve({
                  success: false,
                  error: new Error("超时")
                });
                this.unListenMsg(name, rs, null);
              }, 5000);

              var rs = res => {
                resolve(res);
                clearTimeout(time);
                this.unListenMsg(name, rs, null);
              };

              this.listenMsg(name, rs, null);
              this.sentMsg(name, data);
            } catch (error) {
              resolve({
                success: false,
                error
              });
            }
          });
        }

        sentMsg(name, data) {
          var msg = JSON.stringify({
            name,
            data
          });
          this.socket.send(msg);
        }

        listenMsg(name, cb, ctx) {
          if (this.map.has(name)) {
            this.map.get(name).push({
              cb,
              ctx
            });
          } else {
            this.map.set(name, [{
              cb,
              ctx
            }]);
          }
        }

        unListenMsg(name, cb, ctx) {
          if (this.map.has(name)) {
            var index = this.map.get(name).findIndex(i => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(name).splice(index, 1);
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1c00cecae125c2d635b5a95c4be8f37841aafece.js.map