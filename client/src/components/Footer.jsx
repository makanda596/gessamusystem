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
                    <p className="text-sm">
                        <span className="font-bold">Email:</span> info@example.com
                    </p>
                    <p className="text-sm">
                        <span className="font-bold">Phone:</span> +123 456 7890
                    </p>
                    <p className="text-sm">
                        <span className="font-bold">Address:</span> 123 Street, City, Country
                    </p>
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
