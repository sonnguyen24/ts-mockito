import {Matcher} from "./matcher/type/Matcher";
import {MethodStubCollection} from "./MethodStubCollection";
import {Mocker} from "./Mock";

class Watcher {
    private _invoked = false;

    constructor(private _err: Error) {
        setTimeout(this.nextTick, 0);
    }

    public invoked() {
        this._invoked = true;
    }

    private nextTick = () => {
        if (!this._invoked) {
            throw this._err;
        }
    };
}

export class MethodToStub {
    public watcher: Watcher;

    constructor(
        public methodStubCollection: MethodStubCollection,
        public matchers: Matcher[],
        public mocker: Mocker,
        public methodName: string)
    {
        this.watcher = new Watcher(new Error(`Unmatched call to ${methodName} on a mock object, did you mean to use instance()?`));
    }
}
