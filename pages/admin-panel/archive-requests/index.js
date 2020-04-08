import React, {useState} from "react";
import RequestTable from "../../../src/components/Admin/RequestTable";
import AdminLayout from "../../../src/components/Admin/Layout";
import Typography from "@material-ui/core/Typography";


let requestList = [
    {
        _id: 1,
        user: {
            _id: 1,
            nama: "Johnson"
        },
        request : {
            _id: 1,
            nama: "Arsip 1",
            tipe: "Audio"
        }
    },
    {
        _id: 2,
        user: {
            _id: 1,
            nama: "Johnson"
        },
        request : {
            _id: 2,
            nama: "Arsip 2",
            tipe: "Video"
        }
    },
    {
        _id: 3,
        user: {
            _id: 3,
            nama: "Guinevere"
        },
        request : {
            _id: 3,
            nama: "Arsip 3",
            tipe: "Audio"
        }
    },
    {
        _id: 4,
        user: {
            _id: 4,
            nama: "Belerick"
        },
        request : {
            _id: 4,
            nama: "Arsip 4",
            tipe: "Text"
        }
    }
];


export default function ArchiveRequest() {
    const [request, setRequest] = useState(requestList);

    const acceptRequest = (id) => {
      const filtered = request.filter(req => req._id !== id);
      setRequest(filtered);
    };

    return (
        <AdminLayout section={4} title="Data Permintaan Peminjaman Arsip">
            {
                request.length > 0 ? (
                    <RequestTable
                        title="Daftar Permintaan Peminjaman Arsip"
                        requestList={request}
                        handleClick={acceptRequest}/>
                ) : (
                    <Typography variant="h3" component="h2"  style={{marginLeft: '3rem'}}>
                        Tidak ada permintaan peminjaman arsip
                    </Typography>
                )
            }

        </AdminLayout>
    );
}

