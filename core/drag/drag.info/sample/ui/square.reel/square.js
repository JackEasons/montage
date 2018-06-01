/**
 * @module ui/square.reel
 */
var Component = require("montage/ui/component").Component,
    DragManager = require("montage/core/drag/drag-manager").DragManager,
    DraggingOperationType = require("montage/core/drag/dragging-operation-type").DraggingOperationType;

/**
 * @class Square
 * @extends Component
 */
exports.Square = Component.specialize(/** @lends Square# */ {

    enableMoveOperation: {
        value: false
    },

    enableVisiblePlaceholder: {
        value: false
    },

    secret: {
        value: null
    },

    enterDocument: {
        value: function () {
            this.registerForDragSource();
        }
    },

    exitDocument: {
        value: function () {
            this.unregisterForDragSource();
        }
    },

    beginDraggingOperation: {
        value: function (draggingOperationInfo) {
            if (this.enableMoveOperation) {
                draggingOperationInfo.dragEffect = DraggingOperationType.Move;
                draggingOperationInfo.dropEffectAllowed = DraggingOperationType.Move;
            }

            if (this.container) {
                draggingOperationInfo.dragSourceContainer = this.container;
            }

            if (this.enableVisiblePlaceholder) {
                draggingOperationInfo.dragSourcePlaceholderStrategy = (
                    DragManager.DragSourcePlaceholderStrategyVisible
                );
            }
            
            if (this.secret) {
                draggingOperationInfo.data.set("secret", this.secret);
            }

            if (this.switchDraggedImage) {
                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
                    circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

                circle.setAttributeNS(null, 'cx', 25);
                circle.setAttributeNS(null, 'cy', 25);
                circle.setAttributeNS(null, 'r', 25);
                circle.setAttributeNS(null, 'style', 'fill: #e74c3c;');
                svg.appendChild(circle);
                draggingOperationInfo.draggedImage = svg;
            }
        }
    }

});
