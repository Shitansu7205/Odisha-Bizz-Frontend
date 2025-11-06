import {
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from "react-share";
import { Copy } from "lucide-react";
import { toast } from "react-toastify";

const SocialShare = ({ url }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");

    };

    return (
        <div className="relative flex flex-col items-start gap-3 mt-4 ">
            {/* Horizontal Share Buttons */}
            <div className="flex items-center gap-4 ">
                <FacebookShareButton url={url} className="transition transform hover:scale-110">
                    <FacebookIcon size={40} round />
                </FacebookShareButton>

                <TwitterShareButton url={url} className="transition transform hover:scale-110">
                    <TwitterIcon size={40} round />
                </TwitterShareButton>

                <LinkedinShareButton url={url} className="transition transform hover:scale-110">
                    <LinkedinIcon size={40} round />
                </LinkedinShareButton>

                <WhatsappShareButton url={url} className="transition transform hover:scale-110">
                    <WhatsappIcon size={40} round />
                </WhatsappShareButton>

                {/* Copy Link Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-200 text-sm font-medium shadow-sm"
                >
                    <Copy className="w-4 h-4" />  Link
                </button>
            </div>
        </div>
    );
};

export default SocialShare;
