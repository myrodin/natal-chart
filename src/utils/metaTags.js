// Meta tag management utility for dynamic SEO

export const updateMetaTags = (categoryData) => {
  if (!categoryData || !categoryData.main) {
    // Reset to default if no category data
    updateDefaultMetaTags();
    return;
  }

  const { main, sub, question } = categoryData;

  // Update title
  const newTitle = question
    ? `${question} - Cosmic Insight`
    : 'Cosmic Insight - AI 네이탈 차트 분석';
  document.title = newTitle;

  // Update meta description
  const newDescription = question
    ? `AI가 분석하는 ${main} 관련 운세: ${question}. 무료로 별들의 메시지를 들어보세요.`
    : '별들의 목소리를 들어보세요. AI가 당신의 네이탈 차트를 분석하여 운명과 미래를 들려줍니다.';

  updateMetaTag('name', 'description', newDescription);
  updateMetaTag('property', 'og:title', newTitle);
  updateMetaTag('property', 'og:description', newDescription);
  updateMetaTag('property', 'twitter:title', newTitle);
  updateMetaTag('property', 'twitter:description', newDescription);

  // Update canonical URL with hash
  const categoryId = getCategoryId(main);
  if (categoryId) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `https://myrodin.github.io/natal-chart/#${categoryId}`;
    }
  }
};

const updateDefaultMetaTags = () => {
  const defaultTitle = 'Cosmic Insight - AI 네이탈 차트 분석';
  const defaultDescription = '별들의 목소리를 들어보세요. AI가 당신의 네이탈 차트를 분석하여 운명과 미래를 들려줍니다.';

  document.title = defaultTitle;
  updateMetaTag('name', 'description', defaultDescription);
  updateMetaTag('property', 'og:title', defaultTitle);
  updateMetaTag('property', 'og:description', defaultDescription);
  updateMetaTag('property', 'twitter:title', defaultTitle);
  updateMetaTag('property', 'twitter:description', defaultDescription);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.href = 'https://myrodin.github.io/natal-chart/';
  }
};

const updateMetaTag = (attr, attrValue, content) => {
  let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
  if (element) {
    element.setAttribute('content', content);
  }
};

const getCategoryId = (mainLabel) => {
  const mapping = {
    '연애 / 사랑': 'love',
    '직업 / 진로': 'career',
    '인생 / 자아': 'life',
    '금전 / 재물': 'money',
    '대인관계': 'relationship',
    '학업 / 시험': 'study'
  };
  return mapping[mainLabel] || '';
};
