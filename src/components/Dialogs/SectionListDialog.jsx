import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility"; // You can keep MUI icons
import { useCookies } from "react-cookie";
import CreateSectionsDialog from "./Sections CRUD/CreateSectionsDialog";
import ViewSectionsDialog from "./Sections CRUD/ViewSectionsDialog";
import { getSections } from "../../api/section";

export default function SectionListDialog({
  openSectionListDialog,
  setOpenSectionListDialog,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);

  const retrieve = () => {
    getSections(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setRows(response.data);
      }
    });
  };

  useEffect(() => {
    retrieve();
  }, []);

  const [openCreateSectionDialog, setOpenCreateSectionDialog] = useState(false);
  const [openViewSectionsDialog, setOpenViewSectionsDialog] = useState(null);

  const handleOpenCreateSectionDialog = () => setOpenCreateSectionDialog(true);
  const handleOpenViewSectionsDialog = (row) => setOpenViewSectionsDialog(row);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 transition-opacity duration-300 ${
        openSectionListDialog ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 md:scale-100">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <h2 className="text-2xl font-semibold tracking-wide">
            List Of Sections
          </h2>
          <button
            className="text-white hover:text-red-400 transition-transform transform hover:scale-110"
            onClick={() => setOpenSectionListDialog(false)}
          >
            X {/* Close Button */}
          </button>
        </div>

        {/* Create Section Button */}
        <div className="flex justify-end px-6 py-3">
          <button
            onClick={handleOpenCreateSectionDialog}
            className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium shadow-md hover:bg-green-600 hover:shadow-lg transform transition-all duration-200"
          >
            + Create Section
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full border-collapse bg-white shadow-sm rounded-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border">Section ID</th>
                <th className="px-4 py-2 border">Section Name</th>
                <th className="px-4 py-2 border">Section Type</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-100 transition-all ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 border text-center">{row.id}</td>
                    <td className="px-4 py-2 border text-center">
                      {row.section_name}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {row.section_type}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <VisibilityIcon
                          className="text-blue-600 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleOpenViewSectionsDialog(row)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    No sections available. Create one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Create and View Dialogs */}
        <CreateSectionsDialog
          retrieve={retrieve}
          openCreateSectionDialog={openCreateSectionDialog}
          setOpenCreateSectionDialog={setOpenCreateSectionDialog}
        />
        <ViewSectionsDialog
          openViewSectionsDialog={openViewSectionsDialog}
          setOpenViewSectionsDialog={setOpenViewSectionsDialog}
        />
      </div>
    </div>
  );
}
