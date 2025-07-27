import { useState } from 'react'
import Input from '../ui/Input'
import { uploadShopData } from '../lib/supaQuery'
import { platforms } from '../constants/local'
import toast from 'react-hot-toast'

export default function AddShop({ setOpen }) {
    const [form, setForm] = useState({
        shop_name: '',
        logo: null,
        font: '',
        welcome_title: '',
        color: '',
        language: '',
        social: [{ name: '', link: '' }],
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleLogoChange = (e) => {
        setForm(prev => ({ ...prev, logo: e.target.files[0] }))
    }

    const handleSocialChange = (index, field, value) => {
        const newSocial = [...form.social]
        newSocial[index][field] = value
        setForm(prev => ({ ...prev, social: newSocial }))
    }

    const addSocial = () => {
        setForm(prev => ({ ...prev, social: [...prev.social, { name: '', link: '' }] }))
    }

    const removeSocial = (index) => {
        setForm(prev => ({
            ...prev,
            social: prev.social.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        uploadShopData(form).then((res) => {
            if (res.error) {
                alert('Error: ' + res.error.message);
            } else {
                toast.success('Shop created successfully!');
                setOpen(false)
            }
        });

    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
            <Input
                type="text"
                name="shop_name"
                value={form.shop_name}
                onChange={handleChange}
                placeholder="Shop Name"
                className="w-full border p-2 rounded"
            />

            <Input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full border p-2 rounded"
            />

            <select
                type="text"
                name="language"
                value={form.language}
                onChange={handleChange}
                placeholder="language"
                className="w-full p-4 rounded-xl bg-white/40 border border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur"
            >
                <option value="">Choose</option>
                <option value="AR">AR</option>
                <option value="EN">EN</option>
            </select>

            <Input
                type="text"
                name="welcome_title"
                value={form.welcome_title}
                onChange={handleChange}
                placeholder="Welcome Title"
                className="w-full border p-2 rounded"
            />

            <Input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="Color"
                className="w-full border p-2 rounded"
            />
            <Input
                type="text"
                name="font"
                value={form.font}
                onChange={handleChange}
                placeholder="Font"
                className="w-full border p-2 rounded"
            />

            <div className="space-y-2">
                <label className="block font-semibold">Social Links:</label>
                {form.social.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <select
                            type="text"
                            placeholder="Name"
                            value={item.name}
                            onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                            className='w-1/4 p-4 rounded-xl bg-white/40 border border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur'
                        >
                            <option value="">Choose</option>
                            {
                                platforms.map((pla) => <option key={pla} value={pla}>{pla}</option>)
                            }
                        </select>
                        <Input
                            type="text"
                            placeholder="Link"
                            value={item.link}
                            onChange={(e) => handleSocialChange(index, 'link', e.target.value)}
                            className="flex-1 border p-2 rounded"
                        />
                        <button type="button" onClick={() => removeSocial(index)} className="text-red-500">
                            ✕
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addSocial} className="text-blue-500 underline">
                    + Add Social Link
                </button>
            </div>

            <button type="submit" className="bg-[#6EC1F6] text-white py-2 px-4 rounded">
                Submit
            </button>
        </form>
    )
}
