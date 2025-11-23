import React, { useState } from 'react';

const InputForm = ({ onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        birthTime: '',
        birthPlace: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.birthDate || !formData.birthPlace) {
            alert('필수 정보를 모두 입력해주세요.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="card">
            <button className="back-btn" onClick={onBack}>
                ← 주제 다시 선택하기
            </button>
            <h2>정보를 입력해주세요</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                정확한 네이탈 차트 분석을 위해 태어난 시간과 장소가 필요합니다.
            </p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름 (또는 닉네임)</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="예: 홍길동"
                        required
                    />
                </div>

                <div className="form-row">
                    <div>
                        <label htmlFor="birthDate">생년월일</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="birthTime">태어난 시간</label>
                        <input
                            type="time"
                            id="birthTime"
                            name="birthTime"
                            value={formData.birthTime}
                            onChange={handleChange}
                        />
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                            * 모르면 비워두세요 (정확도가 떨어질 수 있습니다)
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="birthPlace">태어난 장소 (시/군/구)</label>
                    <input
                        type="text"
                        id="birthPlace"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleChange}
                        placeholder="예: 서울특별시 강남구"
                        required
                    />
                </div>

                <button type="submit" className="btn-primary">
                    차트 분석하기 ✨
                </button>
            </form>
        </div>
    );
};

export default InputForm;
