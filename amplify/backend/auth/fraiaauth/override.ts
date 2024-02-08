import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper'

export function override(resources: AmplifyAuthCognitoStackTemplate) {
  const customAttribute = {
    attributeDataType: 'String',
    developerOnlyAttribute: false,
    mutable: false,
    name: 'userId',
    required: false,
  }

  resources.userPool!.schema = [customAttribute]
}
