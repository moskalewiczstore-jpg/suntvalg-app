import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { setConsentStatus, getConsentStatus } from '@/lib/analytics';
import { ShieldCheck, X } from 'lucide-react';

export function CookieBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check consent status on mount
    const status = getConsentStatus();
    if (status === 'pending') {
      // Small delay for animation/UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsentStatus('granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsentStatus('denied');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl bg-card border border-border shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0 hidden md:block">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="font-display font-bold text-lg">
                Vi bryr oss om ditt personvern
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Vi bruker informasjonskapsler (cookies) for å forbedre opplevelsen din, måle trafikk og levere relevant innhold.
                Ved å klikke "Godta alle" samtykker du til bruk av markedsføringscookies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
               <Button variant="outline" onClick={handleDecline} className="w-full sm:w-auto">
                 Kun nødvendige
               </Button>
               <Button onClick={handleAccept} className="w-full sm:w-auto">
                 Godta alle
               </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
