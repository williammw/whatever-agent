export default function Sidebar() {
  const sidebarContent = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* a search input for search sidebar-content */}
        <input type="text" placeholder="Search..." />
        <button className="search-button" aria-label="Search">
          Search u
        </button>
        <button>create chat</button>
      </div>
      <div className="sidebar-content">
        <ul>
          {sidebarContent.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="sidebar-footer">sidebar footer</div>
    </div>
  );
}
