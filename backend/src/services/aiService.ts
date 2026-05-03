// In a production app, use @google/generative-ai or openai SDK
// For this SaaS boilerplate, we simulate the AI response based on prompts to guarantee fast local execution without API keys

export const generateAIResponse = async (prompt: string, context: any, explainLikeIm15: boolean) => {
  // Mocking AI delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let responseText = '';

  if (explainLikeIm15) {
    if (prompt.toLowerCase().includes('id') || prompt.toLowerCase().includes('document')) {
      responseText = "It's like having a school ID but for grown-ups! You need a card like Aadhaar or a Voter ID to show you are you. It's your ticket to the voting booth.";
    } else if (prompt.toLowerCase().includes('deadline') || prompt.toLowerCase().includes('when')) {
      responseText = "Think of it like a sign-up sheet for a school trip. You have to put your name down (register) on the NVSP website before the big day! Don't wait until the bus is leaving.";
    } else {
      responseText = `Imagine voting is like picking the next school captain. You sign up, bring your ID, and then press the button on the EVM machine! Since you're from ${context.state || 'your state'}, check your local booth!`;
    }
  } else {
    const state = context.state || 'your state';
    if (prompt.toLowerCase().includes('id') || prompt.toLowerCase().includes('document')) {
      responseText = `In ${state}, you primarily need your EPIC (Voter ID) card. However, if you don't have it yet, you can often use your Aadhaar card, PAN card, or Passport if your name is already in the electoral roll.`;
    } else if (prompt.toLowerCase().includes('location') || prompt.toLowerCase().includes('where')) {
      responseText = `Your polling booth in ${state} is determined by your assembly constituency. You can find your specific booth number and location on the NVSP portal or the Voter Helpline app.`;
    } else {
      responseText = `I've analyzed your profile for ${state}. You are currently at a ${context.isRegistered ? 'good' : 'critical'} stage. 
      
1. **Immediate Step:** ${context.isRegistered ? 'Verify your name in the electoral roll.' : 'Apply for your Voter ID on the NVSP portal immediately.'}
2. **Documents:** Keep your Aadhaar or EPIC card ready.
3. **Polling:** Check the Voter Helpline app for your booth details.`;
    }
  }

  return {
    text: responseText,
    suggestedPrompts: [
      "How do I check my registration status?",
      "What if I don't have a driver's license?",
      "Where is my polling station?"
    ]
  };
};
