import { TokenMapTests } from './test/collection/token-map.test';
import { LogTaskEngineTests } from './test/task/log-task-engine.test';
import { OperationManagerTests } from './test/task/operation/operation-manager.test';
(function () {
    new LogTaskEngineTests().performTests();
    new OperationManagerTests().performTests();
    new TokenMapTests().performTests();
}());

//# sourceMappingURL=main.test.js.map
