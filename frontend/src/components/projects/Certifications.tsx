import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Cert1 from '../../assets/images/RestApiCert.png'
import Cert2 from '../../assets/images/COC.png'
import Cert3 from '../../assets/images/Cert3.png'

interface Certification {
    id: number;
    image: string;
}

function Certifications() {
    const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

    const certifications: Certification[] = [
        {
            id: 1,
            image: Cert1,
        },
        {
            id: 2,
            image: Cert2,
        },
        {
            id: 3,
            image: Cert3,
        }
    ];

    const openModal = (cert: Certification) => {
        setSelectedCert(cert);
        document.body.style.overflow = 'hidden'; 
    };

    const closeModal = () => {
        setSelectedCert(null);
        document.body.style.overflow = 'unset'; 
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedCert) {
                closeModal();
            }
        };

        if (selectedCert) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedCert]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <div
                        key={cert.id}
                        className="group bg-gray-800 border border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-red-500/20 hover:shadow-lg cursor-pointer rounded-lg overflow-hidden"
                        onClick={() => openModal(cert)}
                    >
                        <div className="p-1">
                            <div className="w-full h-56 bg-gradient-to-br from-red-500/20 to-gray-800 relative overflow-hidden rounded-lg">
                                <img
                                    src={cert.image}
                                    alt="Certificate"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                                />
                                
                                {/* View Certificate Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                                    <div className="text-center">
                                        <div className="bg-white/90 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg shadow-lg">
                                            View Certificate
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fullscreen Modal */}
            {selectedCert && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center"
                    style={{ zIndex: 9999 }}
                    onClick={closeModal}
                >
                  
                    <div
                        className="relative max-w-[50vw] max-h-[80vh] mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedCert.image}
                            alt="Certificate Fullscreen"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl bg-white/5 backdrop-blur-sm"
                        />
                        
                      
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                            className="absolute -top-2 -right-2 bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-full p-2 transition-colors duration-200 backdrop-blur-sm shadow-lg"
                            style={{ zIndex: 10000 }}
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Certifications;