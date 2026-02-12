import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Blog | HOQUE',
  description: 'Read our latest articles and insights on international university admissions, study abroad tips, and more.',
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Our Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Insights, tips, and updates about international university admissions and studying abroad.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6h6m0 0v6"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
                We're Working On It
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
                Our blog is currently under development. We're preparing exciting articles and insights about international university admissions, study tips, and more. Thank you for your patience!
              </p>
            </div>

            {/* Features Coming Soon */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Expert Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guides from our experts
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17c0 5.25 3.07 9.772 7.5 11.743m0-13c5.5 0 10 4.745 10 10 0 5.25-3.07 9.772-7.5 11.743m0-13V5.75m0 13H7.5m0 0c-2.3 1.146-4.217 2.712-5.5 4.632M17.5 19.5c2.3 1.146 4.217 2.712 5.5 4.632"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Student Stories</h3>
                <p className="text-sm text-muted-foreground">
                  Success stories and testimonials from our students
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">News & Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Latest news from universities worldwide and admissions updates
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground mb-4">
                In the meantime, feel free to explore our services or contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/services/one-to-one-consultation"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Schedule a Consultation
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      
      <Footer />
    </div>
  )
}
