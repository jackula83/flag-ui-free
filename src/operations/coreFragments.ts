import { gql } from "@apollo/client";

export const CoreEntityFields = (entityName: string) => {
  return gql`
    fragment CoreEntityFields on {entityName} {
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