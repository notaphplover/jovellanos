import { TokenMapTests } from './test/collection/token-map.test';

const jovellanosTest = function() {
    return {
        performTests: function() {
            new TokenMapTests().performTests();
        },
    };
} ();

module.exports = jovellanosTest;
