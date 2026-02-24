System.register(["cc", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cclegacy, Composite, NodeStatus, btclass, _dec, _class, RandomSequence;

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
      _cclegacy._RF.push({}, "f6be9CAQA1OCqV8yw0IP0VN", "RandomSequence", undefined);

      _export("default", RandomSequence = (_dec = btclass("RandomSequence"), _dec(_class = class RandomSequence extends Composite {
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
          return Boolean(this.executionOrder.length) && this.status !== NodeStatus.Failure;
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
//# sourceMappingURL=73bceb752c18d6c3df0cfb3f19dc3933dc14aa15.js.map