import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const vitalsCallback = (metric: WebVitalsMetric) => {
  // Envoyer les métriques à votre service d'analytics
  console.log(metric);
  
  // Exemple d'envoi à un service d'analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: metric.rating,
    });
  }
};

export function reportWebVitals(): void {
  onCLS(vitalsCallback);
  onFID(vitalsCallback);
  onLCP(vitalsCallback);
  onFCP(vitalsCallback);
  onTTFB(vitalsCallback);
}

// Fonction utilitaire pour vérifier si les performances sont bonnes
export function checkPerformance(): {
  score: number;
  issues: string[];
} {
  const issues: string[] = [];
  let score = 100;

  // Vérifier le First Contentful Paint (FCP)
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
  if (fcpEntry && fcpEntry.startTime > 1800) {
    issues.push('First Contentful Paint is too slow');
    score -= 20;
  }

  // Vérifier le Time to Interactive (TTI)
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationEntry && navigationEntry.domInteractive > 3500) {
    issues.push('Time to Interactive is too high');
    score -= 20;
  }

  // Vérifier la taille du bundle JS
  const jsResources = performance.getEntriesByType('resource')
    .filter(entry => entry.name.endsWith('.js'));
  const totalJSSize = jsResources.reduce((acc, entry) => acc + entry.encodedBodySize, 0);
  if (totalJSSize > 500000) { // 500KB
    issues.push('JavaScript bundle size is too large');
    score -= 15;
  }

  return { score, issues };
} 