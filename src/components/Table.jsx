import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Table({ data, exclude = [] }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // Infer columns from data
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => !exclude.includes(key));
  }, [data, exclude]);

  // Search filtering
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((key) => {
        const value = row[key];
        const str =
          Array.isArray(value)
            ? value.length.toString()
            : (value ?? "").toString();
        return str.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-full overflow-x-auto">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>

      {/* Table */}
      <table className="min-w-full text-sm text-left text-white">
        <thead className="bg-[#6EC1F6]">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="py-3 px-4 border-b border-gray-300 text-left text-sm font-semibold text-white"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, idx) => (
              <tr
                key={idx}
                onDoubleClick={() => {
                  const id = row.id; // make sure each row has a unique `id` field
                  if (id) navigate(`/shops/${id}`);
                }}
                className="hover:bg-gray-100 cursor-pointer transition duration-200"
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700"
                  >
                    {Array.isArray(row[col])
                      ? row[col].length
                      : typeof row[col] === "boolean"
                        ? row[col].toString()
                        : row[col]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-6"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
