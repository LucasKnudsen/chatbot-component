"use strict";
exports.__esModule = true;
exports.getGradingPrompt = exports.getGradingFunction = void 0;
var prompts_1 = require("./prompts");
var getGradingPrompt = function (_a) {
    var question = _a.question, answer = _a.answer, context = _a.context;
    return "\n    ".concat(prompts_1.promptIntro, "\n\n    ").concat(prompts_1.submissionInstructions, "\n\n    ").concat(prompts_1.gradingInsturctionsPrompt, "\n\n    Provided question:\n    ").concat(question, "\n\n    Provided answer: \n    ").concat(answer, "\n\n    Provided context: \n    ").concat(context, "\n    ");
};
exports.getGradingPrompt = getGradingPrompt;
var getGradingFunction = function (scaleMax) {
    return {
        name: 'grading_function',
        description: 'Call this function to submit the grading for the answer, containing multiple evaluations for different aspects.',
        parameters: {
            type: 'object',
            properties: {
                evaluations: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                "enum": ['readability', 'correctness', 'comprehensiveness'],
                                description: 'The type of evaluation (correctness, comprehensiveness, readability).'
                            },
                            label: {
                                type: 'string',
                                "enum": ['Readability', 'Correctness', 'Comprehensiveness'],
                                description: 'The label of the evaluation (Correctness, Comprehensiveness, Readability).'
                            },
                            score: {
                                type: 'integer',
                                minimum: 1,
                                maximum: scaleMax,
                                description: "An integer grading between 1 to ".concat(scaleMax, " for the aspect of the answer being evaluated.")
                            },
                            reasoning: {
                                type: 'string',
                                description: 'Your reasoning for giving the grading. Provide a 5 to 30 words explanation. This field is optional.'
                            }
                        },
                        required: ['type', 'label', 'score']
                    }
                }
            },
            required: ['evaluations']
        }
    };
    // return {
    //   name: 'grading_function',
    //   description: 'Call this function to submit the grading for the answer',
    //   parameters: {
    //     type: 'object',
    //     properties: {
    //       reasoning_for_correctness: {
    //         type: 'string',
    //         description:
    //           'Your reasoning for giving the grading for the correctness of the answer. Provide 5 to 30 words explanation.',
    //       },
    //       correctness: {
    //         type: 'integer',
    //         description: `Your integer grading between 0 to ${scaleMax} for the correctness of the answer.`,
    //       },
    //       reasoning_for_comprehensiveness: {
    //         type: 'string',
    //         description:
    //           'Your reasoning for giving the grading for the comprehensiveness of the answer. Provide 5 to 30 words explanation.',
    //       },
    //       comprehensiveness: {
    //         type: 'integer',
    //         description: `Your integer grading between 0 to ${scaleMax} for the comprehensiveness of the answer.`,
    //       },
    //       reasoning_for_readability: {
    //         type: 'string',
    //         description:
    //           'Your reasoning for giving the grading for the readability of the answer. Provide 5 to 30 words explanation.',
    //       },
    //       readability: {
    //         type: 'integer',
    //         description: `Your integer grading between 0 to ${scaleMax} for the readability of the answer.`,
    //       },
    //     },
    //     required: [
    //       'reasoning_for_correctness',
    //       'correctness',
    //       'reasoning_for_comprehensiveness',
    //       'comprehensiveness',
    //       'reasoning_for_readability',
    //       'readability',
    //     ],
    //   },
    // }
};
exports.getGradingFunction = getGradingFunction;
