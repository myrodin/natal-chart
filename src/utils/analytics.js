// Analytics utility for event tracking

export const trackEvent = (category, action, label = null) => {
  // Check if gtag is available (Google Analytics)
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    const eventParams = {
      event_category: category
    };

    if (label) {
      eventParams.event_label = label;
    }

    window.gtag('event', action, eventParams);
  }
};

// Helper functions for common tracking scenarios
export const trackCategorySelect = (categoryName) => {
  trackEvent('Category', 'select', categoryName);
};

export const trackFormSubmit = () => {
  trackEvent('Form', 'submit');
};

export const trackResultReceived = () => {
  trackEvent('Result', 'received');
};

export const trackShare = (method, categoryName = null) => {
  trackEvent('Share', method, categoryName);
};

export const trackEngagement = (action, label = null) => {
  trackEvent('Engagement', action, label);
};

export const trackAchievement = (achievementId) => {
  trackEvent('Achievement', 'unlocked', achievementId);
};

export const trackFavorite = (action, question = null) => {
  trackEvent('Favorite', action, question);
};
