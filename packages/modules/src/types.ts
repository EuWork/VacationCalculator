export type HookFunctionResultDispose = () => void;

export type HookFunctionResultValue = void | false | HookFunctionResultDispose;

export type HookFunctionResult = HookFunctionResultValue | Promise<HookFunctionResultValue>;
