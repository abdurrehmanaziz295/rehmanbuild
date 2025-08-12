'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Settings, 
  Palette, 
  Rocket, 
  Code, 
  Eye, 
  Download,
  Share2,
  Copy,
  RefreshCw,
  Zap,
  Crown,
  Star,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react'
import toast from 'react-hot-toast'
import ApiKeyModal from '@/components/ApiKeyModal'
import SmartAIGenerator from '@/components/SmartAIGenerator'
import LiveCustomizer from '@/components/LiveCustomizer'
import DeploymentManager from '@/components/DeploymentManager'
import WebsiteBuilder from '@/components/WebsiteBuilder'
import Sidebar from '@/components/Sidebar'
import PreviewPanel from '@/components/PreviewPanel'

interface WebsiteData {
  html: string
  structure?: any
  content?: any
  images?: string[]
  seo?: any
  metadata?: any
}

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('')
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(true)
  const [currentView, setCurrentView] = useState<'builder' | 'preview' | 'customizer' | 'deploy'>('builder')
  const [mode, setMode] = useState<'basic' | 'pro'>('basic')
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null)
  const [projectName, setProjectName] = useState<string>('My Website')
  const [activeTab, setActiveTab] = useState<'smart' | 'customizer' | 'deploy'>('smart')

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    setShowApiKeyModal(false)
    toast.success('API key configured successfully!')
  }

  const handleWebsiteGenerated = (data: WebsiteData) => {
    setWebsiteData(data)
    setCurrentView('preview')
    toast.success('Website generated successfully!')
  }

  const handleWebsiteUpdate = (data: WebsiteData) => {
    setWebsiteData(data)
    toast.success('Website updated successfully!')
  }

  const tabs = [
    {
      id: 'smart',
      name: 'Smart AI Generator',
      icon: Sparkles,
      description: 'Natural language website creation',
      badge: 'NEW'
    },
    {
      id: 'customizer',
      name: 'Live Customizer',
      icon: Palette,
      description: 'Real-time editing and customization',
      badge: 'PRO'
    },
    {
      id: 'deploy',
      name: 'Deployment Manager',
      icon: Rocket,
      description: 'One-click deployment to any platform',
      badge: 'PRO'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate complete websites in seconds'
    },
    {
      icon: Crown,
      title: 'Pro-Level Quality',
      description: 'Enterprise-grade code and design'
    },
    {
      icon: Star,
      title: 'AI-Powered',
      description: 'Advanced AI for content and images'
    },
    {
      icon: TrendingUp,
      title: 'SEO Optimized',
      description: 'Built-in SEO and performance optimization'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Team features and version control'
    },
    {
      icon: Globe,
      title: 'Global Deployment',
      description: 'Deploy anywhere with one click'
    }
  ]

  if (showApiKeyModal) {
    return <ApiKeyModal onSubmit={handleApiKeySubmit} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">AI Website Builder Pro</h1>
                <span className="px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-medium rounded-full">
                  v2.0
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project Name"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
             <div className="flex items-center space-x-2">
               <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                 <button
                   onClick={() => setMode('basic')}
                   className={`px-3 py-1 text-sm ${mode === 'basic' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                   title="Basic Builder"
                 >
                   Basic
                 </button>
                 <button
                   onClick={() => setMode('pro')}
                   className={`px-3 py-1 text-sm ${mode === 'pro' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                   title="Pro Builder"
                 >
                   Pro
                 </button>
               </div>
                <button
                  onClick={() => setCurrentView('builder')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'builder'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Builder
                </button>
                <button
                  onClick={() => setCurrentView('preview')}
                  disabled={!websiteData}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentView === 'preview'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  } ${!websiteData ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Preview
                </button>
              </div>
              
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'builder' && (
          <div className="space-y-8">
            {mode === 'basic' ? (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <Sidebar />
                </div>
                <div className="lg:col-span-3">
                  <WebsiteBuilder apiKey={apiKey} onWebsiteGenerated={handleWebsiteGenerated} />
                </div>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Build Professional Websites with AI
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Create stunning, responsive websites using natural language. Our advanced AI understands your vision and generates complete, production-ready code.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <tab.icon className="w-5 h-5" />
                          <span>{tab.name}</span>
                          {tab.badge && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              tab.badge === 'NEW' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                            }`}>
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {activeTab === 'smart' && (
                        <motion.div
                          key="smart"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SmartAIGenerator
                            apiKey={apiKey}
                            onWebsiteGenerated={handleWebsiteGenerated}
                          />
                        </motion.div>
                      )}
                      {activeTab === 'customizer' && (
                        <motion.div
                          key="customizer"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {websiteData ? (
                            <LiveCustomizer websiteData={websiteData} onUpdate={handleWebsiteUpdate} />
                          ) : (
                            <div className="text-center py-12">
                              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">No Website to Customize</h3>
                              <p className="text-gray-600 mb-4">Generate a website first to start customizing</p>
                              <button onClick={() => setActiveTab('smart')} className="btn-primary">Generate Website</button>
                            </div>
                          )}
                        </motion.div>
                      )}
                      {activeTab === 'deploy' && (
                        <motion.div
                          key="deploy"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {websiteData ? (
                            <DeploymentManager websiteData={websiteData} projectName={projectName} />
                          ) : (
                            <div className="text-center py-12">
                              <Rocket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 mb-2">No Website to Deploy</h3>
                              <p className="text-gray-600 mb-4">Generate a website first to start deploying</p>
                              <button onClick={() => setActiveTab('smart')} className="btn-primary">Generate Website</button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {currentView === 'preview' && websiteData && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
            <div className="lg:col-span-3">
              <PreviewPanel
                websiteData={websiteData}
                onCodeChange={(html) => setWebsiteData({ ...websiteData, html })}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 AI Website Builder Pro. Built with ❤️ using Next.js, React, and AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
