import { useState } from "react";
import { supabase } from "../lib/supabase";
import Input from '../ui/Input'
import Button from '../ui/Button'
import { AnimatePresence, motion } from "framer-motion";
import { shop_id } from "../constants/local";
import toast from "react-hot-toast";


export default function CreateUser() {



    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full"
            >
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create User"}
                    </Button>
                </form>
            </motion.div>
        </AnimatePresence>
    );
}
