import React from 'react';
import { Download } from 'lucide-react';
import { Button } from './button';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    fileName: string;
    isDownloading?: boolean;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    fileName,
    isDownloading = false
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = () => {
        if (!isDownloading) {
            onClose();
        }
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleOverlayClick}
        >
            <div
                className="relative bg-dark-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-dark-700"
                onClick={handleModalClick}
            >

                {/* Modal content */}
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <p className="text-gray-300 text-sm">
                            Do you want to download <span className="text-burgundy-400 font-medium">{fileName}</span>?
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 justify-center">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isDownloading}
                            className="px-6 py-2 rounded-full text-cream-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={isDownloading}
                            className="px-6 py-2 rounded-full bg-burgundy-500 hover:bg-burgundy-600 text-cream-50 disabled:opacity-50"
                        >
                            {isDownloading ? (
                                <span className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin mr-2"></div>
                                    Downloading...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadModal; 