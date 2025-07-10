export const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">
        <span className="gradient-text">Why Choose SnapTable?</span>
      </h2>
      
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3>Truly Headless</h3>
          <p>No predefined UI components. Just pure logic and hooks that give you complete control over styling and behavior.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Lightning Fast</h3>
          <p>Optimized for performance with minimal bundle size. Only 5.65kB gzipped - perfect for production apps.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">🔧</span>
          <h3>Highly Customizable</h3>
          <p>Every aspect is configurable. Column resizing, drag & drop, sticky headers, sticky columns, show/hide columns, and more - all optional and customizable.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">📱</span>
          <h3>Mobile Ready</h3>
          <p>Built with responsive design in mind. Works perfectly on desktop, tablet, and mobile devices out of the box.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">🎨</span>
          <h3>Style Freedom</h3>
          <p>Bring your own CSS framework. Works with Tailwind, Styled Components, CSS Modules, or plain CSS.</p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">🔄</span>
          <h3>Modern React</h3>
          <p>Built with modern React patterns. Hooks, TypeScript support, and excellent developer experience included.</p>
        </div>
      </div>
    </section>
  );
}; 