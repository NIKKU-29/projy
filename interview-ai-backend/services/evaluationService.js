const axios = require('axios');
const config = require('../config/default');

// Evaluate response using Mistral LLM
exports.evaluateResponse = async (transcription, question) => {
  try {
    // Build prompt for Mistral
    const prompt = `
You are an interview coach evaluating a candidate's response to a job interview question.

Question: "${question.text}"

Candidate's response: "${transcription}"

Please evaluate the response on the following criteria on a scale of 1-10:
1. Confidence: How confident did the candidate sound?
2. Clarity: How clear and structured was their response?
3. Relevance: How relevant was their response to the question asked?

Also provide brief, constructive feedback (maximum 100 words) on how they could improve their response.

Format your response as JSON with the following structure:
{
  "confidence": number,
  "clarity": number,
  "relevance": number,
  "feedback": "string"
}
`;

    // Make request to Mistral API
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: 'mistral-small',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 500
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.mistralApiKey}`
        }
      }
    );

    // Parse the response
    const content = response.data.choices[0].message.content;
    try {
      const evaluation = JSON.parse(content);
      return {
        confidence: evaluation.confidence || 5,
        clarity: evaluation.clarity || 5,
        relevance: evaluation.relevance || 5,
        feedback: evaluation.feedback || 'No specific feedback provided.'
      };
    } catch (parseError) {
      console.error('Error parsing Mistral response:', parseError);
      // Fallback evaluation
      return {
        confidence: 5,
        clarity: 5,
        relevance: 5,
        feedback: 'Unable to provide detailed feedback at this time.'
      };
    }
  } catch (error) {
    console.error('Evaluation service error:', error);
    // Fallback evaluation
    return {
      confidence: 5,
      clarity: 5,
      relevance: 5,
      feedback: 'Unable to evaluate response due to a service error.'
    };
  }
};