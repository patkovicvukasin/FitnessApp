import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        onClick={() => changeLanguage('sr')}
        style={{
          padding: '8px 16px',
          backgroundColor: i18n.language === 'sr' ? '#1976d2' : '#e0e0e0',
          color: i18n.language === 'sr' ? 'white' : '#666',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        🇷🇸 SR
      </button>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          padding: '8px 16px',
          backgroundColor: i18n.language === 'en' ? '#1976d2' : '#e0e0e0',
          color: i18n.language === 'en' ? 'white' : '#666',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px'
        }}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}