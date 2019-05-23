import { instance, when, mock, imock, fnmock, verify } from "../src/ts-mockito";

if (typeof Proxy !== "undefined") {
    describe('mocking', () => {
        describe('mocking functions', () => {
            it('should mock free functions', () => {
                let fn: () => number = fnmock();

                when(fn()).thenReturn(1);

                expect(instance(fn)()).toEqual(1);
                verify(fn()).called();
            });

            it('should match arguments of free functions', () => {
                let fn: (a: string, b: number) => number = fnmock();

                when(fn('a', 1)).thenReturn(1);

                expect(instance(fn)('a', 1)).toEqual(1);
                expect(instance(fn)('a', 2)).toBeNull();
                verify(fn('a', 1)).called();
            });
        });
    });
}
