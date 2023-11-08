/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCodeItem = /* GraphQL */ `
  query GetCodeItem(
    $tenantCode: String!
    $tableCode: String!
    $itemCode: String!
  ) {
    getCodeItem(
      tenantCode: $tenantCode
      tableCode: $tableCode
      itemCode: $itemCode
    ) {
      tenantCode
      tableCode
      itemCode
      internalName
      internalDescription
      isEditable
      isActive
      isDisplayed
      isExtended
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCodeItems = /* GraphQL */ `
  query ListCodeItems(
    $tenantCode: String
    $tableCodeItemCode: ModelCodeItemPrimaryCompositeKeyConditionInput
    $filter: ModelCodeItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCodeItems(
      tenantCode: $tenantCode
      tableCodeItemCode: $tableCodeItemCode
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        tenantCode
        tableCode
        itemCode
        internalName
        internalDescription
        isEditable
        isActive
        isDisplayed
        isExtended
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLanguageItem = /* GraphQL */ `
  query GetLanguageItem(
    $languageCode: String!
    $tableCode: String!
    $itemCode: String!
  ) {
    getLanguageItem(
      languageCode: $languageCode
      tableCode: $tableCode
      itemCode: $itemCode
    ) {
      languageCode
      tableCode
      itemCode
      text
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLanguageItems = /* GraphQL */ `
  query ListLanguageItems(
    $languageCode: String
    $tableCodeItemCode: ModelLanguageItemPrimaryCompositeKeyConditionInput
    $filter: ModelLanguageItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLanguageItems(
      languageCode: $languageCode
      tableCodeItemCode: $tableCodeItemCode
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        languageCode
        tableCode
        itemCode
        text
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
