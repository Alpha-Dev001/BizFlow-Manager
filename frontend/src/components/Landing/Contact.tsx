import { FC } from 'react'
import { Mail, Phone, Send } from 'lucide-react'

const Contact: FC = () => {
    return (
        <section id="contact" className="py-20 px-4 bg-white relative overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mt-20 mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Get in Touch
                    </h2>
                    <p className="text-xl text-black/70 max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-black mb-4">Send us a message</h3>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 transition-all"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 transition-all resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-black mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-black" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-black mb-1">Email</h4>
                                        <p className="text-black/70">brooksbridge@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-black" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-black mb-1">Phone</h4>
                                        <p className="text-black/70">+250 788 607 974</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Google Maps Location */}
                        <div className="rounded-2xl overflow-hidden h-64 shadow-lg border-2 border-black/20 relative ">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9663095919355!2d30.05585078459418!3d-1.95793797933039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6b8a5e5e5e5%3A0x4e5e5e5e5e5e5e5e!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
