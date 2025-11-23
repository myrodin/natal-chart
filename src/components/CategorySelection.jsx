import React, { useState } from 'react';

const CATEGORIES = [
    {
        id: 'love',
        label: '연애 / 사랑',
        icon: '💘',
        subCategories: [
            { id: 'soulmate', label: '나의 소울메이트는 어떤 사람일까?' },
            { id: 'timing', label: '언제쯤 연애운이 좋아질까?' },
            { id: 'compatibility', label: '지금 짝사랑하는 사람과의 궁합은?' },
            { id: 'marriage', label: '나의 결혼 생활은 어떨까?' }
        ]
    },
    {
        id: 'career',
        label: '직업 / 진로',
        icon: '💼',
        subCategories: [
            { id: 'aptitude', label: '나에게 딱 맞는 직업은?' },
            { id: 'success', label: '언제쯤 성공할 수 있을까?' },
            { id: 'business', label: '창업이나 내 사업을 해도 될까?' },
            { id: 'change', label: '이직하기 좋은 시기는?' }
        ]
    },
    {
        id: 'life',
        label: '인생 / 자아',
        icon: '🌟',
        subCategories: [
            { id: 'purpose', label: '나의 인생 목적은 무엇일까?' },
            { id: 'personality', label: '내가 모르는 나의 숨겨진 성격은?' },
            { id: 'challenge', label: '내가 극복해야 할 과제는?' },
            { id: 'talent', label: '나의 타고난 재능은?' }
        ]
    },
    {
        id: 'money',
        label: '금전 / 재물',
        icon: '💰',
        subCategories: [
            { id: 'fortune', label: '나의 타고난 재물복은?' },
            { id: 'investment', label: '나에게 맞는 투자 방식은?' },
            { id: 'rich', label: '언제쯤 큰 돈을 만질 수 있을까?' },
            { id: 'loss', label: '돈을 모으기 위해 주의할 점은?' }
        ]
    },
    {
        id: 'relationship',
        label: '대인관계',
        icon: '🤝',
        subCategories: [
            { id: 'conflict', label: '직장 동료와의 갈등 해결법은?' },
            { id: 'noble', label: '나에게 귀인이 되어줄 사람은?' },
            { id: 'friends', label: '친구들과의 관계는 어떻게 될까?' },
            { id: 'family', label: '가족과의 갈등은 언제 해결될까?' }
        ]
    },
    {
        id: 'study',
        label: '학업 / 시험',
        icon: '📚',
        subCategories: [
            { id: 'exam', label: '이번 시험 합격운은?' },
            { id: 'method', label: '나에게 맞는 공부 방법은?' },
            { id: 'abroad', label: '유학이나 해외 연수가 도움이 될까?' },
            { id: 'cert', label: '자격증 취득 운은 어떨까?' }
        ]
    }
];

const CategorySelection = ({ onSelect }) => {
    const [selectedMain, setSelectedMain] = useState(null);

    const handleMainSelect = (category) => {
        setSelectedMain(category);
    };

    const handleSubSelect = (subCategory) => {
        onSelect({
            main: selectedMain.label,
            sub: subCategory.label,
            question: subCategory.label // Using label as the question for now
        });
    };

    return (
        <div className="card">
            {!selectedMain ? (
                <>
                    <h2>어떤 고민이 있으신가요?</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                        가장 관심 있는 주제를 선택해주세요.
                    </p>
                    <div className="category-grid">
                        {CATEGORIES.map((cat) => (
                            <div
                                key={cat.id}
                                className="category-card"
                                onClick={() => handleMainSelect(cat)}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                                <h3>{cat.label}</h3>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button className="back-btn" onClick={() => setSelectedMain(null)}>
                        ← 뒤로 가기
                    </button>
                    <h2>{selectedMain.label}</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                        구체적으로 어떤 것이 궁금하신가요?
                    </p>
                    <div className="category-grid" style={{ gridTemplateColumns: '1fr' }}>
                        {selectedMain.subCategories.map((sub) => (
                            <div
                                key={sub.id}
                                className="category-card"
                                style={{ textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                onClick={() => handleSubSelect(sub)}
                            >
                                <span>{sub.label}</span>
                                <span style={{ color: 'var(--color-primary)' }}>→</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CategorySelection;
