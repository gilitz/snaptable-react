export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="version-badge">v3.3.0</span>
          <span className="new-badge">✨ Truly Headless</span>
        </div>
        
        <h1 className="hero-title">
          <span className="gradient-text">SnapTable</span>
          <br />
        </h1>
        
        <p className="hero-subtitle">
          The Ultimate Headless Table Library
        </p>
        
        <div className="hero-description">
          <p>Build powerful, customizable data tables with zero UI constraints.</p>
          <p>Pure hooks, complete control, endless possibilities.</p>
        </div>
        
        <div className="hero-features">
          <div className="feature-pill">🎯 Truly Headless</div>
          <div className="feature-pill">📏 Column Resizing</div>
          <div className="feature-pill">🔄 Drag & Drop</div>
          <div className="feature-pill">📌 Sticky Columns</div>
          <div className="feature-pill">👁️ Column Visibility</div>
          <div className="feature-pill">📱 Mobile Ready</div>
          <div className="feature-pill">⚡ Lightweight</div>
          <div className="feature-pill">🎨 Zero CSS</div>
        </div>
        
        <div className="hero-actions">
          <a href="#demo" className="primary-button">
            <span className="button-icon">🚀</span>
            See Live Demo
          </a>
          <a href="https://github.com/gilitz/snaptable-react" className="secondary-button" target="_blank">
            <span className="button-icon">⭐</span>
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}; 