import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ScanLine, 
  Leaf, 
  ArrowRightLeft, 
  ChefHat, 
  ShoppingCart, 
  Bot, 
  Share2, 
  History, 
  Check, 
  X,
  Globe,
  Quote,
  Smartphone,
  Send,
  ArrowRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import heroImage from "@assets/generated_images/app_hero_image_with_fresh_food.png";
import martaImage from "@assets/generated_images/grandmother_cooking_in_kitchen.png";
import tomekImage from "@assets/generated_images/young_father_with_baby_in_kitchen.png";
import annaImage from "@assets/generated_images/mother_shopping_with_children.png";
import krzysztofImage from "@assets/generated_images/senior_man_shopping.png";
import logoImage from "@assets/file_000000002d046243903a98b99f8929ab_1767445999810.png";
import { CookieBanner } from "@/components/CookieBanner";
import { trackEvent, getOutboundLink, initializeAnalytics, getConsentStatus } from "@/lib/analytics";
import { toast } from "sonner";
import { useEffect } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Helper to get UTM parameters from URL
function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || undefined,
    campaign: params.get('utm_campaign') || undefined,
  };
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [utmParams] = useState(() => getUtmParams());

  // Initialize analytics on mount if consent is already granted
  useEffect(() => {
    if (getConsentStatus() === 'granted') {
      initializeAnalytics();
    }
    trackEvent('page_view', { page: 'home', ...utmParams });
  }, [utmParams]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    trackEvent('change_language', { language: lng });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email, 
            language: i18n.language,
            source: utmParams.source,
            campaign: utmParams.campaign
          })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          trackEvent('submit_waitlist', { email_provided: true, success: true });
          setEmail("");
          toast.success(t('waitlist.success_title') || "You're on the list!", {
            description: t('waitlist.success_desc') || "We'll notify you as soon as SuntValg is ready.",
          });
        } else {
          trackEvent('submit_waitlist', { email_provided: true, success: false, error: data.message });
          toast.error("Something went wrong", {
            description: data.message || "Please try again later.",
          });
        }
      } catch (error) {
        console.error('Error submitting to waitlist:', error);
        trackEvent('submit_waitlist', { email_provided: true, success: false, error: 'network_error' });
        toast.error("Connection error", {
          description: "Please check your internet connection and try again.",
        });
      }
    }
  };

  // Simulated download/store links with analytics
  const handleStoreClick = (platform: 'ios' | 'android' | 'other') => {
    const eventName = 
      platform === 'ios' ? 'click_download_ios' : 
      platform === 'android' ? 'click_download_android' : 
      'click_external_store';
    
    // Example store URLs - in production these would be real App Store / Play Store links
    // or Branch/AppsFlyer links like: https://suntvalg.app.link/download
    const baseUrl = platform === 'ios' 
      ? 'https://apps.apple.com/no/app/suntvalg/id123456789' 
      : 'https://play.google.com/store/apps/details?id=com.suntvalg.app';
      
    const finalUrl = getOutboundLink(baseUrl);
    
    trackEvent(eventName, { 
      destination_url: finalUrl,
      platform: platform 
    });

    // In a real scenario, you'd redirect:
    // window.location.href = finalUrl;
    console.log(`Redirecting to ${finalUrl} with tracking`);
  };

  const features = [
    { icon: ScanLine, title: t('features.scan.title'), description: t('features.scan.desc') },
    { icon: Leaf, title: t('features.ingredients.title'), description: t('features.ingredients.desc') },
    { icon: ArrowRightLeft, title: t('features.alternatives.title'), description: t('features.alternatives.desc') },
    { icon: ChefHat, title: t('features.mealplan.title'), description: t('features.mealplan.desc') },
    { icon: ShoppingCart, title: t('features.shoppinglist.title'), description: t('features.shoppinglist.desc') },
    { icon: Bot, title: t('features.ai.title'), description: t('features.ai.desc') },
    { icon: Share2, title: t('features.share.title'), description: t('features.share.desc') },
    { icon: History, title: t('features.history.title'), description: t('features.history.desc') }
  ];

  const steps = [
    { title: t('howItWorks.step1.title'), description: t('howItWorks.step1.desc'), icon: ScanLine },
    { title: t('howItWorks.step2.title'), description: t('howItWorks.step2.desc'), icon: Bot },
    { title: t('howItWorks.step3.title'), description: t('howItWorks.step3.desc'), icon: Leaf }
  ];

  const testimonials = [
    { name: "Ingrid", role: t('stories.ingrid.role'), image: martaImage, quote: t('stories.ingrid.quote') },
    { name: "Magnus", role: t('stories.magnus.role'), image: tomekImage, quote: t('stories.magnus.quote') },
    { name: "Kari", role: t('stories.kari.role'), image: annaImage, quote: t('stories.kari.quote') },
    { name: "Einar", role: t('stories.einar.role'), image: krzysztofImage, quote: t('stories.einar.quote') }
  ];

  const currentLang = i18n.language.toUpperCase();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="SuntValg Logo" className="h-10 w-auto object-contain rounded-lg" />
            <span className="text-xl font-display font-bold text-primary">SuntValg</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">{t('nav.features')}</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">{t('nav.howItWorks')}</a>
            <a href="#stories" className="hover:text-primary transition-colors">{t('nav.stories')}</a>
            <a href="#pricing" className="hover:text-primary transition-colors">{t('nav.pricing')}</a>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 font-medium">
                  <Globe className="w-4 h-4" />
                  {currentLang === 'NO' ? '🇳🇴 NO' : 
                   currentLang === 'SV' ? '🇸🇪 SV' : 
                   currentLang === 'DA' ? '🇩🇰 DA' : 
                   currentLang === 'PL' ? '🇵🇱 PL' : 
                   currentLang === 'EN' ? '🇬🇧 EN' : '🇷🇺 RU'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('no')}>🇳🇴 Norsk</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('sv')}>🇸🇪 Svenska</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('da')}>🇩🇰 Dansk</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('pl')}>🇵🇱 Polski</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ru')}>🇷🇺 Русский</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="hidden sm:flex" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('nav.download')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge variant="secondary" className="px-4 py-2 text-primary bg-primary/10 hover:bg-primary/20 border-none text-sm font-medium rounded-full whitespace-normal text-balance">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground">
              {t('hero.title_start')} <br />
              <span className="text-primary">{t('hero.title_end')}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            {/* Waitlist Form */}
            <div className="pt-4 max-w-md">
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleWaitlistSubmit}>
                <Input 
                  type="email" 
                  name="email"
                  autoComplete="email"
                  placeholder={t('waitlist.email_placeholder')} 
                  className="h-12 rounded-xl border-2 focus-visible:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button size="lg" className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all w-full sm:w-auto">
                  {t('hero.cta_primary')}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2 ml-1">
                {t('waitlist.subtitle')}
              </p>
            </div>

            <div className="pt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-3">
                {[martaImage, tomekImage, annaImage].map((img, i) => (
                  <img key={i} src={img} alt="User" className="w-10 h-10 rounded-full border-2 border-background object-cover" />
                ))}
              </div>
              <p>{t('hero.users')}</p>
            </div>

            <div className="flex flex-col gap-3 pt-6">
              <div className="flex items-center gap-2 text-primary font-medium text-sm animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{t('hero.coming_soon') || "Coming Soon - Join the Waitlist"}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
               <Button
                 variant="outline"
                 className="h-auto py-2 px-4 bg-black hover:bg-black/90 text-white border-0 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                 onClick={() => handleStoreClick('ios')}
               >
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
                 
                 <svg viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                   <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                 </svg>
                 <div className="flex flex-col items-start text-left">
                   <span className="text-[10px] sm:text-xs font-medium opacity-80 leading-none mb-1">Download on the</span>
                   <span className="text-lg sm:text-xl font-bold leading-none font-display">App Store</span>
                 </div>
               </Button>

               <Button
                 variant="outline" 
                 className="h-auto py-2 px-4 bg-black hover:bg-black/90 text-white border-0 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                 onClick={() => handleStoreClick('android')}
               >
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />

                 <svg viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                   <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                 </svg>
                 <div className="flex flex-col items-start text-left">
                   <span className="text-[10px] sm:text-xs font-medium opacity-80 leading-none mb-1 uppercase tracking-wide">Get it on</span>
                   <span className="text-lg sm:text-xl font-bold leading-none font-display">Google Play</span>
                 </div>
               </Button>
             </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-[3rem] blur-3xl -z-10 transform rotate-6 scale-90" />
            <img 
              src={heroImage} 
              alt="SuntValg App Interface" 
              className="rounded-[2.5rem] shadow-2xl border-8 border-background w-full max-w-md mx-auto transform hover:-translate-y-2 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeInUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('features.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('features.subtitle')}</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
              >
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 container mx-auto px-4">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('howItWorks.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('howItWorks.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent border-t-2 border-dashed border-primary/30 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="text-center space-y-6 relative bg-background p-4"
            >
              <div className="w-24 h-24 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 text-3xl font-bold relative z-10">
                <step.icon className="w-10 h-10" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold border-2 border-background">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold">{step.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* User Stories */}
      <section id="stories" className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('stories.title')}</h2>
            <p className="text-primary-foreground/80 text-lg">{t('stories.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/10 backdrop-blur-md border-none text-primary-foreground overflow-hidden h-full">
                  <CardContent className="p-0 flex flex-col md:flex-row h-full">
                    <div className="md:w-2/5 h-64 md:h-auto relative shrink-0">
                      <img src={story.image} alt={story.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
                    </div>
                    <div className="md:w-3/5 p-8 flex flex-col justify-center space-y-4">
                      <Quote className="w-10 h-10 text-primary-foreground/40 mb-2" />
                      <p className="text-lg md:text-xl font-medium leading-relaxed italic opacity-90">
                        "{story.quote}"
                      </p>
                      <div className="pt-4 border-t border-primary-foreground/20 mt-4">
                        <h4 className="font-bold text-lg">{story.name}</h4>
                        <p className="text-primary-foreground/70 text-sm">{story.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (New Layout) */}
      <section id="pricing" className="py-24 container mx-auto px-4">
        <motion.div 
          {...fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('pricing.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('pricing.subtitle')}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Feature List */}
          <div className="bg-card rounded-2xl p-6 mb-8 border border-border/50 shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                t('pricing.features.unlimited_scans'),
                t('pricing.features.ai_assistant'),
                t('pricing.features.health_alternatives'),
                t('pricing.features.smart_planning'),
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="font-medium text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Plan */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary/10 bg-[#FFFBEB] dark:bg-yellow-950/20 hover:border-primary/30 transition-all cursor-pointer">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">{t('pricing.monthly_plan')}</h3>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-foreground">{t('pricing.monthly_price')}</span>
                    <p className="text-muted-foreground mt-1 text-sm">{t('pricing.monthly_subtext')}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-auto bg-white hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/30 text-primary border-primary">
                    {t('pricing.monthly_cta')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Annual Plan */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary/20 bg-[#D1FAE5] dark:bg-green-900/20 hover:border-primary/50 transition-all relative overflow-hidden cursor-pointer">
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Leaf className="w-3 h-3" /> {t('pricing.annual_badge')}
                </div>
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4">{t('pricing.annual_plan')}</h3>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-foreground">{t('pricing.annual_price')}</span>
                    <p className="text-muted-foreground mt-1 text-sm">{t('pricing.annual_subtext')}</p>
                  </div>
                  <Button className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                    {t('pricing.annual_cta')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t('faq.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('faq.subtitle')}</p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-none bg-background rounded-xl px-4 shadow-sm">
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-6 text-left">
                  {t(`faq.q${i}`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {t(`faq.a${i}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Waitlist / Footer */}
      <footer id="waitlist" className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 bg-transparent">
              <img src={logoImage} alt="SuntValg Logo" className="w-full h-full object-contain rounded-2xl" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              {t('waitlist.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('waitlist.subtitle')}
            </p>
            
            <form className="max-w-md mx-auto flex gap-2 flex-col sm:flex-row mt-8" onSubmit={handleWaitlistSubmit}>
              <Input 
                type="email" 
                name="email"
                autoComplete="email"
                placeholder={t('waitlist.email_placeholder')} 
                className="h-14 rounded-xl border-gray-700 bg-background/5 text-white placeholder:text-gray-500 focus-visible:ring-primary focus-visible:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90">
                {t('waitlist.button')} <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>

            <div className="flex flex-col items-center gap-3 pt-8 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 text-white/60 font-medium text-xs uppercase tracking-wider">
                  <span>{t('hero.coming_soon') || "Coming Soon"}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button
                 variant="outline"
                 className="h-auto py-2 px-4 bg-black/50 hover:bg-black text-white border-gray-700 hover:border-gray-500 rounded-xl flex items-center gap-3 transition-all duration-300 group"
                 onClick={() => handleStoreClick('ios')}
               >
                 <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6">
                   <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                 </svg>
                 <div className="flex flex-col items-start text-left">
                   <span className="text-[9px] font-medium opacity-80 leading-none mb-0.5">Download on the</span>
                   <span className="text-sm font-bold leading-none font-display">App Store</span>
                 </div>
               </Button>

               <Button
                 variant="outline" 
                 className="h-auto py-2 px-4 bg-black/50 hover:bg-black text-white border-gray-700 hover:border-gray-500 rounded-xl flex items-center gap-3 transition-all duration-300 group"
                 onClick={() => handleStoreClick('android')}
               >
                 <svg viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                   <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                 </svg>
                 <div className="flex flex-col items-start text-left">
                   <span className="text-[9px] font-medium opacity-80 leading-none mb-0.5 uppercase tracking-wide">Get it on</span>
                   <span className="text-sm font-bold leading-none font-display">Google Play</span>
                 </div>
               </Button>
             </div>
            </div>
          </motion.div>
          
          {/* Social Media Links */}
          <div className="mt-12 flex justify-center gap-5">
            <a 
              href="https://www.instagram.com/sunt.valg.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
              data-testid="link-instagram"
              onClick={(e) => {
                e.preventDefault();
                trackEvent('click_social', { platform: 'instagram' });
                window.open('https://www.instagram.com/sunt.valg.app/', '_blank', 'noopener,noreferrer');
              }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61585928526640"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#1877F2] rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
              data-testid="link-facebook"
              onClick={(e) => {
                e.preventDefault();
                trackEvent('click_social', { platform: 'facebook' });
                window.open('https://www.facebook.com/profile.php?id=61585928526640', '_blank', 'noopener,noreferrer');
              }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@suntvalgapp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-black rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg border border-gray-700"
              data-testid="link-tiktok"
              onClick={(e) => {
                e.preventDefault();
                trackEvent('click_social', { platform: 'tiktok' });
                window.open('https://www.tiktok.com/@suntvalgapp', '_blank', 'noopener,noreferrer');
              }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
          
          <p className="text-gray-400 text-sm mt-6">{t('footer.follow_us') || 'Follow us for updates and healthy tips!'}</p>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; 2026 SuntValg AS. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-primary cursor-pointer">Privacy</span>
              <span className="hover:text-primary cursor-pointer">Terms</span>
              <span className="hover:text-primary cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </div>
  );
}
