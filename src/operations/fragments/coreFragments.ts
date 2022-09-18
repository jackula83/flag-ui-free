import { gql } from "@apollo/client";

export interface IEntity {
  id: number;
  uuid: string;
  deleteFlag: boolean;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string;
  updatedBy?: string;
}

export const CoreEntityFields = (entityName: string) => {
  return gql`
    fragment CoreEntityFields on ${entityName} {
      id,
      uuid,
      deleteFlag,
      createdAt,
      updatedAt,
      createdBy,
      updatedBy
    }
  `;
}