export interface MethodStub {
    isApplicable(args: any[]): boolean;
    execute(args: any[], thisArg: any): void;
    getValue(): any;
    getGroupIndex(): number;
}
