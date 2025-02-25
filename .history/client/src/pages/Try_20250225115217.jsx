import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-6">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* About Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">About Us</h3>
                    <p className="text-sm">
                        We provide outstanding solutions and projects to meet your needs.
                        Dedicated to delivering quality and innovation in every service.
                    </p>
                </div>

                {/* Links Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a href="/home" className="hover:text-gray-400">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/projects" className="hover:text-gray-400">
                                Projects
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-gray-400">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-gray-400">
                                About Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Contact</h3>
                    <a href="mailto:gessamusuport@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 cursor-pointer">
                        Email : <span className="text-white">gessamusuport@gmail.com</span>
                    </a>
                    <p className="text-sm">
                        <span className="font-bold">Phone:</span> +123 456 7890
                    </p>
                    <p><a href="tel:+254742149060" target="_blank"
                        rel="noopener noreferrer">Phone: +2547 4214 9060</a></p>
                </div>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
