export const calculateReadiness = (data: any) => {
  let score = 0;
  let suggestions = [];

  if (data.isRegistered) {
    score += 40;
  } else {
    suggestions.push('Register to vote before the deadline.');
  }

  if (data.hasDocuments) {
    score += 30;
  } else {
    suggestions.push('Gather required identification documents.');
  }

  if (data.knowsLocation) {
    score += 30;
  } else {
    suggestions.push('Find your designated polling station.');
  }

  // Adjust score based on completed checklist items (if any)
  if (data.checklistState) {
    const completedItems = Object.values(data.checklistState).filter(Boolean).length;
    const totalItems = Object.keys(data.checklistState).length || 1;
    score = Math.min(100, score + (completedItems / totalItems) * 10);
  }

  return {
    score: Math.round(score),
    status: score > 80 ? 'Excellent' : score > 50 ? 'Good' : 'Needs Action',
    suggestions,
  };
};

export const buildTimelineAndChecklist = (userProfile: any) => {
  const { age, state, isRegistered } = userProfile;
  
  // Dummy logic for generating personalized checklist and timeline
  // In a real application, this would query a database of state-specific election rules
  const checklist = [
    { id: 'reg', title: 'Register to Vote (Voter ID)', description: 'Apply for Voter ID (EPIC card) on the NVSP portal.', status: isRegistered ? 'completed' : 'pending' },
    { id: 'doc', title: 'Prepare Documents', description: 'Gather Aadhaar or other valid photo ID for verification.', status: 'pending' },
    { id: 'loc', title: 'Find Polling Booth', description: 'Check your name in the electoral roll and find your booth.', status: 'pending' },
    { id: 'vote', title: 'Cast Your Vote', description: 'Visit the polling booth and use the EVM to cast your vote.', status: 'pending' }
  ];

  const timeline = [
    { phase: 'Enrollment Phase', date: 'Phase 1', active: !isRegistered },
    { phase: 'Roll Verification', date: 'Phase 2', active: isRegistered },
    { phase: 'Polling Day', date: 'Election Day', active: false }
  ];

  return { checklist, timeline };
};
