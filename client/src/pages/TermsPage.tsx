import { useEffect } from "react";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms of Service — The Empowered Sensitive";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="thick-rule pt-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
        </div>

        <div className="article-body">
          <h2>Educational Purpose</h2>
          <p>
            The Empowered Sensitive provides educational content about sensory processing sensitivity,
            nervous system regulation, and related topics. All content is intended for informational
            and educational purposes only.
          </p>
          <p>
            <strong>This site does not provide medical, psychological, or therapeutic advice.</strong>{" "}
            Nothing published here should be construed as professional health advice, diagnosis, or
            treatment. Always consult qualified healthcare professionals for medical or psychological
            concerns.
          </p>

          <h2>Content Accuracy</h2>
          <p>
            We strive to present accurate, research-backed information and cite relevant studies and
            researchers. However, the field of sensory processing sensitivity is evolving, and we
            cannot guarantee that all information is current or complete. Readers should verify
            information independently and consult primary sources when making decisions about their
            health or wellbeing.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All original content, including articles, images, and design elements, is the intellectual
            property of The Empowered Sensitive and its author, Kalesh. Content may not be reproduced,
            distributed, or transmitted without prior written permission, except for brief quotations
            in reviews or academic citations with proper attribution.
          </p>

          <h2>User Conduct</h2>
          <p>
            By using this site, you agree to use it for lawful purposes only. You agree not to
            attempt to gain unauthorized access to any part of the site, interfere with its
            operation, or use automated tools to scrape or harvest content without permission.
          </p>

          <h2>Newsletter</h2>
          <p>
            If you subscribe to our newsletter, you consent to receiving periodic emails about
            new content. You may unsubscribe at any time. We do not share subscriber information
            with third parties.
          </p>

          <h2>External Links</h2>
          <p>
            This site contains links to external websites and resources. We are not responsible
            for the content, privacy practices, or availability of external sites. Inclusion of
            a link does not imply endorsement.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            The Empowered Sensitive and its author shall not be liable for any direct, indirect,
            incidental, or consequential damages arising from the use of this site or reliance
            on its content. Use of this site is at your own risk.
          </p>

          <h2>Changes</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the site
            after changes constitutes acceptance of the updated terms.
          </p>
        </div>
      </div>
    </div>
  );
}
