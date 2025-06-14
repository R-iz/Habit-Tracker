"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Smartphone,
  Shield,
  Heart,
  Lightbulb,
  Target,
  Zap,
  Bell,
  BarChart3,
  Calendar,
  Cloud,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  Menu,
  X,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  // Features data
  const coreFeatures = [
    {
      icon: CheckCircle,
      title: "Habit Tracking",
      description:
        "Create and track unlimited habits with our intuitive interface. Mark habits complete with a single tap.",
      features: ["Unlimited habits", "One-tap completion", "Custom categories", "Habit descriptions"],
    },
    {
      icon: TrendingUp,
      title: "Streak Analytics",
      description: "Visualize your progress with detailed streak tracking and comprehensive analytics dashboard.",
      features: ["Current & longest streaks", "30-day trend charts", "Category breakdowns", "Progress visualization"],
    },
    {
      icon: Smartphone,
      title: "Progressive Web App",
      description: "Install on any device and use offline. Works like a native app with all the web's flexibility.",
      features: ["Installable on all devices", "Offline functionality", "Fast loading", "Auto-updates"],
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays on your device. No accounts, no tracking, complete privacy guaranteed.",
      features: ["Local data storage", "No account required", "Zero tracking", "Complete privacy"],
    },
  ]

  const advancedFeatures = [
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Set custom reminder times for each habit and never miss a day.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your habit patterns with beautiful charts and statistics.",
    },
    {
      icon: Calendar,
      title: "Calendar View",
      description: "See your habit completion history in an intuitive calendar format.",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set specific targets and track your progress towards achieving them.",
    },
    {
      icon: Zap,
      title: "Quick Actions",
      description: "Batch operations and shortcuts to manage multiple habits efficiently.",
    },
    {
      icon: Cloud,
      title: "Offline Sync",
      description: "Seamlessly sync your data when you're back online after using offline.",
    },
  ]

  // About data
  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "We believe your personal data should stay personal. That's why everything is stored locally on your device.",
    },
    {
      icon: Heart,
      title: "User-Centric Design",
      description: "Every feature is designed with the user in mind, focusing on simplicity and effectiveness.",
    },
    {
      icon: Lightbulb,
      title: "Evidence-Based",
      description: "Our approach is grounded in behavioral science and proven habit formation techniques.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Lightning-fast performance with offline capabilities ensures you can track habits anywhere.",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "SJ",
      rating: 5,
      text: "This habit tracker has completely transformed my daily routine. The offline functionality is a game-changer, and I love that my data stays private. I've maintained a 45-day streak with my morning meditation!",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      avatar: "MC",
      rating: 5,
      text: "As a developer, I appreciate the clean interface and PWA capabilities. The analytics dashboard gives me incredible insights into my habits. I've built 8 consistent habits in just 3 months.",
    },
    {
      name: "Emily Rodriguez",
      role: "Fitness Coach",
      avatar: "ER",
      rating: 5,
      text: "I recommend this app to all my clients. The streak tracking is motivating, and the privacy-first approach builds trust. My clients have seen 40% better habit adherence since using it.",
    },
    {
      name: "David Kim",
      role: "Student",
      avatar: "DK",
      rating: 5,
      text: "Perfect for busy students! Works offline during classes, and the simple interface doesn't distract from studying. I've successfully built study habits that improved my grades significantly.",
    },
    {
      name: "Lisa Thompson",
      role: "Entrepreneur",
      avatar: "LT",
      rating: 5,
      text: "The best habit tracker I've used. No accounts, no data collection, just pure functionality. The visual progress tracking keeps me motivated, and I've achieved my longest streaks ever.",
    },
    {
      name: "James Wilson",
      role: "Teacher",
      avatar: "JW",
      rating: 5,
      text: "Simple, effective, and respects my privacy. I've been using it for 6 months and have built 5 solid habits. The offline capability means I can track habits anywhere, even in remote areas.",
    },
  ]

  // Contact data
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with any questions or issues",
      contact: "support@habittracker.app",
      response: "Within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Feature Requests",
      description: "Suggest new features or improvements",
      contact: "feedback@habittracker.app",
      response: "Within 48 hours",
    },
    {
      icon: Phone,
      title: "Business Inquiries",
      description: "Partnership and business opportunities",
      contact: "business@habittracker.app",
      response: "Within 72 hours",
    },
  ]

  const faqs = [
    {
      question: "Is the app really free?",
      answer: "Yes! Our habit tracker is completely free to use with no hidden costs or premium features.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! All your data is stored locally on your device for complete privacy.",
    },
    {
      question: "Can I use it offline?",
      answer: "The app works completely offline and syncs when you're back online.",
    },
    {
      question: "Is my data secure?",
      answer: "Your data never leaves your device. We don't collect, store, or share any personal information.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Habits Tracked" },
    { number: "95%", label: "User Retention" },
    { number: "30+", label: "Days Average Streak" },
    { number: "100%", label: "Offline Ready" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "", type: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 font-bold text-xl text-gray-900"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              HabitTracker
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-600"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button asChild>
                <Link href="/login">Start Tracking</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href.substring(1))}
                    className="text-left text-sm font-medium transition-colors hover:text-blue-600 text-gray-600 py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <Button asChild className="mt-2">
                  <Link href="/tracker" onClick={() => setIsMenuOpen(false)}>
                    Start Tracking
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Home Section */}
      <section id="home" className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-base font-medium">
              🚀 New: Advanced Analytics Dashboard
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build Better Habits,
              <span className="text-blue-600 block">One Day at a Time</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your life with our powerful habit tracking PWA. Track streaks, analyze progress, and build
              lasting routines that stick - all while working completely offline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="px-8 py-3 text-lg">
                <Link href="/login">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {isInstallable && (
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  Install App
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-base font-medium">
              ✨ Powerful Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our habit tracker is designed with simplicity and effectiveness in mind, giving you all the tools you need
              to build lasting habits.
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Core Features</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div className="py-16 bg-white/50 -mx-4 px-4 rounded-2xl">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Capabilities</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Go beyond basic tracking with our advanced features designed for serious habit builders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-base font-medium">
              🌟 Our Story
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Building Better Habits,
              <span className="text-blue-600 block">One User at a Time</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to help people build lasting habits through technology that respects privacy, works
              offline, and focuses on what truly matters - your personal growth.
            </p>
          </div>

          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that small, consistent actions lead to extraordinary results. Our habit tracker is designed
                to make building and maintaining habits as simple and effective as possible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Unlike other apps that require accounts, collect data, or need constant internet connection, we've built
                a privacy-first, offline-capable solution that puts you in complete control.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
              <div className="text-center">
                <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Goal</h4>
                <p className="text-gray-600">
                  To help 1 million people build better habits and transform their lives through consistent daily
                  actions.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do and every decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-base font-medium">
              ⭐ User Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Loved by Thousands of
              <span className="text-blue-600 block">Habit Builders</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              See how our habit tracker has helped people transform their lives and build lasting routines.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="mx-auto max-w-2xl shadow-lg border-2 border-blue-100">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-6">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-lg">
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{testimonial.name}</CardTitle>
                            <CardDescription className="text-blue-600 font-medium text-base">
                              {testimonial.role}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-6 justify-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="relative text-center">
                          <Quote className="h-12 w-12 text-blue-200 mx-auto mb-4" />
                          <p className="text-gray-700 leading-relaxed text-lg italic">"{testimonial.text}"</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mb-16">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Testimonial Stats */}
          <div className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">2,500+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">42 Days</div>
                <div className="text-gray-600">Avg. Streak</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-6 py-3 text-base font-medium">
              💬 Get in Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              We'd Love to
              <span className="text-blue-600 block">Hear From You</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Have questions, feedback, or suggestions? We're here to help and always excited to hear from our community
              of habit builders.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Reach Us</h3>
              <p className="text-lg text-gray-600">Choose the best way to get in touch based on your needs.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <method.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription className="text-base">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium text-blue-600">{method.contact}</p>
                    <p className="text-sm text-gray-500">Response time: {method.response}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form and we'll get back to you as soon as possible. We read every message personally.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">support@habittracker.app</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>We'll respond within 24 hours during business days.</CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600 mb-4">Thank you for reaching out. We'll get back to you soon.</p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Message Type</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select message type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="feedback">General Feedback</SelectItem>
                          <SelectItem value="business">Business Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <p className="text-lg text-gray-600">Quick answers to common questions about our habit tracker.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already built amazing habits with our tracker. Start your journey today -
            it's completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
              <Link href="/login">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
