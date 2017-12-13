const expect = require('expect');

const {isRealString} = require('./validation');

describe("isRealString", () => {
    it ("should reject non-string values", () => {
        expect(isRealString(42)).toBe(false);
    });

    it("should reject strings with only spaces", () => {
        expect(isRealString("   ")).toBe(false);
    });

    it("should allow strings with non-space characters", () => {
        expect(isRealString("  rajat ")).toBe(true);
    });
});