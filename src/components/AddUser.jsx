import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useGet } from '../hooks/useGet'
import Spinner from '../ui/Spinner'
import { handleUserCreation } from '../lib/supaAuth'
import toast from 'react-hot-toast'

export default function AddShop({ onSubmit, setOpen }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: '',
        shop: '',
    })

    const { data: shops, isPending } = useGet('shops')

    if (isPending) return <Spinner />

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit?.(form)
        console.log(form);
        handleUserCreation(form);
        toast.success('Shop created successfully!');
        setOpen(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
            <Input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email"
                className="w-full border p-2 rounded"
            />
            <Input
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="password"
                className="w-full border p-2 rounded"
            />

            <select
                type="text"
                name="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Font"
                className="w-full p-4 rounded-xl bg-white/40 border border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur"
            >
                <option value="chooses">Choose</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>

            </select>

            <select
                type="text"
                name="shop"
                value={form.shop}
                onChange={(e) => setForm({ ...form, shop: e.target.value })}
                placeholder="Font"
                className="w-full p-4 rounded-xl bg-white/40 border border-blue-100 text-gray-800 shadow
        placeholder-gray-600 focus:outline-none focus:border-[#4e6ef2] backdrop-blur"
            >
                <option value="chooses">Choose</option>
                {
                    shops.map((shop) => <option key={shop.id} value={shop.id}>{shop.shop_name}</option>)
                }
            </select>

            <Button type="submit">
                Submit
            </Button>
        </form>
    )
}
