System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Decorator, NodeStatus, btclass, _dec, _class, Repeater;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      Decorator = _unresolved_.Decorator;
      NodeStatus = _unresolved_.NodeStatus;
    }, function (_unresolved_2) {
      btclass = _unresolved_2.btclass;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "6067cYaIXBJ3pSo8XPnmeUT", "Repeater", undefined);

      _export("Repeater", Repeater = (_dec = btclass("Repeater"), _dec(_class = class Repeater extends Decorator {
        constructor() {
          super(...arguments);
          this.repeatCount = Infinity;
          this.curCount = 0;
          this.endOnFailure = true;
        }

        /***
         * 参数未来可以通过Shared Variable，这期就不做了
         */
        // constructor(children: Array<Node>, repeatCount = Infinity, endOnFailure = false) {
        //   super(children);
        //   this.repeatCount = repeatCount;
        //   this.endOnFailure = endOnFailure;
        // }
        canExecute() {
          return this.curCount < this.repeatCount && (!this.endOnFailure || this.endOnFailure && this.status !== NodeStatus.Failure);
        }

        onChildExecuted(status, _) {
          this.curCount++;
          this.status = status;
        }

        onStart() {
          super.onStart();
          this.curCount = 0;
        }

      }) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=c6015aec100957d783894821e9da571d5b747aea.js.map