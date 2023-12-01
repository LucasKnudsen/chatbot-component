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
    const currentLanguageCache = currentLanguage()

    const answer = (await API.post('digitaltwinRest', '/detect-language', {
      body: text,
    })) as { languageCode: string; score: number }

    const isEqualToCurrentLanguage =
      answer.languageCode.toLowerCase() === currentLanguageCache.toLowerCase()

    // Sets detected language to new currentLanguage
    shouldSetLanguage && setLanguage(answer.languageCode)

    return {
      ...answer,
      isEqualToCurrentLanguage,
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * Translates the given text from one language to another.
 * @param text The text to be translated.
 * @param from The language code of the source text. Either a client override or the default language.
 * @param to The language code of the target translation. Default to currentLanguage global signal
 * @returns A Promise that resolves to the translated text.
 */
export async function translate(
  text: string,
  from: string = SYSTEM_DEFAULT_LANGUAGE,
  to: string = currentLanguage()
): Promise<string> {
  if (from === to) return text

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

    return translation.text
  } catch (error) {
    console.log(error)
    return text
  }
}
