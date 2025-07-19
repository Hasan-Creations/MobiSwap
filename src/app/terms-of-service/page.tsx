import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import React from 'react';

const termsContent = `
Last updated: July 18, 2025

### Introduction
Welcome to MobiSwap. By accessing or using our website, you agree to comply with and be bound by these Terms of Service. Please read them carefully.

### Use of the Site
You agree to use MobiSwap for lawful purposes only. You are prohibited from posting or transmitting any material that is unlawful, harmful, threatening, abusive, or otherwise objectionable. You must not use the site in a way that could damage, disable, or impair any of our servers or networks.

### Advertisements and Third-Party Services
This site displays ads through Google AdSense. Your interactions with any third-party advertisers found on or through MobiSwap are solely between you and the advertiser. We are not responsible or liable for any loss or damage incurred as the result of any such dealings or as the result of the presence of such advertisers on the site.

### Intellectual Property
All content included on this site, such as text, graphics, logos, and images, is the property of MobiSwap or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any content on MobiSwap without our express written permission.

### Limitation of Liability
MobiSwap is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation of the site or the information, content, or materials included. We will not be liable for any damages of any kind arising from the use of this site, including, but not to, direct, indirect, incidental, punitive, and consequential damages. We do not guarantee that the service will be uninterrupted or error-free.

### User Accountability
You are solely responsible for your use of the MobiSwap website. You agree to indemnify and hold MobiSwap harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the site.

### Changes to Terms
We reserve the right to revise these terms at any time by updating this posting. Your continued use of the site after such changes have been posted will constitute your acceptance of the changes.

### Contact Information
If you have any questions about these Terms of Service, please contact us at: **hasanayub106@gmail.com**.
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
             const processedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return <p key={pIndex} className="mb-4 leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: processedParagraph }} />;
        });
}

export default function TermsOfServicePage() {
    const renderedContent = parseAndRenderContent(termsContent);

    return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto glassmorphic">
        <CardHeader className="text-center">
            <div className="inline-block p-3 bg-primary/20 rounded-full mb-4 mx-auto w-fit">
                <FileText className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-3xl font-bold font-headline">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none text-foreground">
            {renderedContent}
        </CardContent>
      </Card>
    </div>
  );
}
