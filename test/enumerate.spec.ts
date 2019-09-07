import { imock, instance, mock, MockPropertyPolicy, when } from "../src/ts-mockito";

describe("enumerate mock properties", () => {
    if (typeof Proxy !== "undefined") {
        it("should enumerate the properties of a mock", () => {
            class Foo {
                public prop = 1;
                public fn() { return 1; }
            }

            const m = mock(Foo);
            when(m.prop).thenReturn(1);
            when(m.fn()).thenReturn(1);

            // verify behaviour on real object that the mock should simulate
            expect(Object.keys(new Foo())).toEqual(["prop"]);

            // verify behaviour on mock
            expect(Object.keys(instance(m))).toEqual(["prop"]);
        });

        it("should enumerate the properties of an interface mock", () => {
            interface IFoo {
                prop: number;
                fn: () => number;
            }

            const m: IFoo = imock(MockPropertyPolicy.StubAsProperty);
            when(m.prop).thenReturn(1);
            when(m.fn()).thenReturn(1);

            // verify behaviour on real object that the mock should simulate
            expect(Object.keys({ prop: 1, fn: () => 1} as IFoo)).toEqual(["prop", "fn"]);

            // verify behaviour on mock
            expect(Object.keys(instance(m))).toEqual(["prop", "fn"]);
        });

        it("should not enumerate the member functions of an interface mock", () => {
            interface IFoo {
                prop: number;
                fn: () => number;
            }
            class Foo implements IFoo {
                public prop = 1;
                public fn() { return 1; }
            }

            const m: IFoo = imock();
            when(m.prop).thenReturn(1);
            when(m.fn()).thenReturn(1);

            // verify behaviour on real object that the mock should simulate
            expect(Object.keys(new Foo())).toEqual(["prop"]);

            // verify behaviour on mock
            expect(Object.keys(instance(m))).toEqual(["prop"]);
        });
    }
});
