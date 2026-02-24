System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Composite, NodeStatus, btclass, _dec, _class, RandomSelector;

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
      _cclegacy._RF.push({}, "ff11cnvOPtDC5bGOYvqZq+Y", "RandomSelector", undefined);

      _export("default", RandomSelector = (_dec = btclass("RandomSelector"), _dec(_class = class RandomSelector extends Composite {
        constructor(...args) {
          super(...args);
          this.executionOrder = [];
        }

        get index() {
          return this.executionOrder[this.executionOrder.length - 1];
        }

        onStart() {
          super.onStart();
          this.shuffle();
        }

        canExecute() {
          return Boolean(this.executionOrder.length) && this.status !== NodeStatus.Success;
        }

        onChildExecuted(status, _) {
          this.executionOrder.pop();
          this.status = status;
        }

        onConditionalAbort() {
          this.executionOrder = [];
          this.status = NodeStatus.Inactive;
          this.shuffle();
        }

        shuffle() {
          this.executionOrder = [];
          const indexList = Array.from({
            length: this.children.length
          }, (e, i) => i);

          for (let i = indexList.length - 1; i >= 0; i--) {
            const num = Math.floor(Math.random() * indexList.length);
            this.executionOrder.push(indexList.splice(num, 1)[0]);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=dd84191c049bbf54939cea70cd8bf8e747371534.js.map