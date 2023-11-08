/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCodeItem = /* GraphQL */ `
  subscription OnCreateCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
    onCreateCodeItem(filter: $filter) {
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
export const onUpdateCodeItem = /* GraphQL */ `
  subscription OnUpdateCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
    onUpdateCodeItem(filter: $filter) {
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
export const onDeleteCodeItem = /* GraphQL */ `
  subscription OnDeleteCodeItem($filter: ModelSubscriptionCodeItemFilterInput) {
    onDeleteCodeItem(filter: $filter) {
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
export const onCreateLanguageItem = /* GraphQL */ `
  subscription OnCreateLanguageItem(
    $filter: ModelSubscriptionLanguageItemFilterInput
  ) {
    onCreateLanguageItem(filter: $filter) {
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
export const onUpdateLanguageItem = /* GraphQL */ `
  subscription OnUpdateLanguageItem(
    $filter: ModelSubscriptionLanguageItemFilterInput
  ) {
    onUpdateLanguageItem(filter: $filter) {
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
export const onDeleteLanguageItem = /* GraphQL */ `
  subscription OnDeleteLanguageItem(
    $filter: ModelSubscriptionLanguageItemFilterInput
  ) {
    onDeleteLanguageItem(filter: $filter) {
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
