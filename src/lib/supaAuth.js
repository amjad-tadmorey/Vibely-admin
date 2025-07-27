import { supabase } from "./supabase";

export async function handleUserCreation({ email, password, role, shop }) {
    try {
        // 1. Sign up the user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role,
                    shop_id: shop,
                },
            },
        });

        if (signUpError) {
            console.error("Signup error:", signUpError.message);
            return { success: false, message: signUpError.message };
        }

        const newUser = signUpData.user;

        if (!newUser) {
            console.error("Signup succeeded, but user data is missing.");
            return { success: false, message: "User creation failed" };
        }

        // 2. Update profiles table
        const { error: updateError } = await supabase
            .from("profiles")
            .update({
                email,
                shop_id: shop,
                role,
            })
            .eq("id", newUser.id);

        if (updateError) {
            console.error("Error updating profile:", updateError.message);
            return { success: false, message: updateError.message };
        }

        console.log("User created and profile updated.");
        return { success: true, user: newUser };

    } catch (err) {
        console.error("Unexpected error:", err);
        return { success: false, message: "Unexpected error occurred" };
    }
}
