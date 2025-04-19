'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RedirectingPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'pt-BR' | 'en' | 'es'>('pt-BR');
  const [countdown, setCountdown] = useState<number>(7);

  useEffect(() => {
    // Check if there's a stored timestamp in localStorage
    const storedEndTime = localStorage.getItem('redirectEndTime');
    let endTime: number;
    
    if (!storedEndTime) {
      // If no stored timestamp, create a new one (current time + 7 seconds)
      endTime = Date.now() + 7000;
      localStorage.setItem('redirectEndTime', endTime.toString());
    } else {
      // Use the stored timestamp
      endTime = parseInt(storedEndTime);
    }

    // Calculate remaining time
    const calculateRemainingTime = () => {
      const now = Date.now();
      const remaining = Math.ceil((endTime - now) / 1000);
      
      // If countdown is complete or negative, reload the page
      if (remaining <= 0) {
        localStorage.removeItem('redirectEndTime');
        // Set a flag to redirect after reload
        localStorage.setItem('shouldRedirect', 'true');
        window.location.reload();
        return 0;
      }
      
      return remaining;
    };

    // Check if we should redirect after reload
    const shouldRedirect = localStorage.getItem('shouldRedirect');
    if (shouldRedirect === 'true') {
      localStorage.removeItem('shouldRedirect');
      window.location.href = '/home';
      return;
    }

    // Set initial countdown value
    setCountdown(calculateRemainingTime());
    
    // Countdown timer that recalculates remaining time
    const countdownInterval = setInterval(() => {
      const remaining = calculateRemainingTime();
      setCountdown(remaining);
    }, 1000);

    // Try to detect browser language
    const browserLang = navigator.language;
    if (browserLang.startsWith('pt')) {
      setLanguage('pt-BR');
    } else if (browserLang.startsWith('es')) {
      setLanguage('es');
    } else {
      setLanguage('en');
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [router]);

  const messages = {
    'pt-BR': {
      title: 'Preparando sua conta',
      description: 'Estamos preparando tudo para você. Você será redirecionado em breve.',
      countdown: `Redirecionando em ${countdown} segundos...`,
    },
    'en': {
      title: 'Preparing your account',
      description: 'We are setting everything up for you. You will be redirected shortly.',
      countdown: `Redirecting in ${countdown} seconds...`,
    },
    'es': {
      title: 'Preparando tu cuenta',
      description: 'Estamos preparando todo para ti. Serás redirigido en breve.',
      countdown: `Redirigiendo en ${countdown} segundos...`,
    },
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-6 max-w-md">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        
        <h1 className="text-2xl font-bold text-gray-900">
          {messages[language].title}
        </h1>
        
        <p className="text-gray-600">
          {messages[language].description}
        </p>
        
        <p className="text-sm text-gray-500">
          {messages[language].countdown}
        </p>
      </div>
    </div>
  );
}
