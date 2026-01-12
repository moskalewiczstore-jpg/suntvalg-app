import Cookies from 'js-cookie';
import posthog from 'posthog-js';

// Initialize PostHog
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    // You can replace this with your actual PostHog key when you have one
    // For now we use a placeholder or check environment variable
    // posthog.init('phc_YOUR_API_KEY', { api_host: 'https://app.posthog.com' });
    
    // GTM Fallback
    initializeGTM();
  }
};

export const GTM_ID = "GTM-XXXXXXX"; // Placeholder, user should replace this

export const CONSENT_COOKIE_NAME = "suntvalg_consent";

type ConsentStatus = 'granted' | 'denied' | 'pending';

export const getConsentStatus = (): ConsentStatus => {
  const cookie = Cookies.get(CONSENT_COOKIE_NAME);
  if (cookie === 'granted') return 'granted';
  if (cookie === 'denied') return 'denied';
  return 'pending';
};

export const setConsentStatus = (status: 'granted' | 'denied') => {
  Cookies.set(CONSENT_COOKIE_NAME, status, { expires: 365, sameSite: 'Lax' });
  if (status === 'granted') {
    initializeAnalytics();
    // PostHog consent
    if (posthog.__loaded) {
      posthog.opt_in_capturing();
    }
  } else {
    if (posthog.__loaded) {
      posthog.opt_out_capturing();
    }
  }
};

export const initializeGTM = () => {
  if (typeof window === 'undefined') return;
  if (window.dataLayer) return; // Already initialized

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Push GTM script
  (function(w: any, d: Document, s: string, l: string, i: string){
    w[l] = w[l] || [];
    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f = d.getElementsByTagName(s)[0];
    var j = d.createElement(s) as HTMLScriptElement;
    var dl = l != 'dataLayer' ? '&l='+l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id='+i+dl;
    if (f && f.parentNode) {
      f.parentNode.insertBefore(j, f);
    }
  })(window, document, 'script', 'dataLayer', GTM_ID);
};

export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...params
      });
    }
    
    // PostHog
    if (posthog.__loaded) {
      posthog.capture(eventName, params);
    }
    
    // Notify demo subscribers
    notifySubscribers(eventName, params);
  }
};

// Helper to preserve UTM parameters and add to outbound links
export const getOutboundLink = (baseUrl: string) => {
  if (typeof window === 'undefined') return baseUrl;
  
  const currentUrl = new URL(window.location.href);
  const targetUrl = new URL(baseUrl);
  
  // List of params to preserve
  const paramsToPreserve = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 
    'gclid', 'fbclid', 'ttclid' // Ad click IDs
  ];

  paramsToPreserve.forEach(param => {
    const value = currentUrl.searchParams.get(param);
    if (value) {
      targetUrl.searchParams.set(param, value);
    }
  });

  return targetUrl.toString();
};

// Analytics event subscribers for demo purposes
type AnalyticsSubscriber = (eventName: string, params: Record<string, any>) => void;
const subscribers: AnalyticsSubscriber[] = [];

export const subscribeToAnalytics = (callback: AnalyticsSubscriber): (() => void) => {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

// Notify all subscribers when an event is tracked
const notifySubscribers = (eventName: string, params: Record<string, any>) => {
  subscribers.forEach(subscriber => subscriber(eventName, params));
};

// Declare dataLayer on window
declare global {
  interface Window {
    dataLayer: any[];
  }
}
