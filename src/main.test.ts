import { TokenMapTests } from './test/collection/token-map.test';
import { LogTaskEngineTests } from './test/task/log-task-engine.test';

(function() {
    new LogTaskEngineTests().performTests();
    new TokenMapTests().performTests();
}());
