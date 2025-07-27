import Table from "../components/Table";
import { useGet } from "../hooks/useGet";
import Spinner from '../ui/Spinner'
import Button from '../ui/Button'
import Modal from "../components/Modal";
import { useState } from "react";
import AddUser from "../components/AddUser";
export default function Users() {
    const [open, setOpen] = useState(false);
    const { data: users, isPending } = useGet('profiles')

    if (isPending) return <Spinner />
    console.log(users);

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
                className="mb-12"
            >
                + Add User
            </Button>

            <Modal isOpen={open} onClose={() => setOpen(false)} title="My Modal Title">
                <AddUser setOpen={setOpen} />
            </Modal>

            <Table
                data={users}
                exclude={["logo"]}
            />
        </div>
    )
}
