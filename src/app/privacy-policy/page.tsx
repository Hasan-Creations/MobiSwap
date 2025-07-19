import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import React from 'react';

const policyContent = `
Last updated: July 18, 2025

### Introduction
At MobiSwap, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.

### Information We Collect
We may collect the following types of information:
- **Non-personal data:** This includes browser type, IP address, the pages you visit on our site, and the time and date of your visit. This data is used for analytics and to improve our service.
- **Cookies:** We use cookies to enhance your user experience, remember your preferences, and for ad targeting.
- **Third-party data:** Our advertisers, such as Google AdSense, may collect data to personalize ads.

### Google AdSense
We use Google AdSense to display advertisements on MobiSwap. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting [Google's Ad Settings](https://www.google.com/settings/ads).

### How We Use Your Data
Your data is used to:
- Improve our website’s functionality, content, and user experience.
- Display relevant advertisements through our partners.
- Analyze website traffic and user behavior to better understand our audience.

### Your Rights
You have the right to manage your cookie preferences through your browser settings. As we primarily collect non-personal data, requests for data access or deletion can be made, but may be limited to the information we hold.

### Children's Privacy
MobiSwap is not intended for children under the age of 13, and we do not knowingly collect personal data from them.

### Changes to This Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

### Contact Us
If you have any questions about this Privacy Policy, please contact us at: **hasanayub@106gmail.com**.
`;

// Simple markdown-to-HTML parser
function parseAndRenderContent(content: string) {
    return content
        .trim()
        .split('\n\n')
        .map((paragraph, pIndex) => {
            if (paragraph.startsWith('### ')) {
                return <h3 key={pIndex} className="text-xl font-semibold mt-6 mb-2 text-primary">{paragraph.substring(4)}</h3>;
            }
            if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').map((item, iIndex) => (
                    <li key={iIndex} className="mb-1 ml-4" dangerouslySetInnerHTML={{ __html: item.substring(2) }} />
                ));
                return <ul key={pIndex} className="list-disc space-y-2">{items}</ul>;
            }
            const processedParagraph = paragraph.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
                                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return <p key={pIndex} className="mb-4 leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: processedParagraph }} />;
        });
}


export default function PrivacyPolicyPage() {
  const renderedContent = parseAndRenderContent(policyContent);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto glassmorphic">
        <CardHeader className="text-center">
            <div className="inline-block p-3 bg-primary/20 rounded-full mb-4 mx-auto w-fit">
                <Shield className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-3xl font-bold font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none text-foreground">
             {renderedContent}
        </CardContent>
      </Card>
    </div>
  );
}
