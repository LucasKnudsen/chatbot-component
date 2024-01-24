import {
  AmplifyAuthCognitoStackTemplate,
  AmplifyProjectInfo,
} from '@aws-amplify/cli-extensibility-helper'

export function override(
  resources: AmplifyAuthCognitoStackTemplate,
  amplifyProjectInfo: AmplifyProjectInfo
) {
  //customAttributeName Member must have length less than or equal to 20
  const customAttribute = {
    attributeDataType: 'String',
    developerOnlyAttribute: false,
    mutable: false,
    name: 'userId',
    required: false,
  }

  resources.userPool.schema = [customAttribute]
}
