import { useEffect } from "react";
import { Link } from "wouter";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy — The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
        </div>

        <div className="article-body">
          <h2>Who We Are</h2>
          <p>
            The Empowered Sensitive (<a href="https://sensitive.love">sensitive.love</a>) is a publication
            by <a href="https://kalesh.love" target="_blank" rel="noopener">Kalesh</a>, Consciousness
            Teacher &amp; Writer. We publish evidence-based articles on sensory processing sensitivity.
          </p>

          <h2>What Data We Collect</h2>
          <p>
            We collect minimal data necessary to operate this publication:
          </p>
          <p>
            <strong>Newsletter subscriptions:</strong> If you subscribe to our newsletter, we store your
            email address and the date of subscription. This data is stored securely on Bunny CDN
            infrastructure. We do not share your email with third parties.
          </p>
          <p>
            <strong>Cookies:</strong> This site uses a single functional cookie to remember your cookie
            consent preference. We do not use tracking cookies, advertising cookies, or third-party
            analytics cookies.
          </p>

          <h2>Content Delivery</h2>
          <p>
            Our site content, images, and fonts are served through Bunny CDN (bunny.net), a content
            delivery network. Bunny CDN may process your IP address and browser information as part
            of standard content delivery. Bunny CDN's privacy policy is available at{" "}
            <a href="https://bunny.net/privacy" target="_blank" rel="noopener noreferrer">
              bunny.net/privacy
            </a>.
          </p>

          <h2>Data Storage</h2>
          <p>
            All subscriber data is stored on Bunny CDN storage infrastructure. We do not use
            third-party databases, analytics platforms, or email marketing services. No data is
            shared with or sold to third parties.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal
            data at any time. To exercise these rights, visit{" "}
            <a href="https://kalesh.love" target="_blank" rel="noopener">kalesh.love</a>.
          </p>

          <h2>No Tracking</h2>
          <p>
            This site does not use Google Analytics, Facebook Pixel, or any other third-party
            tracking scripts. We do not track your browsing behavior across sites. We do not
            serve advertisements.
          </p>

          <h2>Affiliate Disclosure</h2>
          <p>
            As an Amazon Associate I earn from qualifying purchases.
          </p>
          <p>
            This site is a participant in the Amazon Services LLC Associates Program, an affiliate
            advertising program designed to provide a means for sites to earn advertising fees by
            advertising and linking to Amazon.com. Some links on this site are affiliate links,
            meaning we may earn a small commission at no additional cost to you.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be posted on
            this page with an updated revision date.
          </p>
        </div>
      </div>
    </div>
  );
}
