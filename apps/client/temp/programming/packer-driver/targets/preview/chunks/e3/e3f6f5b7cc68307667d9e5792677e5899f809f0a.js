System.register(["cc", "__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, AbortType, Composite, Condition, Decorator, NodeStatus, ParentNode, BehaviorTreeEvent, bfsCcNode, BehaviorTree, ConditionalReevaluate, _dec, _class, _class2, ccclass, BehaviorManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
    }, function (_unresolved_) {
      AbortType = _unresolved_.AbortType;
      Composite = _unresolved_.Composite;
      Condition = _unresolved_.Condition;
      Decorator = _unresolved_.Decorator;
      NodeStatus = _unresolved_.NodeStatus;
      ParentNode = _unresolved_.ParentNode;
    }, function (_unresolved_2) {
      BehaviorTreeEvent = _unresolved_2.BehaviorTreeEvent;
    }, function (_unresolved_3) {
      bfsCcNode = _unresolved_3.bfsCcNode;
    }],
    execute: function () {
      _cclegacy._RF.push({}, "32f3aMcGC5MzJawt3szOkln", "BehaviorManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director']);

      ({
        ccclass
      } = _decorator);
      /***
       * 该组件会自动添加到场景上，用来驱动、管理场景中所有行为树
       */

      _export("BehaviorManager", BehaviorManager = (_dec = ccclass("BehaviorManager"), _dec(_class = (_class2 = class BehaviorManager extends Component {
        constructor() {
          super(...arguments);
          this.behaviorTrees = [];
          // behavior是用户使用的组件，BehaviorTree是真正的行为树数据结构
          this.behaviorTreesMap = new Map();
          // 存储被暂停运行的行为树
          this.pausedBehaviorTreesMap = new Map();
        }

        restart(behaviorTree) {
          if (behaviorTree.behavior.logNodeChange) {
            console.log("restart", behaviorTree);
          } // 所有节点都popNode出去以后，未删除的条件重评估的compositeIndex都为-1


          this.removeChildConditionalReevaluate(behaviorTree, -1);
          this.pushNode(behaviorTree, 0, 0);
        } // 防止用户手动创建实例但没有设置instance


        onLoad() {
          BehaviorManager.instance = this;
        }

        onDestroy() {
          for (var behaviorTree of this.behaviorTrees) {
            this.disableBehavior(behaviorTree.behavior);
          }
        }
        /***
         * 不传isPause的话，默认删掉行为树
         */


        disableBehavior(behavior, isPause) {
          if (isPause === void 0) {
            isPause = false;
          }

          var behaviorTree = this.behaviorTreesMap.get(behavior);

          if (!behaviorTree) {
            return;
          }

          if (isPause) {
            // 存进暂停map里
            this.pausedBehaviorTreesMap.set(behavior, behaviorTree);
            behaviorTree.behavior.status = NodeStatus.Inactive; //设置为未激活状态
          } else {
            // 如果是手动disabled的话，让剩下的节点popNode，并不断迭代这个状态作为最终行为树的状态
            var _status = NodeStatus.Success;

            for (var i = behaviorTree.activeStack.length - 1; i >= 0; i--) {
              var curStack = behaviorTree.activeStack[i];

              for (var j = curStack.length - 1; j >= 0; j--) {
                _status = this.popNode(behaviorTree, curStack[curStack.length - 1], i, _status, false);
              }
            }

            behavior.status = _status;
            this.removeChildConditionalReevaluate(behaviorTree, -1);
            behavior.emit(BehaviorTreeEvent.BehaviorTreeEnd);
            this.behaviorTreesMap.delete(behavior);
          }

          var index = this.behaviorTrees.findIndex(tree => tree === behaviorTree); // 数组删除该树

          index > -1 && this.behaviorTrees.splice(index, 1);
        }

        enableBehavior(behavior) {
          var rootNode = behavior.behaviorSource.rootNode;

          if (!rootNode) {
            if (behavior.logNodeChange) {
              console.warn("该行为树没有根节点");
            }

            return;
          } // 仅被暂停的树，从map里拿出来继续运行


          if (this.pausedBehaviorTreesMap.has(behavior)) {
            var _behaviorTree = this.pausedBehaviorTreesMap.get(behavior);

            this.pausedBehaviorTreesMap.delete(behavior);
            this.behaviorTrees.push(_behaviorTree);
            this.behaviorTreesMap.set(behavior, _behaviorTree);
            return;
          } // 全新的树


          var behaviorTree = new BehaviorTree();
          behaviorTree.behavior = behavior;
          this.behaviorTrees.push(behaviorTree);
          this.behaviorTreesMap.set(behavior, behaviorTree); //填充数据结构

          behaviorTree.activeStack.push([]);
          behaviorTree.parentIndex.push(-1);
          behaviorTree.relativeChildIndex.push(-1);
          behaviorTree.parentCompositeIndex.push(-1);
          this.addToNodeList(behaviorTree, rootNode, {
            parentCompositeIndex: -1
          }); //根节点放入运行栈

          behaviorTree.behavior.emit(BehaviorTreeEvent.BehaviorTreeStart);
          behaviorTree.behavior.status = NodeStatus.Running; //根节点放入运行栈

          this.pushNode(behaviorTree, 0, 0);
        } // 数据结构填充


        addToNodeList(behaviorTree, node, data) {
          behaviorTree.nodeList.push(node);
          var index = behaviorTree.nodeList.length - 1;

          if (node instanceof ParentNode) {
            behaviorTree.childrenIndex.push([]);
            behaviorTree.childConditionalIndex.push([]);

            for (var i = 0; i < node.children.length; i++) {
              behaviorTree.parentIndex.push(index);
              behaviorTree.relativeChildIndex.push(i);
              behaviorTree.childrenIndex[index].push(behaviorTree.nodeList.length);

              if (node instanceof Composite) {
                data.parentCompositeIndex = index;
              }

              behaviorTree.parentCompositeIndex.push(data.parentCompositeIndex);
              this.addToNodeList(behaviorTree, node.children[i], data);
            }
          } else {
            behaviorTree.childrenIndex.push(null);
            behaviorTree.childConditionalIndex.push(null);

            if (node instanceof Condition) {
              var parentCompositeIndex = behaviorTree.parentCompositeIndex[index];

              if (parentCompositeIndex !== -1) {
                behaviorTree.childConditionalIndex[parentCompositeIndex].push(index);
              }
            }
          }
        }

        update() {
          this.tick();
        }
        /***
         * 驱动所有行为树
         */


        tick() {
          //遍历所有树
          for (var behaviorTree of this.behaviorTrees) {
            if (behaviorTree.behavior.logNodeChange) {
              console.log("tick", behaviorTree);
            } // 重评估条件


            this.reevaluateConditionalNode(behaviorTree); //遍历所有运行栈
            //

            for (var i = behaviorTree.activeStack.length - 1; i >= 0; i--) {
              var curStack = behaviorTree.activeStack[i];
              var prevIndex = -1;
              var prevStatus = NodeStatus.Inactive;

              while (prevStatus !== NodeStatus.Running && i < behaviorTree.activeStack.length && curStack.length) {
                var curIndex = curStack[curStack.length - 1]; // 记录前后两次，防止repeater子节点状态为success时，在一个tick里重复运行

                if (curIndex === prevIndex) {
                  break;
                }

                prevIndex = curIndex; // runNode需要传入prevStatus的原因是
                // 例如selector一个子节点是running状态，某个tick变成了success状态，子节点popNode出去
                // 下一个tick进来，栈顶元素是selector，此时canExecute为false，runParentNode没办法返回一个具体的状态
                // 此时就可以把上一个tick子节点的状态作为本次tick的selector的状态（反转节点同理）

                prevStatus = this.runNode(behaviorTree, curIndex, i, prevStatus);
              }
            }
          }
        }

        runNode(behaviorTree, index, stackIndex, prevStatus) {
          var node = behaviorTree.nodeList[index]; // 保证运行的节点在栈顶

          this.pushNode(behaviorTree, index, stackIndex);
          var status = prevStatus;

          if (node instanceof ParentNode) {
            status = this.runParentNode(behaviorTree, index, stackIndex, status); // 并行节点的状态不由某个子节点状态决定，而是由多个共同决定，所以重新计算status

            status = node.overrideStatus(status);
          } else {
            // 执行目标事件
            var res1 = node.onUpdate();
            var [done, res2] = this.emitEvent(behaviorTree, node.data, "onUpdate");
            status = done ? res2 : res1;
          } // 非running的节点pop出去


          if (status !== NodeStatus.Running) {
            status = this.popNode(behaviorTree, index, stackIndex, status);
          }

          return status;
        }

        runParentNode(behaviorTree, index, stackIndex, status) {
          var node = behaviorTree.nodeList[index]; //防止running状态的并行节点重复运行

          if (node.canRunParallelChildren() && node.overrideStatus(NodeStatus.Running) === NodeStatus.Running) {
            return status;
          }

          var childStatus = NodeStatus.Inactive;
          var preIndex = -1; //并行节点可以存在多个running状态的子节点

          while (node.canExecute() && (childStatus !== NodeStatus.Running || node.canRunParallelChildren())) {
            var childIndex = node.index; // 并行节点创建新的运行栈

            if (node.canRunParallelChildren()) {
              behaviorTree.activeStack.push([]);
              stackIndex = behaviorTree.activeStack.length - 1;
              node.onChildStarted();
            }

            var curIndex = childIndex; // 防止repeater或untilSuccess等可以重复运行的节点，canExecute一直是true，会导致一直进入while
            // 所以加入curIndex和preIndex，保证不能在一次runParentNode里重复运行相同节点

            if (curIndex === preIndex) {
              status = NodeStatus.Running;
              break;
            }

            preIndex = curIndex;
            status = childStatus = this.runNode(behaviorTree, behaviorTree.childrenIndex[index][childIndex], stackIndex, status);
          } // 子节点有运行就返回子节点的状态，没有就返回上一次运行的状态


          return status;
        }

        pushNode(behaviorTree, index, stackIndex) {
          var stack = behaviorTree.activeStack[stackIndex]; // 防止重复推入

          if (stack.length === 0 || stack[stack.length - 1] !== index) {
            stack.push(index);
            var node = behaviorTree.nodeList[index];

            if (behaviorTree.behavior.logNodeChange) {
              console.log("pushNode", node, "index:", index, "stackIndex:", stackIndex);
            }

            node.onStart();
            this.emitEvent(behaviorTree, node.data, "onStart");
          }
        }

        popNode(behaviorTree, index, stackIndex, status, popChildren) {
          if (popChildren === void 0) {
            popChildren = true;
          }

          var curStack = behaviorTree.activeStack[stackIndex];
          curStack.pop();
          var node = behaviorTree.nodeList[index];
          node.onEnd();
          this.emitEvent(behaviorTree, node.data, "onEnd");

          if (behaviorTree.behavior.logNodeChange) {
            console.log("popNode", node, "index:", index, "stackIndex:", stackIndex, "status:", status);
          }

          var parentIndex = behaviorTree.parentIndex[index];

          if (parentIndex !== -1) {
            if (node instanceof Condition) {
              var parentCompositeIndex = behaviorTree.parentCompositeIndex[index];

              if (parentCompositeIndex !== -1) {
                var composite = behaviorTree.nodeList[parentCompositeIndex]; //自己是条件节点并且父级的中断类型存在，创建重判断实例

                if (composite.abortType !== AbortType.None) {
                  // 父composite为LowerPriority时，条件重评估不希望此时执行，而是父composite popNode出去再执行
                  var _compositeIndex = composite.abortType === AbortType.LowerPriority ? -1 : parentCompositeIndex; // 防止该条件存在条件重评估对象


                  if (behaviorTree.conditionalReevaluateMap.has(index)) {
                    var conditionalReevaluate = behaviorTree.conditionalReevaluateMap.get(index);
                    conditionalReevaluate.compositeIndex = _compositeIndex;
                    conditionalReevaluate.status = status;
                  } else {
                    var _conditionalReevaluate = new ConditionalReevaluate(index, stackIndex, status, _compositeIndex);

                    if (behaviorTree.behavior.logNodeChange) {
                      console.log("new ConditionalReevaluate", _conditionalReevaluate, "index:", index, "stackIndex:", stackIndex, "compositeIndex", _compositeIndex);
                    }

                    behaviorTree.conditionalReevaluate.push(_conditionalReevaluate);
                    behaviorTree.conditionalReevaluateMap.set(index, _conditionalReevaluate);
                  }
                }
              }
            }

            var parentNode = behaviorTree.nodeList[parentIndex];
            parentNode.onChildExecuted(status, behaviorTree.relativeChildIndex[index]); // 父节点是反转节点，修改结果

            if (parentNode instanceof Decorator) {
              status = parentNode.decorate(status);
            }
          }

          if (node instanceof Composite) {
            // 类型是Self或者None时，清空所有子条件重评估，或者popNode的节点是当前运行栈的最后一项，删除该节点管理的条件重评估
            if ([AbortType.Self, AbortType.None].includes(node.abortType) || !curStack.length) {
              this.removeChildConditionalReevaluate(behaviorTree, index); // 类型是LowerPriority或者Both，上移compositeIndex，compositeIndex为-1的条件重评估对象，LowerPriority，会因此激活
            } else if ([AbortType.LowerPriority, AbortType.Both].includes(node.abortType)) {
              for (var i = 0; i < behaviorTree.childConditionalIndex[index].length; i++) {
                var childConditionalIndex = behaviorTree.childConditionalIndex[index][i];

                if (behaviorTree.conditionalReevaluateMap.has(childConditionalIndex)) {
                  var _conditionalReevaluate2 = behaviorTree.conditionalReevaluateMap.get(childConditionalIndex);

                  _conditionalReevaluate2.compositeIndex = behaviorTree.parentCompositeIndex[index];
                }
              } // 上移当前被移除的composite管理的所有条件重评估的compositeIndex


              for (var _i = 0; _i < behaviorTree.conditionalReevaluate.length; _i++) {
                var _conditionalReevaluate3 = behaviorTree.conditionalReevaluate[_i];

                if (_conditionalReevaluate3.compositeIndex === index) {
                  _conditionalReevaluate3.compositeIndex = behaviorTree.parentCompositeIndex[index];
                }
              }
            }
          }

          if (popChildren) {
            //并行节点删除其他正在运行的子节点
            for (var _i2 = behaviorTree.activeStack.length - 1; _i2 > stackIndex; _i2--) {
              var stack = behaviorTree.activeStack[_i2];

              if (stack.length > 0 && this.isParentNode(behaviorTree, index, stack[stack.length - 1])) {
                var _status2 = NodeStatus.Failure;

                for (var j = stack.length - 1; j >= 0; j--) {
                  _status2 = this.popNode(behaviorTree, stack[stack.length - 1], _i2, _status2, false);
                }
              }
            }
          } // 当前运行栈没有节点了


          if (curStack.length === 0) {
            // 当前运行栈就是主运行栈
            if (stackIndex === 0) {
              // 重启行为树
              if (behaviorTree.behavior.restartWhenComplete) {
                this.restart(behaviorTree);
              } else {
                this.disableBehavior(behaviorTree.behavior); //修改disableBehavior写入的status

                behaviorTree.behavior.status = status;
              }

              status = NodeStatus.Inactive;
            } else {
              // 删除其他空子运行栈
              behaviorTree.activeStack.splice(stackIndex, 1); // 返回running，退出tick的while循环

              status = NodeStatus.Running;
            }
          }

          return status;
        }

        reevaluateConditionalNode(behaviorTree) {
          if (behaviorTree.behavior.logNodeChange) {
            console.log("reevaluateConditionalNode start", behaviorTree.conditionalReevaluate);
          }

          for (var i = behaviorTree.conditionalReevaluate.length - 1; i >= 0; i--) {
            var {
              index: _index,
              compositeIndex: _compositeIndex2,
              status: prevStatus
            } = behaviorTree.conditionalReevaluate[i]; //父组合节点索引不存在或者故意设置为-1，不进行评估

            if (_compositeIndex2 === -1) {
              continue;
            }

            var node = behaviorTree.nodeList[_index];
            var _status3 = NodeStatus.Inactive;
            var res1 = node.onUpdate();
            var [done, res2] = this.emitEvent(behaviorTree, node.data, "onUpdate");
            _status3 = done ? res2 : res1; //条件一致

            if (_status3 === prevStatus) {
              continue;
            }

            if (behaviorTree.behavior.logNodeChange) {
              console.log("reevaluateConditionalNode success", behaviorTree.conditionalReevaluate[i]);
            }

            for (var j = behaviorTree.activeStack.length - 1; j >= 0; j--) {
              var stack = behaviorTree.activeStack[j];

              if (!stack.length) {
                continue;
              } //当前节点及他到公共父节点之间所有父节点pop出去


              var curNodeIndex = stack[stack.length - 1];
              var commonParentIndex = this.findCommonParentIndex(behaviorTree, curNodeIndex, _index); // 该条件重评估的compositeIndex是commonParent的父级

              if (this.isParentNode(behaviorTree, _compositeIndex2, commonParentIndex)) {
                // popNode可能会修改activeStack，保存一下长度，相同才执行
                var stackLen = behaviorTree.activeStack.length;

                while (curNodeIndex !== -1 && curNodeIndex !== commonParentIndex && behaviorTree.activeStack.length === stackLen) {
                  this.popNode(behaviorTree, curNodeIndex, j, NodeStatus.Failure, false);
                  curNodeIndex = behaviorTree.parentIndex[curNodeIndex];
                }
              }
            } //右边的包括自己的重评估条件删除掉


            for (var _j = behaviorTree.conditionalReevaluate.length - 1; _j >= i; _j--) {
              var conditionalReevaluate = behaviorTree.conditionalReevaluate[_j];

              if (this.isParentNode(behaviorTree, _compositeIndex2, conditionalReevaluate.index)) {
                behaviorTree.conditionalReevaluateMap.delete(conditionalReevaluate.index);
                behaviorTree.conditionalReevaluate.splice(_j, 1);
              }
            }

            var compositeNode = behaviorTree.nodeList[behaviorTree.parentCompositeIndex[_index]]; // 遍历左侧的条件重评估对象

            for (var _j2 = i - 1; _j2 >= 0; _j2--) {
              var _conditionalReevaluate4 = behaviorTree.conditionalReevaluate[_j2];

              if (behaviorTree.parentCompositeIndex[_conditionalReevaluate4.index] === behaviorTree.parentCompositeIndex[_index]) {
                // composite节点是LowerPriority，则让这些条件停止运行
                if (compositeNode.abortType === AbortType.LowerPriority) {
                  _conditionalReevaluate4.compositeIndex = -1; // composite节点是Both或者Self，条件重评估的compositeIndex等于parentCompositeIndex
                } else if ([AbortType.Both, AbortType.Self].includes(compositeNode.abortType)) {
                  _conditionalReevaluate4.index = behaviorTree.parentCompositeIndex[_index];
                }
              }
            } //当前条件节点到CommonParentNode之间所有Composite节点执行onConditionalAbort


            var conditionalParentIndex = [];

            for (var m = behaviorTree.parentIndex[_index]; m != _compositeIndex2; m = behaviorTree.parentIndex[m]) {
              conditionalParentIndex.push(m);
            }

            conditionalParentIndex.push(_compositeIndex2); //从顶部到底部的顺序执行

            for (var n = conditionalParentIndex.length - 1; n >= 0; n--) {
              var parentTask = behaviorTree.nodeList[conditionalParentIndex[n]];

              if (n === 0) {
                parentTask.onConditionalAbort(behaviorTree.relativeChildIndex[_index]);
              } else {
                parentTask.onConditionalAbort(behaviorTree.relativeChildIndex[conditionalParentIndex[n - 1]]);
              }
            }
          }
        }

        removeChildConditionalReevaluate(behaviorTree, compositeIndex) {
          for (var i = behaviorTree.conditionalReevaluate.length - 1; i >= 0; i--) {
            if (behaviorTree.conditionalReevaluate[i].compositeIndex === compositeIndex) {
              behaviorTree.conditionalReevaluateMap.delete(behaviorTree.conditionalReevaluate[i].index);
              behaviorTree.conditionalReevaluate.splice(i, 1);
            }
          }
        }

        findCommonParentIndex(behaviorTree, index1, index2) {
          var set = new Set();
          var num = index1;

          while (num !== -1) {
            set.add(num);
            num = behaviorTree.parentIndex[num];
          }

          num = index2;

          while (!set.has(num)) {
            num = behaviorTree.parentIndex[num];
          }

          return num;
        }

        isParentNode(behaviorTree, possibleParent, possibleChild) {
          for (var num = possibleChild; num !== -1; num = behaviorTree.parentIndex[num]) {
            if (num === possibleParent) {
              return true;
            }
          }

          return false;
        }
        /***
         * 执行节点事件
         */


        emitEvent(behaviorTree, nodeData, lifeCycle) {
          var dump = nodeData.event[lifeCycle];
          var nodeUuid = dump.node;
          var compUuid = dump.comp;
          var methodName = dump.method;
          var methodData = dump.data;

          if (!nodeUuid || !compUuid || !methodName) {
            return [false, null];
          } // 行为树组件所在cocos节点


          var curNode = behaviorTree.behavior.node; // 先从当前节点开始层序遍历

          var target = bfsCcNode(curNode, nodeUuid); // 找不到再从scene节点开始层序遍历

          if (!target) {
            target = bfsCcNode(director.getScene(), nodeUuid, curNode.uuid);
          }

          if (!target) {
            return [false, null];
          }

          var comp = target._components.find(comp => comp.uuid === compUuid);

          if (!comp) {
            return [false, null];
          }

          var method = comp[methodName];

          if (!method) {
            return [false, null];
          }

          var res = method.call(comp, methodData); // 用户忘记写返回值，一律返回失败

          var result = res !== undefined ? res : NodeStatus.Failure;
          return [true, result];
        }

      }, _class2.instance = null, _class2)) || _class));
      /***
       * 行为树数据结构，具体执行逻辑由BehaviorManager驱动
       */


      BehaviorTree = class BehaviorTree {
        constructor() {
          // @ts-ignore
          this.root = void 0;
          // @ts-ignore
          this.behavior = void 0;
          //用户使用的BehaviorTree组件
          this.activeStack = [];
          this.nodeList = [];
          //当前节点的父节点
          this.parentIndex = [];
          //当前节点的子节点
          this.childrenIndex = [];

          /***
           * 为了实现中断
           */
          //当前节点是父节点的第几个子节点
          this.relativeChildIndex = [];
          //当前节点的父组合节点
          this.parentCompositeIndex = [];
          //当前节点的子条件节点
          this.childConditionalIndex = [];
          //所有条件重评估
          this.conditionalReevaluate = [];
          //条件重评估id的map
          this.conditionalReevaluateMap = new Map();
        }

      };
      /***
       * 条件重评估数据结构
       * 各种情况讲解：
       * 1、LowerPriority：左侧的重评估条件可以打断右侧Action节点的运行，不过不是所有都能打断，当Action属于该compositeIndex所管理的子树才能打断
       *  因此，随着compositeIndex逐渐上移，该条件能打断的范围就会越大，当然这就需要此条件的父节点均有LowerPriority或者Both，才能让compositeIndex一直上移
       * 2、Self：只能打断跟自己同一Composite节点下的其他节点的运行，当该Composite被popNode时，条件也会被删除
       * 3、Parallel：Parallel下有多个分支都有LowerPriority的条件重评估对象：
       *    情况1、假设某个分支返回Running状态，此时这个分支下的compositeIndex未达到并行节点，无法管理其他分支下Action运行
       *    情况2：返回Success或者Failure状态，当该运行栈最后一个元素popNode出去时，此时栈为空，会删除其管理的条件重评估
       *          如果该条件的compositeIndex是-1，不会进入compositeIndex上移逻辑，因此也无法运行
       *    总结：某个并行节点下的多个并行分支，各自的条件不会干扰
       */

      ConditionalReevaluate = class ConditionalReevaluate {
        constructor(index, stackIndex, status, compositeIndex) {
          this.index = index;
          this.stackIndex = stackIndex;
          this.status = status;
          this.compositeIndex = compositeIndex;
        }

      };

      _cclegacy._RF.pop();
    }
  };
});
//# sourceMappingURL=e3f6f5b7cc68307667d9e5792677e5899f809f0a.js.map