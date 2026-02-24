System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Composite, NodeStatus, btclass, _dec, _class, Sequence;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_) {
      Composite = _unresolved_.Composite;
      NodeStatus = _unresolved_.NodeStatus;
    }, function (_unresolved_2) {
      btclass = _unresolved_2.btclass;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "72117Pa+BJMTq81/U90h6YC", "Sequence", undefined);

      _export("default", Sequence = (_dec = btclass("Sequence"), _dec(_class = class Sequence extends Composite {
        onStart() {
          super.onStart();
          this.index = 0;
        }

        canExecute() {
          return this.index < this.children.length && this.status !== NodeStatus.Failure;
        }

        onChildExecuted(status, _) {
          this.index++;
          this.status = status;
        }

        onConditionalAbort(index) {
          this.index = index;
          this.status = NodeStatus.Inactive;
        }

      }) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=564daa026822640e4f312a808013d3f727fde877.js.map