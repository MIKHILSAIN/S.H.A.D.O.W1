'use client'

import { useRouter } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'
import { Brain, Activity, GitBranch, Mic, ScanFace, FileCode, Zap } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    title: 'Multi-Model Neural Ensemble',
    description: '4+ deep learning models vote on authenticity with aggressive confidence weighting',
    icon: Brain,
  },
  {
    title: 'Frequency Domain Forensics',
    description: 'FFT/DCT analysis detects GAN and diffusion model artifacts invisible to human eyes',
    icon: Activity,
  },
  {
    title: 'Temporal Consistency Tracking',
    description: 'Tracks facial landmarks and identity persistence across video frames to catch unnatural transitions',
    tag: 'Video',
    icon: GitBranch,
  },
  {
    title: 'Audio-Visual Synchronization',
    description: 'Voice deepfake detection with lip-sync correlation analysis',
    tag: 'Video',
    icon: Mic,
  },
  {
    title: 'Facial Forensics',
    description: 'Analyzes symmetry, eye quality, skin texture, and anatomical correctness',
    icon: ScanFace,
  },
  {
    title: 'Metadata Intelligence',
    description: 'EXIF data analysis and ELA compression forensics reveal editing history',
    icon: FileCode,
  },
  {
    title: 'Real-Time Analysis',
    description: 'Process thousands of images per minute via distributed edge network',
    icon: Zap,
  },
]

function HorizontalScrollFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || !sectionRef.current || !cardsContainerRef.current) return

    const section = sectionRef.current
    const cardsContainer = cardsContainerRef.current
    const cardWidth = 380 + 24
    const totalWidth = cardWidth * features.length
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth + 300

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollDistance * 2}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(cardsContainer, {
      x: -scrollDistance,
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <section id="features" className="py-20 px-6">
        <div className="container max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Advanced Detection <br />
              Features.
            </h2>
            <p className="text-slate-400 text-lg">
              Multi-layered analysis combining neural networks, signal processing, and biological verification.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-white/60">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                        {feature.tag && (
                          <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded">
                            {feature.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="features" ref={sectionRef} className="relative h-screen overflow-hidden z-10">
      <div className="h-screen flex items-center">
        <div className="w-full">
          <div className="container max-w-7xl mx-auto px-6 mb-12">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Advanced Detection <br />
                Features.
              </h2>
              <p className="text-slate-400 text-lg">
                Multi-layered analysis combining neural networks, signal processing, and biological verification.
              </p>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={cardsContainerRef}
              className="flex gap-6 pl-6 md:pl-[calc((100vw-1280px)/2+1.5rem)]"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className="group flex-shrink-0 w-[380px] bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden"
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scanline" />
                    </div>

                    <div className="mb-6 relative">
                      <Icon
                        size={32}
                        className="text-white/60 transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                        strokeWidth={1.5}
                      />
                      <Icon
                        size={32}
                        className="absolute top-0 left-0 text-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-75 group-hover:translate-x-[-2px] group-hover:translate-y-[-1px]"
                        strokeWidth={1.5}
                      />
                      <Icon
                        size={32}
                        className="absolute top-0 left-0 text-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-75 group-hover:translate-x-[2px] group-hover:translate-y-[1px]"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="glitch-text text-2xl font-semibold text-white relative">
                          {feature.title}
                          <span className="glitch-text-layer" data-text={feature.title}></span>
                          <span className="glitch-text-layer" data-text={feature.title}></span>
                        </h3>
                        {feature.tag && (
                          <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                            {feature.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scanline {
          animation: scanline 2s ease-in-out infinite;
        }

        .glitch-text {
          position: relative;
          display: inline-block;
        }

        .glitch-text-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </section>
  )
}

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,30,60,0.18),transparent_42%),radial-gradient(circle_at_70%_80%,rgba(8,15,30,0.12),transparent_38%)]" />
      </div>

      <section id="home" className="flex h-screen w-screen relative bg-gradient-to-br from-black via-[#0a0a0f] to-black overflow-hidden z-10">
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage: 'url("/images/futuristic-subject-portrait-for-ai-verification.jpg")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        <div className="flex-1 flex items-center justify-center p-[60px] relative">
          <div className="max-w-[520px] relative z-10 -translate-y-[70px]">
            <p className="text-sm font-light tracking-[3px] uppercase text-white/50 mb-6 animate-fade-in-up opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
              TRUST WHAT YOU SEE?
            </p>

            <h1 className="text-[92px] font-normal tracking-[12px] leading-none mb-8 text-white uppercase animate-fade-in-up opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards] font-space">
              S.H.A.D.O.W
            </h1>

            <p className="text-[17px] font-light text-white/60 mb-[120px] tracking-[0.5px] animate-fade-in-up opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
              AI-assisted media credibility analysis
            </p>

            <div className="flex gap-5 animate-fade-in-up opacity-0 [animation-delay:0.8s] [animation-fill-mode:forwards]">
              <button
                onClick={() => router.push('/learn')}
                className="group relative px-12 py-4 text-[15px] font-normal tracking-[1px] uppercase border border-white/15 bg-transparent text-white/70 cursor-pointer overflow-hidden transition-all duration-300 hover:text-white/90 hover:border-white/25 hover:-translate-y-0.5 will-change-transform"
              >
                <span className="relative z-10">Learn</span>
                <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/10 -translate-x-1/2 -translate-y-1/2 transition-all duration-[600ms] group-hover:w-[300px] group-hover:h-[300px]" />
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
          }

          .will-change-transform {
            will-change: transform;
          }

          @media (max-width: 1024px) {
            .flex-1:first-child::after {
              display: none;
            }
          }
        `}</style>
      </section>

      <HorizontalScrollFeatures />

      <footer className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <img src="/images/shadow.jpg" alt="AI Analyzer Logo" className="w-8 h-8 object-contain" loading="lazy" />
                S.H.A.D.O.W
              </h2>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Helping people make informed judgments about digital media.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                  <li className="hover:text-white cursor-pointer transition-colors">API Reference</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Company</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-white cursor-pointer transition-colors">About</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs font-medium">
            <p>© 2026 S.H.A.D.O.W — Media analysis to support informed judgment.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
