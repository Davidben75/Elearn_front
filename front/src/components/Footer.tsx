import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                {/* Colonne 1 : Logo et description */}
                <div>
                    <img
                        src="/path/to/logo-white.png"
                        alt="Logo"
                        className="h-10 mb-4"
                    />
                    <p className="text-gray-300">
                        Description courte de votre entreprise ou service
                    </p>
                </div>

                {/* Colonne 2 : Navigation rapide */}
                <div>
                    <h3 className="font-bold mb-4">Navigation</h3>
                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-blue-400 transition"
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-blue-400 transition"
                                >
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-blue-400 transition"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Colonne 3 : Coordonnées et réseaux sociaux */}
                <div>
                    <h3 className="font-bold mb-4">Contactez-nous</h3>
                    <div className="space-y-2">
                        <p>Email: contact@votreentreprise.com</p>
                        <p>Téléphone: +33 1 23 45 67 89</p>

                        {/* Réseaux sociaux */}
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                Twitter
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ligne de copyright */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center">
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Votre Entreprise. Tous droits
                    réservés.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
