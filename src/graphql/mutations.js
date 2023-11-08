/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCodeItem = /* GraphQL */ `
  mutation CreateCodeItem(
    $input: CreateCodeItemInput!
    $condition: ModelCodeItemConditionInput
  ) {
    createCodeItem(input: $input, condition: $condition) {
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
export const updateCodeItem = /* GraphQL */ `
  mutation UpdateCodeItem(
    $input: UpdateCodeItemInput!
    $condition: ModelCodeItemConditionInput
  ) {
    updateCodeItem(input: $input, condition: $condition) {
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
export const deleteCodeItem = /* GraphQL */ `
  mutation DeleteCodeItem(
    $input: DeleteCodeItemInput!
    $condition: ModelCodeItemConditionInput
  ) {
    deleteCodeItem(input: $input, condition: $condition) {
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
export const createLanguageItem = /* GraphQL */ `
  mutation CreateLanguageItem(
    $input: CreateLanguageItemInput!
    $condition: ModelLanguageItemConditionInput
  ) {
    createLanguageItem(input: $input, condition: $condition) {
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
export const updateLanguageItem = /* GraphQL */ `
  mutation UpdateLanguageItem(
    $input: UpdateLanguageItemInput!
    $condition: ModelLanguageItemConditionInput
  ) {
    updateLanguageItem(input: $input, condition: $condition) {
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
export const deleteLanguageItem = /* GraphQL */ `
  mutation DeleteLanguageItem(
    $input: DeleteLanguageItemInput!
    $condition: ModelLanguageItemConditionInput
  ) {
    deleteLanguageItem(input: $input, condition: $condition) {
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
