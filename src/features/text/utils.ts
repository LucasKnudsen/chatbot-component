import { API, Predictions } from 'aws-amplify'
import { SYSTEM_DEFAULT_LANGUAGE, currentLanguage, setLanguage } from '../bot'

// 'Lokationer. Kontorer i Danmark, Sydafrika, Indien, Italien og Thailand | E-mailadresse. kontakt@lionbrain.ai'

/**
 * Detects the language of the given text.
 * @param text - The text to detect the language from.
 * @param shouldSetLanguage - Optional. Specifies whether to set the detected language as the current language.
 * @returns An object containing the detected language code, score, and a flag indicating if it's equal to the current language.
 */
export async function detectLanguage(text: string, shouldSetLanguage: boolean = false) {
  try {
    const answer = (await API.post('digitaltwinRest', '/detect-language', {
      body: text,
    })) as { languageCode: string; score: number }

    console.log('Answer detection: ', answer)

    // Sets global state
    shouldSetLanguage && setLanguage(answer.languageCode)

    return {
      ...answer,
      isEqualToCurrentLanguage:
        answer.languageCode.toLowerCase() === currentLanguage().toLowerCase(),
    }
  } catch (error) {
    console.log(error)
  }
}

export async function translate(text: string, from: string = SYSTEM_DEFAULT_LANGUAGE, to: string) {
  console.time('translation')

  try {
    const translation = await Predictions.convert({
      translateText: {
        source: {
          text,
          language: from, // either client override or default
        },
        targetLanguage: to,
      },
    })

    console.log('Translation: ', translation)
  } catch (error) {
    console.log(error)
  }
  console.timeEnd('translation')
}
