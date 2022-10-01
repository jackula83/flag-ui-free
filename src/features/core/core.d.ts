export type Voidable<T> = T | undefined

export type FxEntity = {
  id: number;
  uuid: string;
  deleteFlag: boolean;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string;
  updatedBy?: string;
}

export type Lock = {
  lockValue: boolean
}