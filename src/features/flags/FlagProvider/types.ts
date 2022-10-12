import { FxEntity } from "features/types";

export type DefaultServeValue = {
  state: boolean;
}

export type Flag = FxEntity & {
  name: string;
  description: string;
  alias: string;
  isEnabled: boolean;
  defaultServeValue?: DefaultServeValue;
}

export type FlagIdVars = {
  id: number
}

export type ToggleData = { toggleFlag: Flag }
export type AddFlagData = { addFlag: Flag }
export type UpdateFlagData = { updateFlag: Flag }