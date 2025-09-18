export default function Success() {
  return (
    <div style={{maxWidth: 480, margin: '48px auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1 data-testid="success-title">Giriş Başarılı</h1>
      <p>Başarıyla giriş yaptınız.</p>
      <a href="/" data-testid="back-home">Ana sayfaya dön</a>
    </div>
  );
}
