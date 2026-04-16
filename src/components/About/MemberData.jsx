const MemberData = ({ name, expiration, type }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-left font-medium text-gray-900">{name}</td>
      <td className="px-6 py-4 text-gray-700">{expiration || "Never"}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          type === "Junior" ? "bg-orange-100 text-orange-700" : 
          type === "Life Time" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
        }`}>
          {type}
        </span>
      </td>
    </tr>
  );
};