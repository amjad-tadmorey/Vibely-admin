import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import Spinner from "../ui/Spinner";
import ProgressBar from "../ui/ProgressBar";
import { FEEDBACK_LIMIT, FREE_TRIAL_LIMIT, IMAGES_LIMIT } from "../constants/local";

export default function ShopPreview() {
    const { id } = useParams();

    const { data, isPending } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: id }],
    })
    const { data: feedbaks, isPending: isPendingFeedbacks } = useGet('feedbacks', {
        filters: [{ column: 'shop_id', operator: 'eq', value: id }],
    })

    if (isPending || isPendingFeedbacks) return <Spinner />
    const shop = data[0]
    const daysPassed = Math.floor((new Date() - new Date(shop.created_at)) / (1000 * 60 * 60 * 24));

    return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        {/* Logo */}
        <img
            src={shop.logo}
            alt={`${shop.shop_name} logo`}
            className="w-24 h-24 object-contain mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-center">
            {shop.welcome_title}
        </h1>

        {/* Shop name */}
        <p className="text-gray-600 text-lg mb-6">{shop.shop_name}</p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 justify-center">
            {shop.social.map((social, index) => (
                <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
                >
                    {social.name}
                </a>
            ))}
        </div>

        {/* Language */}
        <p className="mt-8 text-sm text-gray-400">Language: {shop.language}</p>

        <ProgressBar progress={feedbaks.length} limit={FEEDBACK_LIMIT} title="Feedbacks" />
        <ProgressBar progress={shop.images_limit} limit={IMAGES_LIMIT} title="Images" />
        <ProgressBar progress={daysPassed} limit={FREE_TRIAL_LIMIT} title="Free trial" />
    </div>
}
