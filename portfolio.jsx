import React, { useState } from 'react';

const PortfolioSite = () => {
  const [expandedCase, setExpandedCase] = useState(null);

  const caseStudies = [
    {
      id: 1,
      title: "Rebuilding Event Taxonomy at Scale",
      subtitle: "Reducing instrumentation debt while maintaining business continuity",
      tags: ["Event Tracking", "Technical Migration", "Stakeholder Management"],
      context: "Inherited a fragmented event taxonomy across 50+ services with inconsistent naming, duplicative events, and no clear ownership. This created data quality issues and slowed down analytics teams by 40%.",
      challenge: "How do you standardize event tracking across dozens of teams without breaking existing dashboards, reports, or disrupting ongoing experiments?",
      approach: [
        "Conducted comprehensive audit of 2,000+ events, identifying 30% redundancy",
        "Built cross-functional working group with data engineering, analytics, and product teams",
        "Created tiered migration strategy: deprecate unused events, consolidate duplicates, standardize new events",
        "Developed automated validation toolkit to catch schema violations at build time",
        "Implemented gradual rollout with dual-write period to ensure zero data loss"
      ],
      impact: [
        "Reduced active events by 35% while improving coverage of critical user journeys",
        "Cut average time-to-insight for analysts from 3 days to 4 hours",
        "Established governance model adopted across org (20+ teams)",
        "Zero production incidents during 6-month migration"
      ],
      learnings: "The technical work was 30% of the effort. The real challenge was change management—getting teams to adopt new standards required clear incentives, easy tooling, and relentless communication."
    },
    {
      id: 2,
      title: "Building Real-Time Operational Dashboards",
      subtitle: "From batch processing to sub-minute latency metrics",
      tags: ["Data Infrastructure", "Real-time Systems", "Business Impact"],
      context: "Operations teams were making decisions on 24-hour-old data. During peak events, this meant millions in potential lost revenue due to inability to react quickly to issues.",
      challenge: "Existing data pipeline was batch-based with T+1 day latency. Business needed sub-minute visibility into key operational metrics during high-traffic events.",
      approach: [
        "Evaluated build vs. buy: assessed Kinesis, Kafka, Flink against requirements",
        "Designed streaming architecture using Kinesis Data Streams + Lambda + DynamoDB",
        "Prioritized ruthlessly: started with 5 critical metrics vs. 50 'nice-to-haves'",
        "Built incremental rollout plan: shadow mode, then read-only dashboard, then operational use",
        "Created runbooks and trained ops teams on new tooling"
      ],
      impact: [
        "Achieved 45-second P95 latency for critical operational metrics",
        "Enabled real-time intervention during peak events, improving conversion by 2.3%",
        "Reduced MTTR (Mean Time To Resolution) for operational issues by 60%",
        "Infrastructure costs stayed flat despite real-time processing (smart architectural choices)"
      ],
      learnings: "Real-time doesn't always mean better. We almost over-engineered this. The key insight was distinguishing between metrics that genuinely needed real-time vs. those where 'faster batch' (hourly) would suffice."
    },
    {
      id: 3,
      title: "Sunsetting Legacy Analytics Platform",
      subtitle: "Migrating 200+ dashboards while gaining stakeholder buy-in",
      tags: ["Technical Debt", "Migration", "Cost Optimization"],
      context: "Company was running two analytics platforms in parallel—legacy Tableau instance and newer Looker deployment. Dual maintenance cost $2M/year and created confusion about source of truth.",
      challenge: "200+ active Tableau dashboards, 500+ users, strong attachment to familiar tooling. Previous migration attempt failed due to poor change management.",
      approach: [
        "Built detailed migration assessment: categorized dashboards by usage, complexity, business criticality",
        "Identified 40% of dashboards had zero usage in 90 days—quick wins for deprecation",
        "Created tiered support model: white-glove for executives, self-service for power users, group training for casual users",
        "Designed Looker equivalent for top 20 critical dashboards first",
        "Set hard sunset date 6 months out with monthly countdown communication"
      ],
      impact: [
        "Successfully migrated 100% of active dashboards in 5 months",
        "Reduced analytics platform costs by $1.8M annually",
        "Improved dashboard load times by 3x on new platform",
        "Post-migration survey: 78% of users preferred new platform"
      ],
      learnings: "The failed previous attempt taught me that technical excellence isn't enough. We won by building a coalition—executive sponsorship, early adopter champions in each org, and celebrating small wins publicly."
    }
  ];

  const philosophyPrinciples = [
    {
      title: "Perfect is the enemy of shipped",
      content: "In analytics, waiting for 100% data quality often means never launching. I prioritize getting 80% accurate data in hands of decision-makers quickly over perfect data that arrives too late to matter."
    },
    {
      title: "Instrumentation is product work",
      content: "Too many PMs treat analytics as an afterthought. I believe event tracking, metrics definition, and measurement strategy are core product deliverables—they should be in your PRD, not a post-launch task."
    },
    {
      title: "Data without context is noise",
      content: "The best dashboard isn't the one with the most metrics—it's the one that answers a specific question for a specific user. I ruthlessly cut metrics that don't drive decisions."
    },
    {
      title: "Build with engineers, not at them",
      content: "Analytics PMs need deep technical credibility. I invest time understanding data architecture, pipeline trade-offs, and infrastructure constraints. This earns trust and leads to better solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
              Analytics & Measurement PM
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Building data products that turn<br />insights into impact
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Senior Product Manager with 8+ years driving analytics, measurement, and data platform initiatives at Amazon. 
            I translate complex data challenges into elegant product solutions that scale.
          </p>
          <div className="flex gap-4">
            <a href="#case-studies" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
              View Case Studies
            </a>
            <a href="#philosophy" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition">
              How I Think
            </a>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">8+</div>
              <div className="text-sm text-slate-600">Years in Product</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">$15M+</div>
              <div className="text-sm text-slate-600">Cost Savings Driven</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-sm text-slate-600">Cross-Functional Teams</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 mb-2">10M+</div>
              <div className="text-sm text-slate-600">Events/Day Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Case Studies</h2>
          <p className="text-lg text-slate-600 mb-12">
            Deep dives into analytics and measurement challenges I've tackled
          </p>

          <div className="space-y-6">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedCase(expandedCase === study.id ? null : study.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-slate-900">{study.title}</h3>
                    <svg 
                      className={`w-6 h-6 text-slate-400 transition-transform ${expandedCase === study.id ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-slate-600 mb-4">{study.subtitle}</p>
                  <div className="flex gap-2 flex-wrap">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {expandedCase === study.id && (
                  <div className="px-6 pb-6 border-t border-slate-100 pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          Context
                        </h4>
                        <p className="text-slate-700 leading-relaxed">{study.context}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                          Challenge
                        </h4>
                        <p className="text-slate-700 leading-relaxed">{study.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          Approach
                        </h4>
                        <ul className="space-y-2">
                          {study.approach.map((item, idx) => (
                            <li key={idx} className="text-slate-700 leading-relaxed pl-6 relative">
                              <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                          Impact
                        </h4>
                        <ul className="space-y-2">
                          {study.impact.map((item, idx) => (
                            <li key={idx} className="text-slate-700 leading-relaxed pl-6 relative">
                              <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600">
                        <h4 className="font-semibold text-slate-900 mb-2">Key Learning</h4>
                        <p className="text-slate-700 leading-relaxed italic">{study.learnings}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How I Think About Product</h2>
          <p className="text-lg text-slate-600 mb-12">
            Principles that guide my approach to analytics and measurement
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {philosophyPrinciples.map((principle, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{principle.title}</h3>
                <p className="text-slate-700 leading-relaxed">{principle.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Technical Toolkit</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Analytics Platforms</h3>
              <div className="space-y-2">
                {['Looker', 'Tableau', 'Redshift', 'Snowflake', 'Amplitude', 'Mixpanel'].map(tool => (
                  <div key={tool} className="text-slate-700">{tool}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Data Engineering</h3>
              <div className="space-y-2">
                {['SQL (Advanced)', 'Python', 'Airflow', 'Kafka', 'Kinesis', 'Lambda'].map(tool => (
                  <div key={tool} className="text-slate-700">{tool}</div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Experimentation</h3>
              <div className="space-y-2">
                {['A/B Testing', 'Statistical Analysis', 'Causal Inference', 'Bayesian Methods'].map(tool => (
                  <div key={tool} className="text-slate-700">{tool}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">About Me</h2>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
            <p>
              I'm a Senior Product Manager currently at Amazon, where I've spent the last several years building 
              analytics products, measurement systems, and data platforms that power critical business decisions.
            </p>
            <p>
              My career has been defined by a passion for turning messy data problems into elegant product solutions. 
              Whether it's rebuilding event taxonomies, migrating legacy systems, or building real-time dashboards, 
              I thrive at the intersection of technical complexity and business impact.
            </p>
            <p>
              What drives me? I believe that great analytics products don't just present data—they change how 
              organizations make decisions. The best measurement systems fade into the background, becoming invisible 
              infrastructure that teams rely on without thinking about.
            </p>
            <p>
              I'm now looking for my next opportunity to build world-class analytics and measurement products at 
              a Tier 1 or 2 tech company in Seattle. If you're working on hard data problems and need a PM who 
              can bridge technical depth with business strategy, let's talk.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <a href="mailto:yourname@email.com" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
              Get in Touch
            </a>
            <a href="https://linkedin.com/in/yourprofile" className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-medium transition">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2026 Your Name. Built with React and Tailwind CSS.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Because even portfolio sites should demonstrate product thinking.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioSite;
