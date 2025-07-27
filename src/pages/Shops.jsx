import Table from "../components/Table";
import { useGet } from "../hooks/useGet";
import Spinner from '../ui/Spinner'
import Button from '../ui/Button'
import Modal from "../components/Modal";
import { useState } from "react";
import AddShop from "../components/AddShop";
export default function Shops() {
    const [open, setOpen] = useState(false);
    const { data: shops, isPending } = useGet('shops')

    if (isPending) return <Spinner />

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                className="mb-12"
            >
                + Add Shop
            </Button>

            <Modal isOpen={open} onClose={() => setOpen(false)} title="My Modal Title">
                <AddShop setOpen={setOpen} />
            </Modal>

            <Table
                data={shops}
                exclude={["logo"]}
            />
        </div>
    )
}
