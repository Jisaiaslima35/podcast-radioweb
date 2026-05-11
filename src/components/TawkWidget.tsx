import { useEffect } from 'react';

interface TawkWidgetProps {
  propertyId: string;
}

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function TawkWidget({ propertyId }: TawkWidgetProps) {
  useEffect(() => {
    // Only embed if not already embedded
    if (!document.getElementById('tawk-script')) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.id = 'tawk-script';
      s1.src = `https://embed.tawk.to/${propertyId}/1im9g5v8n`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode?.insertBefore(s1, s0);
    }
  }, [propertyId]);

  return <div id="tawk_62201c1d1ffac05b1d7caef3"></div>;
}
