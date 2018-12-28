"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_map_test_1 = require("./test/collection/token-map.test");
const log_task_engine_test_1 = require("./test/task/log-task-engine.test");
const operation_manager_test_1 = require("./test/task/operation/operation-manager.test");
(function () {
    new log_task_engine_test_1.LogTaskEngineTests().performTests();
    new operation_manager_test_1.OperationManagerTests().performTests();
    new token_map_test_1.TokenMapTests().performTests();
}());

//# sourceMappingURL=main.test.js.map
