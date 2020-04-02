import React from "react";

import AdminLayout from "../../../src/components/Admin/Layout";
import AdminTable from "../../../src/components/Admin/AdminTable";


const ADMIN = 2;
const SUPERADMIN = 3;
const mockAdminListResponse = { //response data perhalaman
    currentPage: 1,
    totalPage: 3,
    payload: [
        {
            id: 1,
            name: "Adama Ardianto A.",
            faculty: "FTMD",
            access: ADMIN
        },
        {
            id: 2,
            name: "Bagas Bumiputra B.",
            faculty: "STEI",
            access: SUPERADMIN
        },
        {
            id: 3,
            name: "Candra C.",
            faculty: "FMIPA",
            access: ADMIN
        },
        {
            id: 4,
            name: "Datuk Dimas D.",
            faculty: "SBM",
            access: ADMIN
        },
        {
            id: 5,
            name: "Elang Emir E.",
            faculty: "FTTM",
            access: ADMIN
        }
    ],
    status: 200
};
const mockUserListResponse = {
    payload: [
        {
            id: 6,
            name: "Abda Shaffan D"
        },
        {
            id: 7,
            name: "Harry Rahmadi M."
        },
        {
            id: 8,
            name: "Willsen Sentosa"
        },
        {
            id: 9,
            name: "M. Hendry P."
        },
        {
            id: 10,
            name: "Juniardi Akbar"
        },
    ],
    status: 200
};

export default function AdminUsers() {
    const section = 2;

    const handlePageRequest = (val) => {
        mockAdminListResponse.currentPage = val;
    };

    const handleAddNewAdminRequest = (newAdminData) => {
        //TODO: Ganti pake request ke backend
        mockAdminListResponse.payload.push(newAdminData);
        const temp = mockUserListResponse.payload.filter((user) => {
            return user.name.trim() !== newAdminData.name.trim();
        });
        mockUserListResponse.payload = [...temp];
    };

    const handleDeleteAdminRequest = (deletedAdminData) => {
        const temp = mockAdminListResponse.payload.filter((user) => {
            return user.name.trim() !== deletedAdminData.name.trim();
        });
        mockAdminListResponse.payload = [...temp];

        //Push deleted admin back to ordinary user list
        mockUserListResponse.payload.push({
            id: deletedAdminData.id,
            name: deletedAdminData.name,
        })
    };

    const handleEditAdminRequest = (editedAdminData) => {
        const filteredTemp = mockAdminListResponse.payload.filter((user) => {
            return user.name.trim() !== editedAdminData.name.trim();
        });
        filteredTemp.push(editedAdminData);
        mockAdminListResponse.payload = [...filteredTemp];
    };

    return (
        <AdminLayout section={section} title="Pengaturan Data Admin">
            <AdminTable
                dataAdmin={mockAdminListResponse}
                dataUser={mockUserListResponse}
                handlePageRequest={handlePageRequest}
                handleAddNewDataRequest={handleAddNewAdminRequest}
                handleDeleteDataRequest={handleDeleteAdminRequest}
                handleEditDataRequest={handleEditAdminRequest}
            />
        </AdminLayout>
    );
}
