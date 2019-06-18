import {instance, mock, nextTick} from "../src/ts-mockito";
import {Foo} from "./utils/Foo";

describe("instance", () => {
    describe("getting instance of mock", () => {
        let mockedFoo: Foo;

        it("returns always same instance", () => {
            // given
            mockedFoo = mock(Foo);

            // when
            const firstFooInstance = instance(mockedFoo);
            const secondFooInstance = instance(mockedFoo);

            // then
            expect(firstFooInstance).toBe(secondFooInstance);
        });
    });

    xdescribe("forgetting to get instance of mock", () => {
        let mockedFoo: Foo;

        it("throws an exception if not taking instance before calling a method", async () => {
            // given
            mockedFoo = mock(Foo);

            mockedFoo.getBar();
            await nextTick();

            // Expected to fail with "Unmatched call to getBar, did you forget to use instance()?"
        });
    });
});
