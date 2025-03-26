export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About IPTP</h3>
            <p className="text-sm text-muted-foreground">
              Promoting transparency and accountability in Indian politics through data-driven insights
              and citizen engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Home</a></li>
              <li><a href="#" className="hover:text-foreground">Politicians</a></li>
              <li><a href="#" className="hover:text-foreground">Constituencies</a></li>
              <li><a href="#" className="hover:text-foreground">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Data Sources</a></li>
              <li><a href="#" className="hover:text-foreground">API Documentation</a></li>
              <li><a href="#" className="hover:text-foreground">Research Papers</a></li>
              <li><a href="#" className="hover:text-foreground">Press Kit</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: contact@iptp.gov.in</li>
              <li>Phone: +91-11-2309-3000</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 Indian Political Transparency Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}