import {Matcher} from "./matcher/type/Matcher";
import {MethodStubCollection} from "./MethodStubCollection";
import {Mocker} from "./Mock";

class Watcher {
    private inv = false;

    constructor(private err: Error) {
        setTimeout(this.nextTick, 0);
    }

    public invoked() {
        this.inv = true;
    }

    private nextTick = () => {
        if (!this.inv) {
            throw this.err;
        }
    };
}

export class MethodToStub {
    public watcher: Watcher;

    constructor(
        public methodStubCollection: MethodStubCollection,
        public matchers: Matcher[],
        public mocker: Mocker,
        public methodName: string,
    ) {
        this.watcher = new Watcher(new Error(`Unmatched call to ${methodName} on a mock object, did you mean to use instance()?`));
    }
}
