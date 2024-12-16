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

  /**
   * Retrieve Sections
   */
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

  /**
   * Create Section Dialog
   */
  const [openCreateSectionDialog, setOpenCreateSectionDialog] = useState(false);

  const handleOpenCreateSectionDialog = () => {
    setOpenCreateSectionDialog(true);
  };

  /**
   * View Section
   */
  const [openViewSectionsDialog, setOpenViewSectionsDialog] = useState(null);

  const handleOpenViewSectionsDialog = (rows) => {
    setOpenViewSectionsDialog(rows);
  };

  return (
    <>
      <div
        className={`${
          openSectionListDialog ? "block" : "hidden"
        } fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center`}
      >
        <div className="w-full max-w-4xl bg-white p-4 rounded-md shadow-lg mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#2f3a8f]">
              List Of Sections
            </h2>
            <button
              className="border-2 border-red-500 text-red-500 text-2xl sm:text-xl px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
              onClick={() => setOpenSectionListDialog(false)}
            >
              X
            </button>
          </div>

          <div className="flex justify-end">
            <button
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleOpenCreateSectionDialog}
            >
              Create Section
            </button>
          </div>

          <div className="overflow-x-auto h-[50vh] max-h-[50vh]">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black px-2 py-1 text-center">
                    Section ID
                  </th>
                  <th className="border border-black px-2 py-1 text-center">
                    Section Name
                  </th>
                  <th className="border border-black px-2 py-1 text-center">
                    Section Type
                  </th>
                  <th className="border border-black px-2 py-1 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    <td className="border border-black px-2 py-1 text-center">
                      {row.id}
                    </td>
                    <td className="border border-black px-2 py-1 text-center">
                      {row.section_name}
                    </td>
                    <td className="border border-black px-2 py-1 text-center">
                      {row.section_type}
                    </td>
                    <td className="border border-black px-2 py-1 text-center">
                      <div className="flex justify-center">
                        <VisibilityIcon
                          className="text-blue-500 cursor-pointer text-lg"
                          onClick={() => handleOpenViewSectionsDialog(row)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
    </>
  );
}
