import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import Spinner from "../ui/Spinner";
import ProgressBar from "../ui/ProgressBar";
import { FEEDBACK_LIMIT, FREE_TRIAL_LIMIT, IMAGES_LIMIT, USERS_LIMIT } from "../constants/local";

export default function ShopPreview() {
    const { id } = useParams();

    const { data, isPending } = useGet('shops', {
        filters: [{ column: 'id', operator: 'eq', value: id }],
    })
    const { data: feedbacks, isPending: isPendingFeedbacks } = useGet('feedbacks', {
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
        {/* Shop name */}
        <div className="flex items-center flex-col">
            <p className="text-gray-600 text-2xl mb-2 font-bold">{shop.shop_name}</p>
            <p className={`${shop.status === 'free' ? "text-green-600" : "text-yellow-500"} text-2xl mb-6 font-bold`}>{shop.status}</p>
        </div>

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

        <ProgressBar progress={feedbacks.length} limit={FEEDBACK_LIMIT} title="Feedbacks" />
        <ProgressBar progress={shop.images} limit={IMAGES_LIMIT} title="Images" />
        <ProgressBar progress={shop.users} limit={USERS_LIMIT} title="Users" />
        {shop.status === 'free' && <ProgressBar progress={daysPassed} limit={FREE_TRIAL_LIMIT} title="Free trial" />}
    </div>
}
