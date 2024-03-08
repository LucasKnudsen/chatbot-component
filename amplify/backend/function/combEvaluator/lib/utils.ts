import { gradingInsturctionsPrompt, promptIntro, submissionInstructions } from './prompts'

type ScaleMax = 1 | 2 | 3 | 4
type DetailsLevel = 1 | 2 | 3

const getGradingPrompt = ({
  question,
  answer,
  context,
}: {
  question: string
  answer: string
  context: string
}) => {
  return `
    ${promptIntro}

    ${submissionInstructions}

    ${gradingInsturctionsPrompt}

    Provided question:
    ${question}

    Provided answer: 
    ${answer}

    Provided context: 
    ${context}
    `
}

const getGradingFunction = (scaleMax: ScaleMax) => ({
  name: 'grading_function',
  description: 'Call this function to submit the grading for the answer',
  parameters: {
    type: 'object',
    properties: {
      reasoning_for_correctness: {
        type: 'string',
        description:
          'Your reasoning for giving the grading for the correctness of the answer. Provide 5 to 30 words explanation.',
      },
      correctness: {
        type: 'integer',
        description: `Your integer grading between 0 to ${scaleMax} for the correctness of the answer.`,
      },
      reasoning_for_comprehensiveness: {
        type: 'string',
        description:
          'Your reasoning for giving the grading for the comprehensiveness of the answer. Provide 5 to 30 words explanation.',
      },
      comprehensiveness: {
        type: 'integer',
        description: `Your integer grading between 0 to ${scaleMax} for the comprehensiveness of the answer.`,
      },
      reasoning_for_readability: {
        type: 'string',
        description:
          'Your reasoning for giving the grading for the readability of the answer. Provide 5 to 30 words explanation.',
      },
      readability: {
        type: 'integer',
        description: `Your integer grading between 0 to ${scaleMax} for the readability of the answer.`,
      },
    },
    required: [
      'reasoning_for_correctness',
      'correctness',
      'reasoning_for_comprehensiveness',
      'comprehensiveness',
      'reasoning_for_readability',
      'readability',
    ],
  },
})

export { getGradingFunction, getGradingPrompt }
